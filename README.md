# nodeJSDemo
Node JS usage demo for school 

## Purpose

This project is made usign NodeJS, MongoDB, Mongoose, EJS, dotenv and ExpressJS as an demonstration for a school project.

## Description

- The main file is **server.js**.
- All routes and controllers are defined here (because it is a vey small app)
- There are three main models: **Users**, **FavoriteBrands** and **UserBrand** (userbrand store id of both previous models)
- there are three tables too: **personnages**, **favoritebrands** and **userbrands** (user brand is like a link table)

## Usage
1. Create a database on mongodb and create an entry as a test with ```js { name:Eric, genre "M" }``` 
2. Execute the seeder ```npm run seed ``` to populate db with *favoritebrands* collection
3. Set the correct db connection informations inside the **.env** file (there is a .env.example)
4. launch the server with ```node server.js``` or ``` npm run start ```
5. Access with your browser to the main url http://hostname:port/

- On the home page you should see the name Eric (see step 1), it means that the db querying works correctly
- You can add a new user with the form, add a name, select a favorite brand and submit, a message will appear above the form to indicate the success or failure of the operation.
- There is a list of all users on the homepage, you can modiy their infos by clicking on their name. You can navigate with previous and next buttons.
- When you edit a user, you can change the name and the brand, you must validate your changes with the button. To go back home click the button at the top left of the page
- You can view history of changes when updating favorite brands of a user on clicking a username


## Commanges
- ``` npm run seed ``` : Run seeder to insert favorite brands
- ``` npm run start ``` : Start the server
