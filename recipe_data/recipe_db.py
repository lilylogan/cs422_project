from sqlalchemy import create_engine, Column, Integer, String, Text, Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import pandas as pd
from sqlalchemy.orm import declarative_base

Base = declarative_base()

df = pd.read_csv("fr_final_recipe.csv")
print(df.columns)

# Define the base class for declarative models
# Base = declarative_base()

# Define the Recipe model
class Recipe(Base):
    __tablename__ = 'recipes'

    id = Column(Integer, primary_key=True, autoincrement=True)
    recipe_id = Column(Integer)
    recipe_name = Column(String)
    prep_time = Column(String)
    cook_time = Column(String)
    total_time = Column(String)
    servings = Column(Integer)
    yield_value = Column(String)
    ingredients = Column(Text)
    directions = Column(Text)
    rating = Column(Float)
    url = Column(String)
    cuisine_path = Column(String)
    nutrition = Column(String)
    timing = Column(String)
    img_src = Column(String)
    cleaned_ingredients = Column(Text)
    image_path = Column(String)

# Create an SQLite engine and a session
engine = create_engine('sqlite:///recipes.db')  # This will create a SQLite database file
Base.metadata.create_all(engine)  # This will create the table in the database

# Create a sessionmaker object
Session = sessionmaker(bind=engine)
session = Session()

# Iterate over the rows in the DataFrame and add each to the session
for _, row in df.iterrows():
    recipe = Recipe(
        recipe_id=row['recipe_id'],
        recipe_name=row['recipe_name'],
        prep_time=row['prep_time'],
        cook_time=row['cook_time'],
        total_time=row['total_time'],
        servings=row['servings'],
        yield_value=row['yield'],
        ingredients=row['ingredients'],
        directions=row['directions'],
        rating=row['rating'],
        url=row['url'],
        cuisine_path=row['cuisine_path'],
        nutrition=row['nutrition'],
        timing=row['timing'],
        img_src=row['img_src'],
        cleaned_ingredients=row['cleaned_ingredients'],
        image_path=row['image_path']
    )
    session.add(recipe)

# Commit all changes to the database
session.commit()

# # Query to retrieve and print recipes
# recipes = session.query(Recipe).all()
# for recipe in recipes:
#     print(f"Recipe Name: {recipe.recipe_name}, Rating: {recipe.rating}")


from PIL import Image
import matplotlib.pyplot as plt

# Query to retrieve recipes with image paths
recipes = session.query(Recipe).filter(Recipe.image_path != None).all()

# Loop through and display images
for recipe in recipes:
    print(f"Recipe Name: {recipe.recipe_name}")
    print(f"Image Path: {recipe.image_path}")

    # Load and display the image
    try:
        img = Image.open(recipe.image_path)
        plt.imshow(img)
        plt.axis('off')  # Hide axes for a cleaner display
        plt.show()
    except Exception as e:
        print(f"Could not open image for {recipe.recipe_name}: {e}")
