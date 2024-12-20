"""
mealPlanner.py
Description: Contains functionality for fetching meals from meal planner tied to user
Inital Author: Ellison Largent
Date: November 15th, 2024
Modified By: Lily Logan
"""
from flask import jsonify
from models import MealInPlan, User

def get_user_planned_meals(user_id):
    """
    Get all planned meals for a specific user.
    
    Args:
        user_id: The ID of the user whose meal plans to retrieve
        
    Returns:
        tuple: (meals_by_day dictionary, status code)
    """
    try:
        # Query meal plans for current user
        meal_plans = MealInPlan.query.filter_by(userID=user_id).all()

        user = User.query.filter_by(userID=user_id).first()
        if not user:
            return None  # User does not exist
                
        # Create a dictionary to store meals by day
        meals_by_day = {
            'Sunday': [], 'Monday': [], 'Tuesday': [], 'Wednesday': [],
            'Thursday': [], 'Friday': [], 'Saturday': []
        }

        # Populate the meals for each day
        for meal in meal_plans:
            recipe = meal.recipe
            in_likes = any(liked.recipeID == recipe.recipeID for liked in user.liked_recipes)

            if in_likes:
                toggle = "heart"
            else:
                toggle = "unHeart"
            
            meal_data = {
                'id': recipe.recipeID,
                'name': recipe.name,
                'cook_time': recipe.cookTime,
                'prep_time': recipe.prepTime,
                'total_time': recipe.totalTime,
                'cuisine': recipe.cuisine,
                'servings': recipe.servings,
                'instructions': recipe.instructions,
                'ingredients' : recipe.get_ingredient_list(),
                'image_path': recipe.image_path,
                'toggle': toggle,
            }
            meals_by_day[meal.dayOfWeek].append(meal_data)
            
        return meals_by_day, 200
        
    except Exception as e:
        print(f"Error fetching meal plans: {str(e)}")
        return {'error': 'Failed to fetch meal plans'}, 500