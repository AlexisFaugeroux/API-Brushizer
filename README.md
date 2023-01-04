# Bruhizer API

Brushizer is an ongoing project that aims to offer digital artists a web platform so they can display their work and eventually sell it.
This repository contains the Brushizer API code, written in Node.js and designed to be the back-end part of the website. It relies on PostgresSQL as the object-relational database system and Sqitch for database change management.

It also contains a "data" folder, filled with a sample of fake data and a script that automatically imports them into the database in order to start testing the API quickly.

## Project status (JAN 2023)

Currently in V0, the API is not online yet. Coming soon !

## Getting started

1. Run the following command to install dependencies :

``` bash
npm install
```

2. Create a .env file based on the .env.example model and fill it up with your data

```text
PORT=3000
DATABASE_URL=postgresql://username:password@localhost/database_name
JWT_SECRET=supersecretphrase
CORS_DOMAINS=localhost
```

3. Create a sqitch.conf file based on the .sqitch.conf.example model and fill it up with your data

```text
[core]
 engine = pg
 # plan_file = sqitch.plan
 top_dir = migrations
[engine "pg"]
 target = db:pg://username:password@localhost:5432/database_name
 # registry = sqitch
 # client = psql
```

4. Deploy the database

To deploy the database tables, run the following command:

``` bash
sqitch deploy
```

[Optional] To import fake data from data folder, run the following command:

```bash
node ./data/import-data.js
```

Note: To deploy tables and import fake data in one go, execute the npm script deployDB:

```bash
npm run deployDB
```

Note: To reset database, execute the npm script resetDB:

```bash
npm run resetDB
```

5. Launch server using the following command:

``` bash
npm start
```
