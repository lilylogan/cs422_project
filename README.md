# Let's Cook Web Application for CS 422 Group Project

## Members and Roles
* Amanda Hoelting - Back End Manager
* Ellison Largent - Documentation Manager 
* Lily Logan - Project Manager
* Will Marceau - Front End Manager

## Aplication Description


A web application with login capabilities, made for those who are tired of trying to find out what to make for dinner for the week. The basis of the web app is that the user will be presented with recipe after recipe one at a time till they find one to cook. While doing this the user can filter the recipes to what they want to see, sort them into their meal plan, dislikes, or pin them as favorites. Beyond this they can move around the meals for each day of the week and view their week's recipes and add the ingredients to their shopping list. 


## Page Usage and Purpose

1. **Sign-Up and Login Page:** Create an account and/or gain access to authorized view of the app including all following pages. 
2. **Home Page:** Swipe right to add recipe to meal planner. Swipe left to add recipe to disliked recipes. Swipe down to ignore meal and move on to the next one. Click the heart icon to add or remove the recipe from your liked recipe list. 
3. **Settings Page:** Modify user details such as name, and photo. Logout or delete account. 
4. **Meal Planner and Shopping List Page:** View current meals in plan. Modify meal plan by moving or removing meals. View current shopping list. Check off and remove items as needed. Add custom items to shopping list.
5. **Liked Recipes Page:** View all liked recipes by the present user. Remove meal from liked recipes by clicking on the trash can next to it. Click learn more to open the recipe pop up. 


## Instructions for Use

### Requirements
In order to run the following web application one must have docker installed on their local device, as well as possess a clone of the repository. Other requirements and dependencies are listed in the requirements.txt file inside the repositiory.  Steps to do so are as follows:

1. You can head over to [https://www.docker.com/products/docker-desktop/](https://www.docker.com/products/docker-desktop/) to learn how to install docker desktop on your device.
2. To clone the repository simply enter the following command in your local terminal. 
  ```sh
   git clone https://github.com/lilylogan/cs422_project.git
  ```



### Docker Compose
To start the following application on one's local device the user must ascertain that they are in the correct directory, specificially the one containing the docker-compose.yml file. From there proceed to build your Docker image by executing the following command:

>> docker compose up --build

Supposing everything went smoothly, your web application should now be up and running. 



## Directory Organization

# Documentation
* Project Plan.pdf: The plan for how our project was to be approached and accomplished over a ten week period, authored by Lily Logan the Project Manager.
* SDS.pdf: The Software Design Specifications of the "Let's Cook!" in greater detail.
* SRS.pdf: The Software Requirements Specifications of the "Let's Cook!" project in greater detail including the Concept of Operations (ConOps).
* Technologies Used.pdf: A list of what technologies this project uses and some detail on how.

  
# recipe_data
* images: a folder containing all the images corresponding to the recipes in the database.
* recipe_dataset_vis.ipynb, recipe_db.py, recipes.csv, recipes.db, recipes_clean.csv, final_final_recipes.csv: Various files relating to the imported recipe dataset and the process by which it was cleaned, as well as a copy of the cleaned, uncleaned, and final version of the set.

# web
* backend: stores backend files
  * images: contains images for recipes from dataset to be shown on the app
  * templates: Basic error page to display in the event of something going wrong
  * test_cases: a folder to put the test case file for testing the app and ensuring everything works.
  * Dockerfile.backend: contains the necessary components to be added to the docker image required by the backend
  * app.py: the main file for running the app, handles much of the backend processsing as it holds the api endpoints for the front end to talk to
  * auth.py: contains logic for checking valid login and signup attempts
  * manageLikedRecipes.py: contains the logic for adding or removing recipes from liked, disliked, and meal planner
  * fr_final_recipe.csv: the final rendition of the dataset for recipes
  * manageShoppingList.py: contains the logic for formatiing and accessing the shopping list as well as managing what happens to ingredients when a recipe is removed or added to the meal planner
  * mealPlanner.py: handles fetching and returning meals from the meal planner.
  * models.py: the basis for the database creation, uses sqlalchemy, and pymysql
  * recipeDeck.py: contains the logic for generating and fetching a random or liked recipe based on if in discovery or liked deck
  * requirements.txt: contains the required software dependencies for the backend to function as it should, is used in the docker files
 
* frontend: stores frontend files
  * public: contains public images such as the favicon.ico to display in the tab of the window, as well as the index.html to handle basic rendering.
  * src:
    * assets: contains images for profile photo options, as well as the login image, magnifying glass image, the help images for the help button and the font we choose for our logo.
    * components: contains components that comprise the various pages of the webapp when used together
    * constants: contains theme colors for easier changing in future.
    * containers: contains various containers used throughout the project in various pages
    * context: contains AuthContext.js that provides checking for authenitcation, used to access the current user information
    * app.css: contains general styling for the frontend
    * app.js: contains base layout of the web app in terms of routes 
  * package.json: stores information central to the confifguration of the project.
  * Dockerfile.frontend: contains the necessary components to be added to the docker image required by the frontend
* docker-compose.yml: a docker compose file that can be built and ran to run the program locally in a container.
* run.sh: a script to build the docker image and run the program locally.
# READMEmd
The current file you are reading that describes the system, requirements, installation, purpose, and authors of the project.

## Initial Project Proposal
* [Project Plan](./Documentation/Project%20Plan.pdf)
* [SRS](./Documentation/SRS.pdf)
* [SDS](./Documentation/SDS.pdf)

## Additional Documentation
* [Technologies Used](./Documentation/Technologies%20Used.pdf)

## Date Created
October 10th, 2024
