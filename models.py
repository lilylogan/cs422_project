from sqlalchemy import create_engine, Column, Integer, String, Text, Decimal, ForeignKey, Enum
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

Base = declarative_base()

class User(Base):
    __tablename__ = 'users'

    userID = Column(Integer, primary_key=True)
    hashedPassword = Column(String(255), nullable=False)
    fname = Column(String(50), nullable=False)
    lname = Column(String(50), nullable=False)
    email = Column(String(100), unique=True, nullable=False)

    shopping_list = relationship("ShoppingList", uselist=False, back_populates="user", cascade="all, delete-orphan")
    liked_recipes = relationship("Liked", back_populates="user", cascade="all, delete-orphan")
    disliked_recipes = relationship("Disliked", back_populates="user", cascade="all, delete-orphan")
    meal_plans = relationship("MealInPlan", back_populates="user", cascade="all, delete-orphan")

class ShoppingList(Base):
    __tablename__ = 'shopping_lists'

    listID = Column(Integer, primary_key=True)
    userID = Column(Integer, ForeignKey('users.userID', ondelete='CASCADE'), unique=True)

    user = relationship("User", back_populates="shopping_list")
    ingredients = relationship("ShoppingListIngredient", back_populates="shopping_list", cascade="all, delete-orphan")

class Ingredient(Base):
    __tablename__ = 'ingredients'

    ingredientID = Column(Integer, primary_key=True)
    name = Column(String(100), unique=True, nullable=False)

    shopping_list_items = relationship("ShoppingListIngredient", back_populates="ingredient")

class Recipe(Base):
    __tablename__ = 'recipes'

    recipeID = Column(Integer, primary_key=True)
    name = Column(String(255), nullable=False)
    ingredients = Column(Text, nullable=False)
    prepTime = Column(Integer)
    cookTime = Column(Integer)
    servings = Column(Integer)
    ratings = Column(Decimal(3, 2))
    URL = Column(String(255))
    nutrition = Column(Text)

    liked_by = relationship("Liked", back_populates="recipe", cascade="all, delete-orphan")
    disliked_by = relationship("Disliked", back_populates="recipe", cascade="all, delete-orphan")
    meal_plans = relationship("MealInPlan", back_populates="recipe", cascade="all, delete-orphan")

class Liked(Base):
    __tablename__ = 'liked'

    userID = Column(Integer, ForeignKey('users.userID', ondelete='CASCADE'), primary_key=True)
    recipeID = Column(Integer, ForeignKey('recipes.recipeID', ondelete='CASCADE'), primary_key=True)

    user = relationship("User", back_populates="liked_recipes")
    recipe = relationship("Recipe", back_populates="liked_by")

class Disliked(Base):
    __tablename__ = 'disliked'

    userID = Column(Integer, ForeignKey('users.userID', ondelete='CASCADE'), primary_key=True)
    recipeID = Column(Integer, ForeignKey('recipes.recipeID', ondelete='CASCADE'), primary_key=True)

    user = relationship("User", back_populates="disliked_recipes")
    recipe = relationship("Recipe", back_populates="disliked_by")

class MealInPlan(Base):
    __tablename__ = 'meal_in_plan'

    userID = Column(Integer, ForeignKey('users.userID', ondelete='CASCADE'), primary_key=True)
    recipeID = Column(Integer, ForeignKey('recipes.recipeID', ondelete='CASCADE'), primary_key=True)
    dayOfWeek = Column(Enum('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'), primary_key=True)

    user = relationship("User", back_populates="meal_plans")
    recipe = relationship("Recipe", back_populates="meal_plans")

class ShoppingListIngredient(Base):
    __tablename__ = 'shopping_list_ingredients'

    listID = Column(Integer, ForeignKey('shopping_lists.listID', ondelete='CASCADE'), primary_key=True)
    ingredientID = Column(Integer, ForeignKey('ingredients.ingredientID', ondelete='CASCADE'), primary_key=True)
    quantity = Column(Decimal(10, 2))
    unit = Column(String(50))

    shopping_list = relationship("ShoppingList", back_populates="ingredients")
    ingredient = relationship("Ingredient", back_populates="shopping_list_items")