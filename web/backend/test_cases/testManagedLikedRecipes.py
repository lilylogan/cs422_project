import unittest
from app import app, db  # Import your Flask app and database from app.py
from flask import json
from models import Liked, User

# To run in terminal: docker-compose run backend python -m unittest test_cases/testManagedLikedRecipes.py
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

    def tearDown(self):
        """Executed after each test method."""
        with app.app_context():
            db.session.query(User).delete()  # Replace MyModel with your model class
            db.session.commit()

    def test_homepage(self):
        """Test the homepage route."""
        response = self.client.get('/')
        self.assertEqual(response.status_code, 404)
        #self.assertIn(b'Welcome', response.data)  # Adjust text based on your homepage content

    def test_signup_post_route(self):
        """Test the signup POST route."""
        response = self.client.post('/signup', json=self.test_data)
        self.assertEqual(response.status_code, 201)
        data = json.loads(response.data)
        self.assertEqual(data['message'], 'User registered successfully')
        self.assertEqual(data['user']['email'], 'example@gmail.com')  # Adjust based on your route logic

    def test_random_recipe_get_route(self):
        """Test the signup POST route."""
        response = self.client.get('/getRandRecipe')
        data = json.loads(response.data)
        self.assertIsNotNone(data)
    
    
    


    """
    def test_database_entry(self):
        #Test if a database entry is created.
        with app.app_context():
            # Replace MyModel with your database model and adjust the logic
            new_entry = User(name="Test Entry")
            db.session.add(new_entry)
            db.session.commit()

            result = db.session.query(Liked).filter_by(name="Test Entry").first()
            self.assertIsNotNone(result)
            self.assertEqual(result.name, "Test Entry")

    """
if __name__ == '__main__':
    unittest.main()