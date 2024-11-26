from models import db
from sqlalchemy import func, desc
from sqlalchemy.orm import joinedload
from manageShoppingList import manageShoppingList

class likedRecipes:
    ''' This module will take in a recipe id and add it to the user's liked recipes
    or disliked recipes depending on which way they swipe.
    '''
    def __init__(self, userDB, recipeDB, mealPlanDB, recipeContentsDB, recipeIngredientsDB, shoppingListDB, shoppingListContentsDB, shoppingListIngredientDB):
        # Initializing the userDB
        self.user_db = userDB
        self.recipe_db = recipeDB
        self.plan_db = mealPlanDB
        self.recipeContentsDB = recipeContentsDB
        self.recipeIngredientsDB = recipeIngredientsDB
        self.shoppingListDB = shoppingListDB
        self.shoppingListContentsDB = shoppingListContentsDB
        self.shoppingListIngredientsDB = shoppingListIngredientDB
    def addToLiked(self, user_id, recipe_id):
        # Adds a recipe to the user's liked recipes
        # in the user database
        user = self.user_db.query.get(user_id)
        recipe = self.recipe_db.query.get(recipe_id)
    
        # Ensure both the user and recipe exist
        if not user or not recipe:
            print(f"User or Recipe not found. User ID: {user_id}, Recipe ID: {recipe_id}")
            return False
        
        # Check if the recipe is already liked by the user
        if recipe in user.liked_recipes:
            print(f"Recipe {recipe_id} is already liked by User {user_id}")
            return False
        
        # Add the recipe to the user's liked recipes
        user.liked_recipes.append(recipe)
        print(user.liked_recipes)
        # Commit the changes to the database
        try:
            db.session.commit()
            print(f"Added Recipe {recipe_id} to User {user_id}'s liked recipes")
            return True
        except Exception as e:
            db.session.rollback()
            print(f"Failed to add liked recipe: {e}")
            return False
    def removeFromLiked(self, user_id, recipe_id):
        # Adds a recipe to the user's liked recipes
        # in the user database
        try:
            # Fetch the user and recipe
            user = self.user_db.query.filter_by(userID=user_id).first()
            recipe = self.recipe_db.query.filter_by(recipeID=recipe_id).first()
            
            if not user or not recipe:
                return False  # User or recipe does not exist
            
            # Check if the recipe is in the user's liked recipes
            if recipe in user.liked_recipes:
                # Remove the recipe from the relationship
                user.liked_recipes.remove(recipe)
                db.session.commit()
                return True
            
            return False  # Recipe was not in liked recipes
        except Exception as e:
            print(f"Error removing liked recipe: {e}")
            db.session.rollback()
            return False
    def addToDisliked(self, user_id, recipe_id):
        # Adds a recipe to the user's liked recipes
        # in the user database
        user = self.user_db.query.get(user_id)
        recipe = self.recipe_db.query.get(recipe_id)
    
        # Ensure both the user and recipe exist
        if not user or not recipe:
            print(f"User or Recipe not found. User ID: {user_id}, Recipe ID: {recipe_id}")
            return False
        
        # Check if the recipe is already liked by the user
        if recipe in user.liked_recipes:
            print(f"Recipe {recipe_id} is already liked by User {user_id}")
            return False
        
        # Add the recipe to the user's liked recipes
        user.disliked_recipes.append(recipe)
        print(user.disliked_recipes)
        # Commit the changes to the database
        try:
            db.session.commit()
            print(f"Added Recipe {recipe_id} to User {user_id}'s disliked recipes")
            return True
        except Exception as e:
            db.session.rollback()
            print(f"Failed to add liked recipe: {e}")
            return False
    
        
    def get_next_day(self, current_day):
        days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        current_index = days.index(current_day)
        next_index = (current_index + 1)
        if next_index == len(days):
            next_index = 0
        return days[next_index]
        
    def addToMealPlanner(self, user_id, recipe_id):
       # Import necessary modules for ordering
        user = self.user_db.query.get(user_id)
        recipe = self.recipe_db.query.get(recipe_id)

        # Ensure both the user and recipe exist
        if not user or not recipe:
            print(f"User or Recipe not found. User ID: {user_id}, Recipe ID: {recipe_id}")
            return False

        # Query for the count of recipes for each day of the week in the user's meal plan
        meal_counts = (
            self.plan_db.query
            .with_entities(self.plan_db.dayOfWeek, func.count(self.plan_db.recipeID).label("count"))
            .filter_by(userID=user_id)
            .group_by(self.plan_db.dayOfWeek)
            .all()
        )

        # Convert results to a dictionary for easier manipulation
        day_counts = {day: count for day, count in meal_counts}

        # Define the order of days in the week
        days_of_week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

        # Initialize counts for days without entries as zero
        for day in days_of_week:
            if day not in day_counts:
                day_counts[day] = 0

        # Find the day(s) with the least recipes
        min_recipes = min(day_counts.values())
        target_days = [day for day, count in day_counts.items() if count == min_recipes]

        # Pick the first day in sequential order if there are ties
        target_day = next(day for day in days_of_week if day in target_days)

        # Create a new meal plan entry for the target day
        new_meal = self.plan_db(userID=user_id, recipeID=recipe_id, dayOfWeek=target_day)
        db.session.add(new_meal)

        # Retrieve ingredients from the recipe
        recipe_ingredients = (
            self.recipeContentsDB.query
            .filter_by(recipeID=recipe_id)
            .all()
        )

        # Retrieve or create the user's shopping list
        shopping_list = self.shoppingListDB.query.filter_by(userID=user_id).first()

        # Add ingredients to the shopping list
        for ingredient in recipe_ingredients:
            ingredient_id = ingredient.ingredientID
            quantity = ingredient.quantity
            unit = ingredient.unit

            # Check if the ingredient already exists in the user's shopping list ingredients
            ingredients_recipe_entry = self.recipeIngredientsDB.query.filter_by(ingredientID=ingredient_id).first()

            # Create a new entry in ShoppingListIngredients
            new_ingredient_entry = self.shoppingListIngredientsDB(
                ingredientID=ingredient_id,
                name=ingredients_recipe_entry.name
            )

            try:
                db.session.add(new_ingredient_entry)
                db.session.commit()
                print("Recipe ingredient added to shopping list")
            except Exception as e:
                db.session.rollback()  # Roll back in case of failure
                print(f"Error during database commit: {e}")

            # Create a new entry in ShoppingListContents
            new_entry = self.shoppingListContentsDB(
                listID=shopping_list.listID,
                ingredientID=ingredient_id,
                quantity=quantity,
                unit=unit
            )
            try:
                db.session.add(new_entry)
                db.session.commit()
                print("Ingredient added to shopping list contents")
            except Exception as e:
                db.session.rollback()  # Roll back in case of failure
                print(f"Error during database commit: {e}")

        # Commit the changes to the database
        try:
            db.session.commit()
            print(f"Added Recipe ID {recipe_id} to User ID {user_id}'s meal plan for {target_day}")
            return True
        except Exception as e:
            db.session.rollback()
            print(f"Failed to add meal to plan: {e}")
            return False
