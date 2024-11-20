from flask import jsonify
from models import MealInPlan
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
        
        # Add debug logging
        print(f"Found {len(meal_plans)} meal plans for user {user_id}")
        
        # Create a dictionary to store meals by day
        meals_by_day = {
            'Sunday': [], 'Monday': [], 'Tuesday': [], 'Wednesday': [],
            'Thursday': [], 'Friday': [], 'Saturday': []
        }
        
        # Populate the meals for each day
        for meal in meal_plans:
            recipe = meal.recipe
            print(f"Processing meal plan: Day={meal.dayOfWeek}, Recipe={recipe.name}")
            
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
                'image_path': recipe.image_path
            }
            meals_by_day[meal.dayOfWeek].append(meal_data)
            
        # Add debug logging for final result
        for day, meals in meals_by_day.items():
            print(f"{day}: {len(meals)} meals")
            
        return meals_by_day, 200
        
    except Exception as e:
        print(f"Error fetching meal plans: {str(e)}")
        return {'error': 'Failed to fetch meal plans'}, 500