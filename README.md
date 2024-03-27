# SavoryScale API

This is the backend API of [SavoryScale](https://github.com/ctam62/savoryscale).

## Backend Tech Stack
- Express.js
- Node.js
- Knex
- PostgreSQL

## Setup
1) Get a Spoonacular API Key
  
    Sign up for an account and follow the instructions to obtain an API Key for the Spoonacular API at https://spoonacular.com/food-api

<br>

2) Install nodeJS dependencies
    ```
    npm i
    ```
<br>

3) Create a .env file with variables from the sample file .env.sample

    *Note the VITE_APP_API_URL is the url for this backend API

<br>

4) Generate a JWT Key and add to a .env file
    ```
    node -e "console.log(require('crypto').randomBytes(32).toString('hex'));"
    ```
<br>

5) Download and install an instance of the PostgreSQL database for your operating system at the following url. Ensure to save the db account username and password to use for later.

    https://www.pgadmin.org/download/

<br>

6) Create and select the savoryscale database in a separate psql terminal. Enter your password when prompted.
    ```
    psql -U postgres

    CREATE DATABASE savoryscale;
    \c savoryscale;
    ```
<br>

7) Create database tables with knex migrations
    ```
    npm run migrate
    ```
<br>

8) Seed the tables with mealtype categories
    ```
    npm run seed
    ```
<br>

9) Run Express App in development mode
    ```
    npm run dev
    ```

    Or to Start Express App
    ```
    npm start
    ```

