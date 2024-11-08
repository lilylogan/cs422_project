from flask import Flask, render_template, abort, jsonify, request, send_from_directory
import os
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from models import db
import re
import time
from sqlalchemy.exc import OperationalError
import pandas as pd

# For authentication
from flask_login import LoginManager, login_user, login_required, logout_user, current_user
from datetime import timedelta
from recipeDeck import recipeDeck



app = Flask(__name__)

CORS(app)  # Load environment variables

DB_USER = os.getenv("DB_USER", "default_user")
DB_PASSWORD = os.getenv("DB_PASSWORD", "default_password")
DB_HOST = os.getenv("DB_HOST", "db")
DB_NAME = os.getenv("DB_NAME", "letscook")

app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'asdsSDfsdaf csac')
app.config['SQLALCHEMY_DATABASE_URI'] = f'mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}/{DB_NAME}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

# Initialize LoginManager
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

# Import models after initializing db to avoid circular imports
from models import User, Recipe,ShoppingList, ShoppingListContents, ShoppingListIngredient, RecipeContents, Disliked, MealInPlan

def wait_for_db(retries=5, delay=5):
    """Retry database connection with exponential backoff"""
    for attempt in range(retries):
        try:
            # Attempt to connect to the database
            with app.app_context():
                db.create_all()
                print("Successfully connected to the database!")
                return True
        except OperationalError as e:
            if attempt == retries - 1:  # Last attempt
                print(f"Failed to connect to the database after {retries} attempts: {e}")
                raise
            wait_time = delay * (2 ** attempt)  # Exponential backoff
            print(f"Database connection attempt {attempt + 1} failed. Retrying in {wait_time} seconds...")
            time.sleep(wait_time)
    return False

# Initialize database with retry logic
try:
    wait_for_db()
except Exception as e:
    print(f"Fatal error: Could not connect to database: {e}")
    raise

def load_data_from_csv():
    """Load data from CSV and insert into the Recipe table."""
    df = pd.read_csv("fr_final_recipe.csv")
    with app.app_context():
        for _, row in df.iterrows():
            recipe = Recipe(
                name=row['recipe_name'],
                instructions=row['directions'],
                prepTime=row['prep_time'],
                cookTime=row['cook_time'],
                servings=str(row['servings']),
                nutrition=row['nutrition'],
                URL=row['url'],
                cuisine=row['cuisine'],
                image_path=row['image_path']
            )
            db.session.add(recipe)
        db.session.commit()
    print("Data successfully inserted into the recipe database!")

def initialize_recipe_database():
    """Check if the database is empty and load data if necessary."""
    with app.app_context():
        # Check if there are any rows in the Recipe table
        if db.session.query(Recipe).first() is None:
            print("Recipe table is empty. Loading data from CSV...")
            load_data_from_csv()
        else:
            print("Recipe table already populated. Skipping CSV load.")
        
        

# Initialize the database on app startup
initialize_recipe_database()


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def hello(path):
    """return a simple template"""
    # Checking that file path is not forbidden
    if (".." in path) or ("//" in path) or ("~" in path):
        abort(403) # Forbidden error

    # Ony proceeding if file has correct extension
    ext = os.path.splitext(path)[1] # getting the file e

    if (ext == ".html") or (ext == ".css"):
        # Checking that the file exists
        if os.path.exists("templates/" + path):
            return render_template(path), 200
        else:
            abort(404) # Not found error
    else:
        abort(404) # Not found error


@app.route('/getRandRecipe', methods=['GET'])
def add_user_profile():
    """Route to add a new user profile"""
    #data = request.get_json()
    new_Recipe = recipeDeck(Recipe)

    # Just generating the first recipe
    exRecipe = new_Recipe.genRecipe()
    
    return jsonify(exRecipe)

@app.route('/signup', methods=['POST'])
def signup():
    """Route to handle user sign-up"""
    try:
        data = request.get_json()
        
        # Extract data from request
        email = data.get('email')
        password = data.get('password')
        # Basic validation
        if not email or not password:
            return jsonify({
                'error': 'Email and password are required'
            }), 400
            
        # Validate email format
        email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        if not re.match(email_pattern, email):
            return jsonify({
                'error': 'Invalid email format'
            }), 400
        print("\n Successfully recieved data from frontend input.\n")

        # Check if user already exists
        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            return jsonify({
                'error': 'An account with this email already exists'
            }), 409
        # Validate password strength
        if len(password) < 8:
            return jsonify({
                'error': 'Password must be at least 8 characters long'
            }), 400
        
        # Create new user
        hashed_password = generate_password_hash(password, method='pbkdf2:sha256')
        new_user = User(
            email=email,
            hashedPassword=hashed_password,
            fname='',  # These can be updated later by user if we want
            lname=''   # These can be updated later by user if we want
        )
        
        # Save to database
        db.session.add(new_user)
        db.session.commit()
        
        # Initialize shopping list for the user
        from models import ShoppingList
        shopping_list = ShoppingList(userID=new_user.userID)
        db.session.add(shopping_list)
        db.session.commit()

        login_user(new_user)

        return jsonify({
            'message': 'User registered successfully',
            'userID': new_user.userID
        }), 201
        
    except Exception as e:
        db.session.rollback()
        print(f"Error in signup: {str(e)}")  # For debugging
        return jsonify({
            'error': 'An error occurred during registration'
        }), 500

@app.route('/login', methods=['POST'])
def login():
    """Route to handle user log in"""
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        
        user = User.query.filter_by(email=email).first()
        
        if user and check_password_hash(user.hashedPassword, password):
            login_user(user, remember=True, duration=timedelta(days=7))
            return jsonify({
                'message': 'Login successful',
                'userID': user.userID
            }), 200
        else:
            return jsonify({
                'error': 'Invalid email or password'
            }), 401
            
    except Exception as e:
        print(f"Error in login: {str(e)}")
        return jsonify({
            'error': 'An error occurred during login'
        }), 500

@app.route('/logout', methods=['POST'])
@login_required
def logout():
    logout_user()
    return jsonify({'message': 'Logged out successfully'}), 200

    
@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@app.route('/api/protected-route', methods=['GET'])
@login_required
def protected_route():
    return jsonify({'message': 'This is a protected route'})

# Custom error handlers
@app.errorhandler(404)
def error_404(e):
    return render_template('404.html'), 404

@app.errorhandler(403)
def error_403(e):
    return render_template('403.html'), 403

@app.route('/getNewRecipe', methods=['GET'])
def getNewRecipe():
    """Return recipe information of random recipe from Recipe database"""

@app.route('/images/<filename>')
def serve_image(filename):
    return send_from_directory('./images', filename)
    



# Example route for viewing static data
#@app.route('/data')
#def get_static_data():
 #   array = {
  #      'Name': "Lily",
   #     "Age": "22",
    #    "programming": "python"
    #}
    # return jsonify(array=array)

if __name__ == "__main__":
    app.run(debug=True,host='0.0.0.0')
