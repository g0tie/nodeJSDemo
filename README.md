# nodeJSDemo
Node JS usage demo for school 

## Purpose

This project is made usign NodeJS, MongoDB, Mongoose and ExpressJS as an demonstration for a school project.

## Description

- The main file is **server.js**.
- All routes and controllers are defined here (because it is a vey small app)

## Usage
1. Create a database on mongodb and create on entry as a test with ```js { name:Eric, genre "M" }``` 
2. Set the correct db connection informations inside the **.env** file (there is a .env.example)
3. launch the server with ```node server.js```
4. Access with your browser to the main url http://<host>:<port>/

- On the home page you should see the name Eric (see step 1), it means that the db querying works correctly
- You can insert new users by filling the fields and click on submit button (a message should appear in case of success or error)
- You can access to a specific user by adding his username in the url to modify informations http://<host>:<port>/personne/<username> (a message should appear in case of success or error)