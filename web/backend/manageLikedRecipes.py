from models import db
from sqlalchemy import desc
from sqlalchemy.orm import joinedload
class likedRecipes:
    ''' This module will take in a recipe id and add it to the user's liked recipes
    or disliked recipes depending on which way they swipe.
    '''
    def __init__(self, userDB, recipeDB, mealPlanDB):
        # Initializing the userDB
        self.user_db = userDB
        self.recipe_db = recipeDB
        self.plan_db = mealPlanDB
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
            return
        
    def get_next_day(self, current_day):
        days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        current_index = days.index(current_day)
        next_index = (current_index + 1) % len(days)
        return days[next_index]
        
    def addToMealPlanner(self, user_id, recipe_id):
        # Retrieve the user and recipe by their IDs
        user =  self.user_db.query.get(user_id)
        recipe =  self.recipe_db.query.get(recipe_id)
        
        # Ensure both the user and recipe exist
        if not user or not recipe:
            print(f"User or Recipe not found. User ID: {user_id}, Recipe ID: {recipe_id}")
            return False
        
        # Get the most recent meal plan entry for this user by `dayOfWeek` in descending order
        last_meal = self.plan_db.query.filter_by(userID=user_id).order_by(desc(self.plan_db.dayOfWeek)).first()

        # Retrieve the `dayOfWeek` from the last meal plan entry and calculate the next day
        if last_meal:
            current_day = last_meal.dayOfWeek
            next_day = self.get_next_day(current_day)
            # Pop the last meal plan entry from the database
            # db.session.delete(last_meal)
            print(f"Popped last meal plan entry for User ID {user_id}: {current_day} - Recipe ID {last_meal.recipeID}")
        else:
            # Default to Monday if no previous entries are found
            next_day = 'Monday'

        # Create a new meal plan entry with the next day
        new_meal = self.plan_db(userID=user_id, recipeID=recipe_id, dayOfWeek=next_day)
        db.session.add(new_meal)
        
        # Commit the changes to the database
        try:
            db.session.commit()
            print(f"Added Recipe ID {recipe_id} to User ID {user_id}'s meal plan for {next_day}")

            """
            An example on how to get a meal plan for a user on a specific day and print it:
            # Query MealInPlan for the user's meals on the specified day
            meals = (
                self.plan_db.query
                .filter_by(userID=user_id, dayOfWeek="Tuesday")
                .options(joinedload(self.plan_db.recipe))  # Load related recipe data
                .all()
            )
            
            # Extract recipes for the meals
            recipes = [meal.recipe for meal in meals]
            
            print(recipes)
            """

            return True
        except Exception as e:
            db.session.rollback()
            print(f"Failed to add meal to plan: {e}")
            return False