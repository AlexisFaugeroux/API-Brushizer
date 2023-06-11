# Getting started

1. Run the following command to install dependencies :

```bash
npm install
```

2. Create a .env file based on the .env.example model and fill it up with your data

```text
PORT=3000
DATABASE_URL=postgresql://username:password@localhost/database_name
JWT_SECRET=supersecretphrase
CORS_DOMAINS=localhost
```

To import fake data from data folder, run the following command:

```bash
prisma generate
node run populateDB
```

Note: To deploy tables and import fake data in one go, execute the npm script deployDB:

```bash
npm run prisma:migrate:dev
```

Note: To reset database, execute the npm script resetDB:

```bash
npm run prisma:migrate:reset
```

3. Launch server using the following command:

```bash
npm run dev
```

4. Launch server using the following command:

```bash
npm start
```
