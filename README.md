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

To deploy database tables and import fake data in one go:

```bash
npm run prisma:migrate:dev
```

To import fake data from data folder:

```bash
node run populateDB
```

Note: To reset database:

```bash
npm run prisma:migrate:reset
```

3. Launch dev server using the following command:

```bash
npm run dev
```
