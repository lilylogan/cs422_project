recipe_ids = [   1,    3,    4,    7,   10,   11,   14,   15,   16,   17,   18,
         19,   20,   22,   23,   24,   25,   27,   28,   32,   34,   35,
         38,   41,   42,   45,   46,   47,   48,   49,   50,   51,   53,
         54,   55,   56,   58,   59,   63,   65,   66,   69,   72,   73,
         76,   77,   78,   79,   80,   81,   82,   84,   85,   86,   87,
         89,   90,   94,   96,   97,  100,  103,  104,  107,  108,  109,
        110,  111,  112,  113,  115,  116,  117,  118,  120,  121,  125,
        126,  128,  130,  132,  133,  135,  137,  139,  143,  149,  152,
        153,  155,  156,  158,  159,  160,  161,  162,  163,  167,  169,
        171,  172,  173,  175,  176,  178,  179,  181,  184,  186,  187,
        189,  190,  192,  195,  197,  202,  204,  205,  206,  209,  210,
        211,  212,  213,  214,  216,  217,  219,  220,  222,  223,  224,
        225,  226,  227,  228,  230,  232,  233,  234,  235,  236,  237,
        238,  239,  240,  241,  243,  244,  245,  247,  252,  257,  262,
        263,  270,  274,  275,  279,  283,  285,  300,  304,  309,  313,
        314,  318,  319,  321,  322,  324,  328,  333,  337,  341,  343,
        347,  349,  350,  351,  352,  353,  355,  356,  359,  361,  362,
        363,  364,  365,  366,  367,  368,  369,  370,  372,  374,  376,
        377,  378,  379,  382,  383,  384,  385,  386,  388,  389,  390,
        392,  393,  395,  398,  399,  400,  401,  402,  403,  405,  406,
        407,  408,  409,  410,  411,  412,  413,  414,  415,  416,  417,
        418,  419,  420,  421,  422,  423,  424,  425,  428,  430,  431,
        434,  435,  436,  437,  438,  439,  444,  445,  446,  447,  448,
        452,  453,  454,  455,  457,  458,  460,  461,  462,  463,  464,
        465,  466,  467,  470,  472,  474,  475,  476,  477,  478,  479,
        480,  481,  482,  483,  484,  485,  486,  487,  488,  490,  491,
        492,  494,  495,  496,  497,  499,  503,  507,  508,  510,  512,
        514,  516,  517,  518,  519,  520,  521,  522,  525,  528,  530,
        531,  532,  533,  534,  536,  539,  540,  541,  542,  543,  544,
        545,  546,  548,  549,  550,  551,  552,  554,  555,  556,  557,
        558,  559,  560,  562,  563,  564,  565,  566,  567,  568,  569,
        570,  571,  572,  573,  575,  576,  577,  579,  581,  582,  583,
        585,  587,  588,  589,  590,  591,  592,  597,  598,  599,  603,
        604,  606,  608,  609,  611,  612,  613,  614,  615,  616,  617,
        618,  619,  624,  625,  626,  628,  630,  631,  633,  635,  636,
        637,  638,  642,  643,  648,  653,  654,  655,  657,  659,  661,
        663,  665,  669,  670,  671,  672,  674,  675,  676,  681,  684,
        685,  688,  692,  693,  696,  698,  701,  702,  704,  705,  706,
        708,  709,  711,  720,  725,  726,  728,  729,  735,  736,  738,
        740,  744,  746,  750,  751,  753,  754,  756,  758,  760,  761,
        763,  764,  765,  767,  768,  769,  771,  772,  773,  774,  775,
        776,  777,  782,  783,  787,  791,  794,  801,  809,  810,  819,
        820,  821,  822,  825,  827,  830,  831,  832,  834,  835,  836,
        837,  838,  839,  841,  842,  843,  844,  848,  850,  852,  853,
        854,  855,  856,  857,  859,  860,  862,  863,  864,  866,  870,
        871,  874,  875,  876,  878,  879,  880,  882,  883,  885,  886,
        887,  888,  889,  890,  891,  894,  895,  897,  898,  899,  900,
        901,  902,  903,  906,  907,  908,  914,  916,  917,  918,  920,
        921,  922,  923,  924,  925,  926,  927,  928,  930,  931,  932,
        934,  935,  937,  938,  939,  944,  945,  947,  948,  949,  951,
        952,  954,  955,  956,  957,  960,  962,  965,  966,  970,  971,
        974,  975,  979,  980,  981,  982,  984,  985,  987,  988,  989,
        991,  992,  993,  998,  999, 1001, 1002, 1003, 1005, 1006, 1009,
       1010, 1012, 1014, 1015, 1016, 1017, 1018, 1019, 1020, 1025, 1027,
       1030, 1031, 1033, 1035, 1036, 1037, 1043, 1045, 1047, 1048, 1049,
       1050, 1051, 1053, 1056, 1057, 1058, 1059, 1060, 1061, 1062, 1063,
       1064, 1065, 1066, 1067, 1069, 1070, 1075, 1077, 1081, 1082, 1083,
       1084, 1085, 1087, 1088]

