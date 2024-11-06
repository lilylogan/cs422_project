
class recipeDeck:
    ''' This module will take in a user's liked recipe table, their disliked recipes, 
        an array of recipe id's they have already seen, and the recipe database.
    '''
    def __init__(self, RecipeModel):
        # User disliked recipes
        # Recipe id's they have seen this session (will be empty array originally)
        # Recipe database
        #with current_app.app_context():
        first_recipe = RecipeModel.query.first()
        self.first_recipe_name = first_recipe.name if first_recipe else None
        self.first_prepTime = first_recipe.prepTime if first_recipe else None
        self.first_servings = first_recipe.servings if first_recipe else None
        print(f"The name of the first recipe is: {self.first_recipe_name}")


    def genRecipe(self):
        """This method will randomly select a recipe that
        is not in the user's liked recipes, disliked recipes,
        or the user's seen recipes in the current session and
        return the recipe database entry."""
        recipe = {"recipe_name": self.first_recipe_name, "prep_time": self.first_prepTime, "servings": self.first_servings}
        return recipe

    def genLikedRecipe(self):
        """This method will randomly select a recipe that
        is in the user's liked recipes but not one they have already
        seen in their current session."""
        pass