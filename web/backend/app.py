from flask import Flask, render_template, abort, jsonify, request
import os
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from werkzeug.security import generate_password_hash

app = Flask(__name__)

CORS(app)  # Load environment variables
DB_USER = os.getenv("DB_USER", "default_user")
DB_PASSWORD = os.getenv("DB_PASSWORD", "default_password")
DB_HOST = os.getenv("DB_HOST", "db")
DB_NAME = os.getenv("DB_NAME", "letscook")

app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'asdsSDfsdaf csac')
app.config['SQLALCHEMY_DATABASE_URI'] = f'mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}/{DB_NAME}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Import models after initializing db to avoid circular imports
from models import User, Recipe,ShoppingList, ShoppingListContents, ShoppingListIngredient, RecipeContents, Disliked, MealInPlan

with app.app_context():
    try:
        db.create_all()
    except Exception as e:
        print(f"Error creating database tables: {e}")

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def hello(path):
# return a simple template
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

# Route to add a new user profile
@app.route('/data', methods=['POST'])
def add_user_profile():
    #data = request.get_json()
    data = {
        "password" : "example1", 
        "username" : "exampleProfile",
        "email" : "example@gmail.com"
    }
    
    # Validate required fields
    if not data or not all(k in data for k in ("username", "email", "password")):
        return jsonify({"error": "Missing data"}), 400
    
    # Hash the password
    hashed_password = generate_password_hash(data["password"], method="sha256")
    
    # Create new user instance
    new_user = User(username=data["username"], email=data["email"], password=hashed_password)
    
    try:
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"message": "User profile created successfully!"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"Error creating user profile: {str(e)}"}), 500

# Custom error handlers
@app.errorhandler(404)
def error_404(e):
    return render_template('404.html'), 404

@app.errorhandler(403)
def error_403(e):
    return render_template('403.html'), 403

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