import random
class recipeDeck:
    ''' This module will take in a user's liked recipe table, their disliked recipes, 
        an array of recipe id's they have already seen, and the recipe database.
    '''
    def __init__(self, RecipeModel, UserModel):
        # User disliked recipes
        # Recipe id's they have seen this session (will be empty array originally)
        # Recipe database
        #with current_app.app_context():
        self.RecipeModel = RecipeModel
        self.UserModel = UserModel
        first_recipe = RecipeModel.query.first()
        self.length = len(recipe_ids)
        self.first_recipe_name = first_recipe.name if first_recipe else None
        self.first_prepTime = first_recipe.prepTime if first_recipe else None
        self.first_servings = first_recipe.servings if first_recipe else None
        self.first_cookTime = first_recipe.cookTime if first_recipe else None
        self.first_totalTime = first_recipe.totalTime if first_recipe else None
        self.first_cuisine = first_recipe.cuisine if first_recipe else None
        self.first_image_path = first_recipe.image_path if first_recipe else None
        self.first_ingredients_dict = first_recipe.ingredients if first_recipe else None
        self.first_instructions = first_recipe.instructions if first_recipe else None

        
        print(f"The name of the first recipe is: {self.first_recipe_name}")


    def genRecipe(self, user_id):
        """This method will randomly select a recipe that
        is not in the user's liked recipes, disliked recipes,
        or the user's seen recipes in the current session and
        return the recipe database entry."""

        
        # Fetch the user
        user = self.UserModel.query.filter_by(userID=user_id).first()
        if not user:
            return None  # User does not exist
            
          
        ranRecipe = None
        while (ranRecipe == None):
            try:
                num = random.randint(0, self.length)
                ranRecipeID = recipe_ids[num] 
                # Check if the recipe is in liked or disliked recipes
                in_likes = any(recipe.ranRecipeID == ranRecipeID for recipe in user.liked_recipes)
                in_dislikes = any(recipe.ranRecipeID == ranRecipeID for recipe in user.disliked_recipes)
                #in_mealPlan = any(recipe.ranRecipeID == ranRecipeID for recipe in user.meal_plans)
                if not in_likes and not in_dislikes:
                    ranRecipe= self.RecipeModel.query.get(ranRecipeID)
            except Exception as e:
                print(f"Error checking recipe in likes or dislikes: {e}")
                return None
        print(ranRecipe.ingredients)
        recipe = {"recipeID": ranRecipe.recipeID, "recipe_name": ranRecipe.name, "prep_time": ranRecipe.prepTime, "servings": ranRecipe.servings, "cook_time": ranRecipe.cookTime, "total_time": ranRecipe.totalTime, "cuisine": ranRecipe.cuisine, "image_path": ranRecipe.image_path, "instructions": ranRecipe.instructions, "ingredients": ranRecipe.get_ingredient_list() }
        return recipe

    def genLikedRecipe(self, user_id):
        """This method will randomly select a recipe that
        is in the user's liked recipes but not one they have already
        seen in their current session."""
        user = self.UserModel.query.filter_by(userID=user_id).first()
        if not user:
            return None # change to error
        liked_recipe_ids = [recipe.recipeID for recipe in user.liked_recipes]
        liked_len = len(liked_recipe_ids)
        ranLikedRecipe = None
        while (ranLikedRecipe == None):
            num = random.randint(0, )
            ranRecipeID = liked_recipe_ids[num]
            ranRecipe= self.RecipeModel.query.get(ranRecipeID)
        recipe = {"recipeID": ranRecipe.recipeID, "recipe_name": ranRecipe.name, "prep_time": ranRecipe.prepTime, "servings": ranRecipe.servings, "cook_time": ranRecipe.cookTime, "cuisine": ranRecipe.cuisine, "image_path": ranRecipe.image_path, "instructions": ranRecipe.instructions, "ingredients": ranRecipe.get_ingredient_list() }
        return recipe
            
        
        