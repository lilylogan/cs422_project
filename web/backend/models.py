from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    user_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    favorite_recipes = db.relationship('Recipe', secondary='favorite_recipe')
    disliked_recipes = db.relationship('Recipe', secondary='disliked_recipe')
    meal_plans = db.relationship('MealPlan', backref='user', lazy='dynamic')
    shopping_lists = db.relationship('ShoppingList', backref='user', lazy='dynamic')
    filters = db.relationship('Filter', backref='user', lazy='dynamic')

class Recipe(db.Model):
    recipe_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(100), nullable=False)
    ingredients = db.Column(db.Text)
    instructions = db.Column(db.Text)
    prepTime = db.Column(db.Text)
    cookTime = db.Column(db.Text)
    servings = db.Column(db.Text)
    url = db.Column(db.Text)
    nutrition = db.Column(db.Text)
    cuisine = db.Column(db.Text)
    imgage_path = db.Column(db.Text)

class FavoriteRecipe(db.Model):
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id', ondelete='CASCADE'), primary_key=True)
    recipe_id = db.Column(db.Integer, db.ForeignKey('recipe.recipe_id', ondelete='CASCADE'), primary_key=True)
    added_at = db.Column(db.DateTime, default=datetime.utcnow)

class DislikedRecipe(db.Model):
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id', ondelete='CASCADE'), primary_key=True)
    recipe_id = db.Column(db.Integer, db.ForeignKey('recipe.recipe_id', ondelete='CASCADE'), primary_key=True)
    added_at = db.Column(db.DateTime, default=datetime.utcnow)

class MealPlan(db.Model):
    meal_plan_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id', ondelete='CASCADE'))
    week_start_date = db.Column(db.Date, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    tags = db.relationship('Tag', backref='meal_plan', lazy='dynamic')

class Tag(db.Model):
    tag_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    meal_plan_id = db.Column(db.Integer, db.ForeignKey('meal_plan.meal_plan_id', ondelete='CASCADE'))
    recipe_id = db.Column(db.Integer, db.ForeignKey('recipe.recipe_id', ondelete='CASCADE'))
    day_of_week = db.Column(db.String(10))
    meal_type = db.Column(db.String(20))  # e.g., 'breakfast', 'lunch', 'dinner'

class ShoppingList(db.Model):
    shopping_list_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id', ondelete='CASCADE'))
    item = db.Column(db.String(255), nullable=False)
    quantity = db.Column(db.Float)
    unit = db.Column(db.String(50))
    is_checked = db.Column(db.Boolean, default=False)

class Filter(db.Model):
    filter_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id', ondelete='CASCADE'))
    filter_name = db.Column(db.String(100))
    filter_value = db.Column(db.String(100))