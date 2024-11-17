from flask import Flask, render_template, abort, jsonify, request, send_from_directory
import os
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from models import db
import time
from sqlalchemy.exc import OperationalError
import pandas as pd
from recipeDeck import recipeDeck
from manageLikedRecipes import likedRecipes
import ast

from flask_login import LoginManager, login_required, logout_user, current_user
from auth import check_login, create_account, check_signup
from mealPlanner import get_user_planned_meals


app = Flask(__name__)

# Configure CORS to allow credentials
CORS(app, 
     resources={r"/*": {
         "origins": ["http://localhost:3000"],
         "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
         "allow_headers": ["Content-Type", "Authorization"],
         "supports_credentials": True
     }},
     supports_credentials=True)

DB_USER = os.getenv("DB_USER", "default_user")
DB_PASSWORD = os.getenv("DB_PASSWORD", "default_password")
DB_HOST = os.getenv("DB_HOST", "db")
DB_NAME = os.getenv("DB_NAME", "letscook")

app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'asdsSDfsdaf csac')
app.config['SQLALCHEMY_DATABASE_URI'] = f'mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}/{DB_NAME}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SESSION_COOKIE_SECURE'] = True  # For HTTPS
app.config['SESSION_COOKIE_HTTPONLY'] = True
app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'

db.init_app(app)

# Initialize LoginManager
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

# Import models after initializing db to avoid circular imports
from models import User, Recipe,ShoppingList, ShoppingListContents, ShoppingListIngredient, RecipeContents, Disliked, MealInPlan, RecipeIngredient

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


def is_number(s):
    """Helper function to check if a string is a number."""
    try:
        float(s)
        return True
    except ValueError:
        return False

# def extract_quantity_and_unit(quantity_unit):
#     """Extract quantity and unit from a string.
#        If there's no number in the string, treat the whole string as the unit."""
    
#     qualtity_unit_list = quantity_unit.split(" ")
#     if len(qualtity_unit_list) == 2 and is_number(qualtity_unit_list[0]):
#         quantity = float(qualtity_unit_list[0])
#         unit = qualtity_unit_list[1]
#         notes = None
#     else:
#         if qualtity_unit_list[0] and is_number(qualtity_unit_list[0]):
#             quantity = float(qualtity_unit_list[0])
#             unit = None
#             notes = " ".join(qualtity_unit_list[1:])
#         else: 
#             quantity = None
#             unit = None
#             notes = " ".join(qualtity_unit_list)
   
    
#     return quantity, unit, notes

def extract_quantity_and_unit(quantity_unit):
    """Extract quantity and unit from a string.
       If there's no number in the string, treat the whole string as the unit.
       Integers remain as integers; floats are kept as floats."""
    
    def convert_to_number(value):
        """Convert a number to int if it's whole, otherwise format it to remove unnecessary zeros."""
        num = float(value)
        # Check if the number is an integer
        if num.is_integer():
            return int(num)
        else:
            # Format to remove unnecessary trailing zeros
            return round(num, 2)  # Keep only necessary precision

    qualtity_unit_list = quantity_unit.split(" ")
    if len(qualtity_unit_list) == 2 and is_number(qualtity_unit_list[0]):
        quantity = convert_to_number(qualtity_unit_list[0])
        unit = qualtity_unit_list[1]
        notes = None
    else:
        if qualtity_unit_list[0] and is_number(qualtity_unit_list[0]):
            quantity = convert_to_number(qualtity_unit_list[0])
            unit = None
            notes = " ".join(qualtity_unit_list[1:])
        else: 
            quantity = None
            unit = None
            notes = " ".join(qualtity_unit_list)
    
    return quantity, unit, notes


def load_data_from_csv():
    """Load data from CSV and insert into the Recipe table."""
    df = pd.read_csv("fr_final_recipe.csv")
    with app.app_context():
        first = 1
        ingredient_counter = 1
        for _, row in df.iterrows():
            ingredients_dict = ast.literal_eval(row['cleaned_ingredients'])
            # print(f"ingredient list {ingredients_dict}")
            recipe = Recipe(
                recipeID=row["recipe_id"],
                name=row['recipe_name'],
                instructions=row['directions'],
                prepTime=row['prep_time'],
                cookTime=row['cook_time'],
                servings=str(row['servings']),
                nutrition=row['nutrition'],
                URL=row['url'],
                cuisine=row['cuisine'],
                image_path=row['image_path'],
            )
            db.session.add(recipe) 
            db.session.commit()

            # Add ingredients to RecipeContents
            
            for ingredient, quantity_unit in ingredients_dict.items():

                quantity, unit, notes = extract_quantity_and_unit(quantity_unit)

                # if first:
                #     recipe_contents_record = RecipeContents(
                #         recipeID=row["recipe_id"],
                #         ingredientID=0,
                #         quantity=quantity,
                #         unit=unit,
                #         notes=notes
                #     )

                #     ingredient_record = RecipeIngredient(
                #         ingredientID=0,
                #         name=ingredient
                #     )


                # else:
                
                # db.session.add(recipe_contents_record)

                ingredient_record = RecipeIngredient(
                    ingredientID=ingredient_counter,
                    name=ingredient
                )
                db.session.add(ingredient_record)

                recipe_contents_record = RecipeContents(
                    recipeID=row["recipe_id"],
                    ingredientID=ingredient_counter,
                    quantity=quantity,
                    unit=unit,
                    notes=notes
                )

                db.session.add(recipe_contents_record)
                # print(f"name {ingredient_record.name}")
                

                ingredient_counter += 1 
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

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@app.route('/api/check-auth', methods=['GET'])
def check_auth():
    """Check if user is authenticated"""
    if current_user.is_authenticated:
        return jsonify({
            'isAuthenticated': True,
            'user': {
                'email': current_user.email,
                'userID': current_user.userID
            }
        })
    return jsonify({'isAuthenticated': False}), 401

