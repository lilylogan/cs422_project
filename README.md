# Let's Cook Web Application


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
In order to run the following web application one must have docker installed on their local device, as well as possess a clone of the repository. Steps to do so are as follows:

1. You can head over to [https://www.docker.com/products/docker-desktop/](https://www.docker.com/products/docker-desktop/) to learn how to install docker desktop on your device.
2. To clone the repository simply enter the following command in your local terminal. 
  ```sh
   git clone https://github.com/lilylogan/cs422_project.git
  ```



### Docker Compose
To start the following application on one's local device the user must ascertain that they are in the correct directory, specificially the one containing the docker-compose.yml file. From there proceed to build your Docker image by executing the following command:

>> docker compose up --build

Supposing everything went smoothly, your web application should now be up and running. 


## Members and Roles
* Amanda Hoelting - Back End Manager
* Will Marceau - Front End Manager
* Ellison Largent - Documentation Manager 
* Lily Logan - Project Manager

## Initial Project Proposal
* [Project Plan](./Documentation/Project%20Plan.pdf)
* [SRS](./Documentation/SRS.pdf)
* [SDS](./Documentation/SDS.pdf)

## Additional Documentation
* [Technologies Used](./Documentation/Technologies%20Used.pdf)
