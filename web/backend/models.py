"""
models.py
Description: The code behind creating the relational database for the users
using sqlalchemy.
Date: October 29th, 2024
Inital Author: Ellison Largent
Modified By: Amanda Hoteling, and Lily Logan
"""
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Enum
from flask_login import UserMixin


db = SQLAlchemy()

class User(UserMixin, db.Model):
    __tablename__ = 'users'
    
    userID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    hashedPassword = db.Column(db.String(255), nullable=False)
    fname = db.Column(db.String(50), nullable=False)
    lname = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(100), nullable=False, unique=True)
    image_path = db.Column(db.Text)

    # Relationships
    shopping_list = db.relationship("ShoppingList", back_populates="user", uselist=False)
    liked_recipes = db.relationship("Recipe", secondary="liked", back_populates="liked_by")
    disliked_recipes = db.relationship("Recipe", secondary="disliked", back_populates="disliked_by")
    meal_plans = db.relationship("MealInPlan", back_populates="user")
    def get_id(self):
        return str(self.userID)
    
class ShoppingList(db.Model):
    __tablename__ = 'shopping_list'
    
    listID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    userID = db.Column(db.Integer, db.ForeignKey('users.userID', ondelete='CASCADE'), unique=True)
    
    # Relationships
    user = db.relationship("User", back_populates="shopping_list")
    ingredients = db.relationship("ShoppingListContents", back_populates="shopping_list")

class ShoppingListIngredient(db.Model):
    __tablename__ = 'shopping_list_ingredients'
    
    ingredientID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(100), nullable=False, unique=False)
    
    # Relationships
    shopping_lists = db.relationship("ShoppingListContents", back_populates="ingredient")

class RecipeIngredient(db.Model):
    __tablename__ = 'recipe_ingredients'
    
    ingredientID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(100), nullable=False, unique=False)
    
    # Relationships
    recipes = db.relationship("RecipeContents", back_populates="ingredient")

class Recipe(db.Model):
    __tablename__ = 'recipes'
    
    recipeID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(255), nullable=False)
    instructions = db.Column(db.Text)
    prepTime = db.Column(db.Text)
    cookTime = db.Column(db.Text)
    servings = db.Column(db.Text)
    nutrition = db.Column(db.Text)
    URL = db.Column(db.String(255))
    cuisine = db.Column(db.Text)
    image_path = db.Column(db.Text)
    totalTime = db.Column(db.Text)
    
    # Relationships
    ingredients = db.relationship("RecipeContents", back_populates="recipe")
    liked_by = db.relationship("User", secondary="liked", back_populates="liked_recipes")
    disliked_by = db.relationship("User", secondary="disliked", back_populates="disliked_recipes")
    meal_plans = db.relationship("MealInPlan", back_populates="recipe")

    def get_ingredient_list(self):
        """Returns a list of ingredient descriptions for this recipe."""
        ingredients = []
        
        for ingredient_container in self.ingredients:
            parts = []

            # Add quantity if it's not None
            if ingredient_container.quantity is not None:
                parts.append(str(ingredient_container.quantity))

            # Add unit if it's not None
            if ingredient_container.unit is not None:
                parts.append(ingredient_container.unit)

            # Add ingredient name if it's not None
            if ingredient_container.ingredient.name is not None:
                parts.append(ingredient_container.ingredient.name)

            # Join the non-None parts with a space
            ingredient_string = " ".join(parts)

            # Only add non-empty strings to the list
            if ingredient_string:
                ingredients.append(ingredient_string)

        return ingredients


class ShoppingListContents(db.Model):
    __tablename__ = 'shopping_list_contents'
    
    listID = db.Column(db.Integer, db.ForeignKey('shopping_list.listID', ondelete='CASCADE'), primary_key=True)
    ingredientID = db.Column(db.Integer, db.ForeignKey('shopping_list_ingredients.ingredientID', ondelete='CASCADE'), primary_key=True)
    quantity = db.Column(db.Numeric(10, 2))
    unit = db.Column(db.String(50))
    checked = db.Column(db.Boolean, nullable=False, default=False)
    
    # Relationships
    shopping_list = db.relationship("ShoppingList", back_populates="ingredients")
    ingredient = db.relationship("ShoppingListIngredient", back_populates="shopping_lists")

class RecipeContents(db.Model):
    __tablename__ = 'recipe_contents'
    
    recipeID = db.Column(db.Integer, db.ForeignKey('recipes.recipeID', ondelete='CASCADE'), primary_key=True)
    ingredientID = db.Column(db.Integer, db.ForeignKey('recipe_ingredients.ingredientID', ondelete='CASCADE'), primary_key=True)
    quantity = db.Column(db.Numeric(10, 2))
    unit = db.Column(db.String(50))
    notes = db.Column(db.Text)
    
    # Relationships
    recipe = db.relationship("Recipe", back_populates="ingredients")
    ingredient = db.relationship("RecipeIngredient", back_populates="recipes")

class Liked(db.Model):
    __tablename__ = 'liked'
    
    userID = db.Column(db.Integer, db.ForeignKey('users.userID', ondelete='CASCADE'), primary_key=True)
    recipeID = db.Column(db.Integer, db.ForeignKey('recipes.recipeID', ondelete='CASCADE'), primary_key=True)

class Disliked(db.Model):
    __tablename__ = 'disliked'
    
    userID = db.Column(db.Integer, db.ForeignKey('users.userID', ondelete='CASCADE'), primary_key=True)
    recipeID = db.Column(db.Integer, db.ForeignKey('recipes.recipeID', ondelete='CASCADE'), primary_key=True)

class MealInPlan(db.Model):
    __tablename__ = 'meal_in_plan'
    
    userID = db.Column(db.Integer, db.ForeignKey('users.userID', ondelete='CASCADE'), primary_key=True)
    recipeID = db.Column(db.Integer, db.ForeignKey('recipes.recipeID', ondelete='CASCADE'), primary_key=True)
    dayOfWeek = db.Column(Enum('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 
                              name='days_of_week'), primary_key=True)
    
    # Relationships
    user = db.relationship("User", back_populates="meal_plans")
    recipe = db.relationship("Recipe", back_populates="meal_plans")