@app.route('/login', methods=['POST'])
def login():
    """Route to handle user login"""
    try:
        data = request.get_json()
        success, result = check_login(data, User)
        
        if success:
            return jsonify({ 'message': 'Login successful', 'user': 
                            {'email': result.email,'userID': result.userID}}), 200
        else:
            return jsonify({'error': result}), 401
            
    except Exception as e:
        print(f"Error in login: {str(e)}")
        return jsonify({'error': 'An error occurred during login'}), 500

@app.route('/signup', methods=['POST'])
def signup():
    """Route to handle user sign-up"""
    data = request.get_json()
    valid_signup = check_signup(data, User)
    if valid_signup == 0:
        return jsonify({ 'error': 'Email and password are required'}), 400
    elif valid_signup == 1:
        return jsonify({'error': 'Invalid email format'}), 400
    elif valid_signup == 2:
        return jsonify({'error': 'An account with this email already exists'}), 409
    elif valid_signup == 3:
        return jsonify({'error': 'Password must be at least 8 characters long'}), 400
    elif valid_signup == 4:
        from models import ShoppingList
        userID = create_account(data, User, db, ShoppingList)            
        if userID:
            return jsonify({'message': 'User registered successfully', 'user': 
                            {'email': current_user.email,'userID': userID}}), 201

@app.route('/logout', methods=['POST'])
@login_required
def logout():
    logout_user()
    return jsonify({'message': 'Logged out successfully'}), 200



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

@app.route('/sendNewRecipe', methods=['POST'])
def getNewRecipe():
    """Return recipe information of random recipe from Recipe database"""
    '''
    data = request.get_json()
    action = data.get('action')  # Extract the action variable

    # Process the action as needed
    response = {"message": f"Action '{action}' received"}
    print(action)
    '''
    data = request.get_json()
    if not data or 'recipe_id' not in data or 'user_action' not in data:
        print(data)
        return jsonify({"status": "failure", "message": "Invalid data"}), 400

    print("Received data:", data)

    # Retrieve the recipe based on the recipe ID
    recipe_id = db.session.get(Recipe, int(data["recipe_id"]))
    if not recipe_id:
        return jsonify({"status": "failure", "message": "Recipe not found"}), 404

    user_id = int(data["user_id"])  # This holds the current user object  # Access the current user's ID if needed

    recipe_manage = likedRecipes(User, Recipe, MealInPlan)
    # If user swipes to add to weekly meal planner
    if (data["user_action"] == "add"):
        recipe_manage.addToMealPlanner(user_id, int(data["recipe_id"]))

    if (data["user_action"] == "dislike"):
        recipe_manage.addToDisliked(user_id, int(data["recipe_id"]))

    return jsonify({"status": "success", "message": "Data received"}), 200

    
@app.route('/getPlannedMeals', methods=['GET'])
@login_required
def get_planned_meals():
    """Get all planned meals for the current user"""
    meals_by_day, status_code = get_user_planned_meals(current_user.userID)
    return jsonify(meals_by_day), status_code

@app.route('/images/<filename>')
def serve_image(filename):
    return send_from_directory('./images', filename)

@app.route('/api/update-meal-day', methods=['PUT'])
@login_required
def update_meal_day():
    """Update the day of a meal in the meal plan"""
    try:
        data = request.get_json()
        meal_id = data.get('mealId')
        new_day = data.get('newDay')
        user_id = current_user.userID

        if not all([meal_id, new_day]):
            return jsonify({'error': 'Missing required fields'}), 400

        # Find the existing meal plan entry
        meal_plan = MealInPlan.query.filter_by(
            userID=user_id,
            recipeID=meal_id
        ).first()

        if not meal_plan:
            return jsonify({'error': 'Meal plan not found'}), 404

        # Update the day
        meal_plan.dayOfWeek = new_day
        db.session.commit()

        return jsonify({'message': 'Meal day updated successfully'}), 200

    except Exception as e:
        print(f"Error updating meal day: {str(e)}")
        db.session.rollback()
        return jsonify({'error': 'Failed to update meal day'}), 500

@app.route('/api/remove-meal', methods=['DELETE'])
@login_required
def remove_meal():
    """Remove a meal from a user's meal plan. """
    try:
        data = request.get_json()
        
        if not data or 'mealId' not in data or 'day' not in data:
            return jsonify({'error': 'Missing required fields: mealId and day'}), 400
            
        meal_id = data['mealId']
        day = data['day']
        
        # Find and delete the meal plan entry
        meal_plan = MealInPlan.query.filter_by(userID=current_user.userID,recipeID=meal_id,dayOfWeek=day).first()
        
        if not meal_plan:
            return jsonify({'error': 'Meal plan not found'}), 404
            
        # Delete the meal plan entry
        db.session.delete(meal_plan)
        db.session.commit()
        
        return jsonify({'message': 'Meal removed successfully'}), 200
        
    except Exception as e:
        print(f"Error removing meal: {str(e)}")
        db.session.rollback()
        return jsonify({'error': 'Failed to remove meal'}), 500
    

if __name__ == "__main__":
    app.run(debug=True,host='0.0.0.0')
