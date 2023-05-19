# Fullstack

This is a practice project that i have created to learn MERN Stack

# Steps followed

Create the package json with default values

> npm init -y

Download NodeJs and install express

> npm i express

Install Nodemon as dev dependency

> npm i nodemon -D

Install data-fns package and uuid package

> npm i date-fns uuid

Install cookie-parser package

> npm i cookie-parser

Install cors package for handling CORS policy

> npm i cors

Install dotenv package for environment files

> npm i dotenv

## Setup Mongo Database

-   Log in to MongoDB
-   Create a new project -> name it MongoLearning
-   Build a Database -> choose free -> create a shared cluster -> create cluster
-   Click on add my own data
-   Create a database -> database name = techNotesDB & collection=users
-   Database access -> Create a database user -> add new database user -> Give the read and write to any database privileges
-   Goto Databases -> Connect -> allow access from anywhere -> add ip address button-> choose a connection method -> Connecting with MongoDB Driver (NodeJs) -> copy the connection string.
-   Paste the Communication string in env file(DATABASE_URI) with encoding applied to it for special characters -> method = encodeURIComponent("<password>").
-   Done ✅

Install mongoose package for communicating with the MongoDB

> npm i mongoose

Install mongoose-sequence package for generating sequential ids

> npm i mongoose-sequence
