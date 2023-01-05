import pg from 'pg';

// Connection to database in Pool mode
const { Pool } = pg;

const options = {
    connectionString: process.env.DATABASE_URL,
};

const client = new Pool(options);

export default client;
