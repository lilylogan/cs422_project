from werkzeug.security import generate_password_hash, check_password_hash
import re

# For authentication
from flask_login import LoginManager, login_user, login_required, logout_user, current_user
from datetime import timedelta

def check_login(data, User):
    """ Check login information against user database, return true 
    if valid login and false if invalid. Requires the data fetched from frontend 
    as well as the user database access point"""
    email = data.get('email')
    password = data.get('password')
        
    user = User.query.filter_by(email=email).first()
        
    if user and check_password_hash(user.hashedPassword, password):
        login_user(user, remember=True, duration=timedelta(days=7))
        return True
    else:
        return False
    
def check_signup(data, User):
    """ Check sign up information to verify no account already exists, password
    is valid, and email is valid. 
    Returns:
    0 : one or more inputs not given
    1 : invalid email format
    2 : account already exists
    3 : invalid password length
    4 : valid signup
    """
    # Extract data from request
    email = data.get('email')
    password = data.get('password')
   
    # Basic validation
    email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    if not email or not password:
        return 0
    # Validate email
    elif not re.match(email_pattern, email):
        return 1
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return 2
    if len(password) < 8:
        return 3
    else:
        # Success case
        return 4

        
def create_account(data, User, db, ShoppingList):
    """ Create the user account and return the UserID for verification. Leaves first 
    and last name blank can be changed later."""
    # Extract data from request
    email = data.get('email')
    password = data.get('password')
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

    # login the user
    login_user(new_user, remember=True, duration=timedelta(days=7))
    
    return new_user.userID
