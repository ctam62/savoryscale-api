# SavoryScale API

This is the backend API of [SavoryScale](https://github.com/ctam62/savoryscale).

## Backend Tech Stack
- ExpressJS 
- Knex
- MySQL2

## Setup
Install nodeJS dependencies
```
npm i
```

Create and select the database in a separate mysql terminal
```
CREATE DATABASE savoryscale;
USE savoryscale;
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

