"""
test_app.py
Description: Test suite for the app creation, homepage, login, logout, and liked recipes.
Date: November 12th, 2024
Inital Author: Amanda Hoelting
Modified By: 
"""
import unittest
from app import app, db  # Import your Flask app and database from app.py
from flask import json, jsonify
from models import Liked, User, Recipe

# To run in terminal: docker-compose run backend python -m unittest test_cases/test_app.py
class AppTestCase(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        """Executed once before any tests are run."""
        app.config['TESTING'] = True
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'  # In-memory database for testing
        cls.client = app.test_client()  # Create a test client
        with app.app_context():
            db.create_all()  # Create all tables

    @classmethod
    def tearDownClass(cls):
        """Executed after all tests have run."""
        with app.app_context():
            db.session.remove()
            db.drop_all()  # Clean up database

    def setUp(self):
        """Executed before each test method."""
        self.test_data = {'email': 'example@gmail.com', 'password': 'password1'}
        # Register a user and store the user_id
        response = self.client.post('/signup', json=self.test_data)
        data = json.loads(response.data)
        self.user_id = data['user']['userID']  # Assign user_id for subsequent tests
        

    def tearDown(self):
        """Executed after each test method."""
        with app.app_context():
            db.session.query(User).delete()  # Replace MyModel with your model class
            db.session.commit()


    def test_homepage(self):
        """Test the homepage route."""
        response = self.client.get('/')
        self.assertEqual(response.status_code, 404)

    def test_signup_post_route(self):
        """Test the signup POST route."""
        local_test = {'email': 'example2@gmail.com', 'password': 'password1'}
        response = self.client.post('/signup', json=local_test)
        self.assertEqual(response.status_code, 201)
        data = json.loads(response.data)
        self.assertEqual(data['message'], 'User registered successfully')
        self.assertEqual(data['user']['email'], 'example2@gmail.com')  # Adjust based on your route logic


    def test_random_recipe_get_route(self):
        """Test the random recipe POST route."""
        response = self.client.post('/getRandRecipe', json={'user_id': self.user_id})
        self.assertEqual(response.status_code, 200)  # Adjust based on your route logic
        data = json.loads(response.data)
        self.assertIsNotNone(data)

    def test_add_recipe_to_liked_post_route(self):
        """Test adding recipes to liked recipes."""
        test_recipesIDs = [470, 472, 474, 475]
        for recipe_id in test_recipesIDs:
            response = self.client.post(
                '/sendNewRecipe',
                json={'user_id': self.user_id, 'recipe_id': str(recipe_id), "user_action": "heart"}
            )
            self.assertEqual(response.status_code, 200)  # Adjust based on your route logic
            data = json.loads(response.data)
            self.assertIsNotNone(data)

        # Verify liked recipes
        with app.app_context():
            user = User.query.get(self.user_id)
            liked_recipe_ids = [recipe.recipeID for recipe in user.liked_recipes]
            for recipe_id in test_recipesIDs:
                self.assertIn(recipe_id, liked_recipe_ids)

    def test_add_recipe_to_disliked_post_route(self):
        """Test adding recipes to disliked recipes."""
        test_recipesIDs = [767,  768,  769,  771]
        for recipe_id in test_recipesIDs:
            response = self.client.post(
                '/sendNewRecipe',
                json={'user_id': self.user_id, 'recipe_id': str(recipe_id), "user_action": "dislike"}
            )
            self.assertEqual(response.status_code, 200)  # Adjust based on your route logic
            data = json.loads(response.data)
            self.assertIsNotNone(data)

        # Verify liked recipes
        with app.app_context():
            user = User.query.get(self.user_id)
            disliked_recipe_ids = [recipe.recipeID for recipe in user.disliked_recipes]
            for recipe_id in test_recipesIDs:
                self.assertIn(recipe_id, disliked_recipe_ids)
    
    def test_add_liked_recipe_to_meal_planner_post_route(self):
        """Test adding liked recipes to weekly meal planner."""
        test_recipesIDs = [470, 472, 474, 475]
        for recipe_id in test_recipesIDs:
            response = self.client.post(
                '/sendNewRecipe',
                json={'user_id': self.user_id, 'recipe_id': str(recipe_id), "user_action": "add"}
            )
            self.assertEqual(response.status_code, 200)  # Adjust based on your route logic
            data = json.loads(response.data)
            self.assertIsNotNone(data)

        # Verify added recipes
        with app.app_context():
            user = User.query.get(self.user_id)
            meal_plan_recipe_ids = [recipe.recipeID for recipe in user.meal_plans]
            for recipe_id in test_recipesIDs:
                self.assertIn(recipe_id, meal_plan_recipe_ids)

    def test_add_recipe_to_meal_planner_post_route(self):
        """Test adding recipes to weekly meal planner."""
        test_recipesIDs = [321,  322,  324]
        for recipe_id in test_recipesIDs:
            response = self.client.post(
                '/sendNewRecipe',
                json={'user_id': self.user_id, 'recipe_id': str(recipe_id), "user_action": "add"}
            )
            self.assertEqual(response.status_code, 200)  # Adjust based on your route logic
            data = json.loads(response.data)
            self.assertIsNotNone(data)

        # Verify added recipes
        with app.app_context():
            user = User.query.get(self.user_id)
            meal_plan_recipe_ids = [recipe.recipeID for recipe in user.meal_plans]
            for recipe_id in test_recipesIDs:
                self.assertIn(recipe_id, meal_plan_recipe_ids)

    def test_get_shopping_list_post_route(self):
        """Test adding recipes to weekly meal planner."""
        # Test data
        test_recipe_ids = [879, 880, 882]

        # Add recipes to the meal planner
        for recipe_id in test_recipe_ids:
            response = self.client.post(
                '/sendNewRecipe',
                json={'user_id': self.user_id, 'recipe_id': str(recipe_id), "user_action": "add"}
            )
            self.assertEqual(response.status_code, 200)  # Check if the request was successful
            data = json.loads(response.data)
            self.assertIsNotNone(data)

        # Verify recipes are added to the meal planner
        with app.app_context():
            user = User.query.get(self.user_id)
            meal_plan_recipe_ids = [recipe.recipeID for recipe in user.meal_plans]
            for recipe_id in test_recipe_ids:
                self.assertIn(recipe_id, meal_plan_recipe_ids)

            # Verify shopping list contains ingredients of the recipes in the meal planner
            shopping_list_ingredients = [
                (item.ingredient.name, float(item.quantity), item.unit)
                for item in user.shopping_list.ingredients
            ]

            for recipe_id in test_recipe_ids:
                recipe = Recipe.query.get(recipe_id)
                for ingredient in recipe.ingredients:
                    ingredient_details = (
                        ingredient.ingredient.name,
                        float(ingredient.quantity) if ingredient.quantity else None,
                        ingredient.unit,
                    )
                    self.assertIn(ingredient_details, shopping_list_ingredients)
if __name__ == '__main__':

    unittest.main()