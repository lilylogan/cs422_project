"""
manageShoppingList.py
Description:  
Date: 
Inital Author: 
Modified By: 
"""
from models import db
from sqlalchemy import desc
from sqlalchemy.orm import joinedload
import parse_ingredient
from flask import Flask, render_template, abort, jsonify, request, send_from_directory


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

        # shopping list has listID and userID (same)
        # shopping list ingredients has ingredientID and name
        # shopping list contents has listID (same as user) ingredientID quantity and unit

    def getShoppingList(self, user_id):
        """gets all the ingredients of the recipes in mealplan for the user and 
        returns them in a dict format
        """

        # { id:
        #   {name: , 
        #    unit: ,
        #    quantity: }   
        # }

        # Initialize the final structure
        final_product = {}

        # Retrieve ingredients from the recipe
        shopping_ingredients_contents = (
            self.shoppingListContentsDB.query
            .filter_by(listID=user_id)
            .all()
        )
    
        # Loop through ingredients and store in format

        for ingredient in shopping_ingredients_contents:
            ingredient_id = ingredient.ingredientID
            quantity = ingredient.quantity
            unit = ingredient.unit
            checked = ingredient.checked

            # Get name grom shopping list ingredient db
            shopping_list_ingredient = self.shoppingListIngredientsDB.query.filter_by(ingredientID=ingredient_id).first()

            name = shopping_list_ingredient.name

            # add to final dictionary
            final_product[ingredient_id] = {}

            final_product[ingredient_id]["name"] = name
            if unit is not None:
                final_product[ingredient_id]["unit"] = self.abbreviate(unit)
            else: 
                final_product[ingredient_id]["unit"] = unit

            if (quantity is not None):
                final_product[ingredient_id]["quantity"] = float(quantity)
            else:
                 final_product[ingredient_id]["quantity"] = None
            final_product[ingredient_id]["checked"] = checked
        
        return final_product
    

    def addToShoppingListManually(self, user_id, item):
        """Adds to the shopping list
        This can be when the user adds to the list manually
        NOTE: item is a string
        """
        # get the quantity unit and name

        parsed_item = parse_ingredient.parse(item)
        
        name = parsed_item.product
        quantity = parsed_item.quantity
        unit = parsed_item.unit
        checked = False
        
        # # get shopping list
        shopping_list = self.shoppingListDB.query.get(user_id)

        # # create entry in ingredients (using name and ingredient id (autogenerates))
        new_ingredient_entry = self.shoppingListIngredientsDB(
            name=name
        )

        try:
                db.session.add(new_ingredient_entry)
                db.session.commit()
                print("recipe ingredient added to shopping list")
        except Exception as e:
                db.session.rollback()  # Roll back in case of failure
                print(f"Error during database commit: {e}")

        ingredient_id = new_ingredient_entry.ingredientID

        # create entry in contents (using listID, ingredientID, quantity, and unit)
        new_contents_entry = self.shoppingListContentsDB(
             listID=shopping_list.listID,
             ingredientID=ingredient_id,
             quantity=quantity,
             unit=unit,
             checked = False
        )

        try:
                db.session.add(new_contents_entry)
                db.session.commit()
                print("ingredient added to shopping list contents")
        except Exception as e:
                db.session.rollback()  # Roll back in case of failure
                print(f"Error during database commit: {e}")

        # add to any existing content (using the function? or just the adding to the quantity, but need to make sure the
        # units are the same!!)    


    def removeItem(self, user_id, item_id):
        """Removes one item from the shopping list
        This could either be when the user removes once single item or when they delete
        a recipe from their meal plan (this is implemented in separate function)
        NOTE: item is NOT a string but a class that consits of a name and ingredient id (shoppingListIngredient)
        """

        # get shopping list
        # user = self.user_db.query.get(user_id)
        shopping_list = self.shoppingListDB.query.get(user_id)

        # get shoppingListContents (to get quantity)

        shopping_list_content = self.shoppingListContentsDB.query.filter_by(listID=shopping_list.listID, ingredientID=item_id).first()
        shopping_list_ingredient = self.shoppingListIngredientsDB.query.filter_by(ingredientID=item_id).first()

        if not shopping_list_content or not shopping_list_ingredient:
             return jsonify({'error': 'ingredient not found in shopping list'}), 404

        try:

            db.session.delete(shopping_list_content)
            db.session.commit()
        
            db.session.delete(shopping_list_ingredient)
            db.session.commit()

            return jsonify({'message': 'ingredient removed successfully from shopping list'}), 200
    
        except Exception as e:
            print(f"Error removing ingredient: {str(e)}")
            db.session.rollback()
            return jsonify({'error': 'Failed to remove ingredient'}), 500 

    
    def removeRecipeInShoppingList(self, user_id, recipe_id):
        """This removes all of the ingredients which are in this recipe from 
        the user's shopping list
        """

        # NOTE: this should be called in the deleting from meal planner

        # get the recipe ingredients
        recipe_ingredients = (
            self.recipeContentsDB.query
            .filter_by(recipeID=recipe_id)
            .all()
        )
        for ingredient in recipe_ingredients:
            self.removeItem(ingredient.ingredientID)

    def abbreviate(self, unit):
        # Volume
        if unit.lower() == "teaspoon":
            return "tsp"
        if unit.lower() == "tablespoon":
            return "Tbs"
        if unit.lower() == "cup":
            return "cup"
        if unit.lower() == "pint":
            return "pnt"
        if unit.lower() == "quart":
            return "qt"
        if unit.lower() == "gallon":
            return "gal"
        if unit.lower() == "milliliter":
            return "ml"
        if unit.lower() == "liter":
            return "l"
        if unit.lower() == "deciliter":
            return "dl"
        
        # Length
        if unit.lower() == "millimeter":
            return "mm"
        if unit.lower() == "centimeter":
            return "cm"
        if unit.lower() == "meter":
            return "m"
        if unit.lower() == "kilometer":
            return "km"
        if unit.lower() == "inch":
            return "in"
        if unit.lower() == "foot" or unit.lower() == "feet":
            return "ft"
        if unit.lower() == "yard":
            return "yd"
        if unit.lower() == "mile":
            return "mi"
        
        # Weight/Mass
        if unit.lower() == "milligram":
            return "mg"
        if unit.lower() == "gram":
            return "g"
        if unit.lower() == "kilogram":
            return "kg"
        if unit.lower() == "metric ton":
            return "mt"
        if unit.lower() == "ounce":
            return "oz"
        if unit.lower() == "pound":
            return "lb"
        
        # Area
        if unit.lower() == "square millimeter":
            return "mm2"
        if unit.lower() == "square centimeter":
            return "cm2"
        if unit.lower() == "square meter":
            return "m2"
        if unit.lower() == "hectare":
            return "ha"
        if unit.lower() == "square kilometer":
            return "km2"
        if unit.lower() == "acre":
            return "ac"
        
        # Volume (alternative)
        if unit.lower() == "cubic meter":
            return "m3"
        if unit.lower() == "cubic centimeter":
            return "cm3"
        if unit.lower() == "cubic millimeter":
            return "mm3"
        
        # Time
        if unit.lower() == "second":
            return "s"
        if unit.lower() == "minute":
            return "min"
        if unit.lower() == "hour":
            return "h"
        if unit.lower() == "day":
            return "d"
        if unit.lower() == "week":
            return "week"
        if unit.lower() == "month":
            return "month"
        if unit.lower() == "year":
            return "year"
        

    def check(self, user_id, item_id):
        """
        Toggles the 'checked' status of an item in the shopping list.
        """

        # Retrieve the shopping list entry
        shopping_list = self.shoppingListDB.query.get(user_id)

        if not shopping_list:
            return jsonify({'error': 'Shopping list not found for the user'}), 404

        # Retrieve the specific shopping list content
        shopping_list_content = self.shoppingListContentsDB.query.filter_by(
            listID=shopping_list.listID,
            ingredientID=item_id
        ).first()

        if not shopping_list_content:
            return jsonify({'error': 'Ingredient not found in shopping list'}), 404

        try:
            # Toggle the checked status
            shopping_list_content.checked = not shopping_list_content.checked
            
            # Commit the changes
            db.session.commit()
            return jsonify({
                'message': 'Ingredient checked status updated successfully',
                'ingredientID': item_id,
                'checked': shopping_list_content.checked
            }), 200

        except Exception as e:
            db.session.rollback()
            return jsonify({'error': f'Failed to update checked status: {str(e)}'}), 500

    
    # Unsupported unit
    # raise ValueError(f"Unsupported unit {unit}, use one of the supported units.")

    # def convert(self, quantity, unit):
    #     """Convers an ingredients units and quantity to match the standard
    #     Standard: 
    #     """
    #     pass
    # def convert(self, first_ingredient, second_ingredient):
        # """Convers second ingredients units and quantity to match the first ingredient given
        #    Each are in the shopping list
        #    Name (are == ) are from shoppingListIngredients
        #    Quantity and Unit are in shoppingListContents

        #    from shopping_ingredients_contents
        # """
        # # (need to check if no units or no quantities)


        # first_ingredient_unit = first_ingredient["unit"]
        # first_ingredient_quantity = first_ingredient["quantity"]
        # if (first_ingredient_quantity is None):
        #     first_ingredient_quantity = 0
        
        # second_ingredient_unit = second_ingredient.unit
        # second_ingredient_quantity = second_ingredient.quantity
        # if (second_ingredient_quantity is None):
        #     second_ingredient_quantity = 0

        # if first_ingredient_unit is None or second_ingredient_unit is None:
        #     combined_ingredient_unit = None
        #     combined_ingredient_quantity = float(first_ingredient_quantity) + float(second_ingredient_quantity)
        #     return (combined_ingredient_unit, combined_ingredient_quantity)

        # if first_ingredient_unit == second_ingredient_unit:
        #     combined_ingredient_quantity = float(second_ingredient_quantity) + float(first_ingredient_quantity)
        #     return (first_ingredient_unit, combined_ingredient_quantity)

        # # Example with units_convertor
        # # units_convertor("2.5", to_unit="g", from_unit="fl oz", ingredient="skimmed milk")
        # # Output: {"converted value": 76.152, "unit": "g"}

        # print(f"quantity converted {second_ingredient_quantity}, quantity converting {first_ingredient_quantity}")
        # print(f"unit converted {second_ingredient_unit}, unit converting {first_ingredient_unit}")

        # convertor_output = units_convertor(float(second_ingredient_quantity), to_unit=first_ingredient_unit, from_unit=second_ingredient_unit)

        # print(f"convertor output {convertor_output}")
        # combined_ingredient_unit = convertor_output["unit"]
        # combined_ingredient_quantity = convertor_output["converted value"] + float(first_ingredient_quantity)

        # return (combined_ingredient_unit, combined_ingredient_quantity)
