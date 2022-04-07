# nodeJSDemo
Node JS usage demo for school 

## Purpose

This project is made usign NodeJS, MongoDB, Mongoose, EJS, dotenv and ExpressJS as an demonstration for a school project.

## Description

- The main file is **server.js**.
- All routes and controllers are defined here (because it is a vey small app)
- There are two main models: **Users** and **FavoriteBrands** and infos are *joined* with a foreign key on user document

## Usage
1. Create a database on mongodb and create an entry as a test with ```js { name:Eric, genre "M" }``` 
2. Execute the seeder ```npm run seed ``` to populate db with *favoritebrands* collection
3. Set the correct db connection informations inside the **.env** file (there is a .env.example)
4. launch the server with ```node server.js``` or ``` npm run start ```
5. Access with your browser to the main url http://hostname:port/

- On the home page you should see the name Eric (see step 1), it means that the db querying works correctly
- There is a list of all users on the homepage, you can modiy their infos by clicking on their name
- You can insert new users and favorite brand by filling the fields and click on submit button (a message should appear in case of success or error)


## Commanges
- ``` npm run seed ``` : Run seeder to insert favorite brands
- ``` npm run start ``` : Start the server
