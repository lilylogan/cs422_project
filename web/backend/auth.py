from werkzeug.security import generate_password_hash, check_password_hash
import re
from flask_login import login_user
from datetime import timedelta

def check_login(data, User):
    """ Check login information against user database, return true 
    if valid login and false if invalid. Requires the data fetched from frontend 
    as well as the user database access point"""
    if not data:
        return False, "No data provided"
        
    email = data.get('email')
    password = data.get('password')
    
    if not email or not password:
        return False, "Email and password required"
        
    user = User.query.filter_by(email=email).first()
        
    if user and check_password_hash(user.hashedPassword, password):
        # Set remember=True for persistent session
        login_user(user, remember=True, duration=timedelta(days=7))
        return True, user
    else:
        return False, "Invalid email or password"

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
    if not data:
        return 0
        
    email = data.get('email')
    password = data.get('password')
    
    # Basic validation
    if not email or not password:
        return 0
        
    # Validate email format
    email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    if not re.match(email_pattern, email):
        return 1
        
    # Check if user already exists
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return 2
        
    # Validate password length
    if len(password) < 8:
        return 3
        
    # Success case
    return 4

def create_account(data, User, db, ShoppingList):
    """ Create the user account and return the UserID for verification. Leaves first 
    and last name blank can be changed later."""
    # Extract data from request
    email = data.get('email')
    password = data.get('password')

    # Create new user with hashed password
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
    shopping_list = ShoppingList(userID=new_user.userID)
    db.session.add(shopping_list)
    db.session.commit()
    
    # Login the user immediately after signup
    login_user(new_user, remember=True, duration=timedelta(days=7))
    
    return new_user.userID