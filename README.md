# SavoryScale API

This is the backend API of [SavoryScale](https://github.com/ctam62/savoryscale).

## Backend Tech Stack
- Express.js
- Node.js
- Knex
- PostgreSQL

## Setup
Install nodeJS dependencies
```
npm i
```
Generate a JWT Key and add to a .env file
```
node -e "console.log(require('crypto').randomBytes(32).toString('hex'));"
```

Create and select the savoryscale database in a separate psql terminal
```
CREATE DATABASE savoryscale;
\c savoryscale;
```

Create database tables with knex migrations
```
npm run migrate
```

Seed the tables with dummy data
```
npm run seed
```

Run Express App in development mode
```
npm run dev
```

Or to Start Express App
```
npm start
```

