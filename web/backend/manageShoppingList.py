from models import db
from sqlalchemy import desc
from sqlalchemy.orm import joinedload

class manageShoppingList:
    """ This module will take in a user id and aid with formatting of the shopping list as well as 
    the measurements of the list
    """

    def __init__(self, userDB, recipeDB, mealPlanDB, recipeContentsDB, recipeIngredientsDB, shoppingListDB, shoppingListContentsDB, shoppingListIngredientDB):
        self.user_db = userDB
        self.recipe_db = recipeDB
        self.plan_db = mealPlanDB
        self.recipeContentsDB = recipeContentsDB
        self.recipeIngredientsDB = recipeIngredientsDB
        self.shoppingListDB = shoppingListDB
        self.shoppingListContentsDB = shoppingListContentsDB
        self.shoppingListIngredientsDB = shoppingListIngredientDB

    def getShoppingList(self, user_id):
        """gets all the ingredients of the recipes in mealplan for the user and 
        returns them in a list format
        """
        user = self.user_db.query.get(user_id)

        # Retrieve ingredients from the recipe
        shopping_ingredients_contents = (
            self.shoppingListContentsDB.query
            .filter_by(listID=user_id)
            .all()
        )

        return_ingredients = []

        for ingredient in shopping_ingredients_contents:

            # shoppinglistcontents has listid, ingredientID, quantity, unit

            # shoppinglistingredient has ingredientID and name

            ingredient_id = ingredient.ingredientID
            quantity = ingredient.quantity
            unit = ingredient.unit

            shopping_list_ingredient = self.shoppingListIngredientsDB.query.filter_by(ingredientID=ingredient_id).first()

            name = shopping_list_ingredient.name

            return_ingredients.append(f"{quantity} {unit} {name}")


            parts = []

            # Add quantity if it's not None
            if quantity is not None:
                parts.append(str(quantity))

            # Add unit if it's not None
            if unit is not None:
                parts.append(unit)

            # Add ingredient name if it's not None
            if name is not None:
                parts.append(name)

            # Join the non-None parts with a space
            ingredient_string = " ".join(parts)

            # Only add non-empty strings to the list
            if ingredient_string:
                return_ingredients.append(ingredient_string)

        print(f"shopping list ingredients {return_ingredients}")
        
        return return_ingredients




        


    