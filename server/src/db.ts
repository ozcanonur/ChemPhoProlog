import { Pool } from 'pg';

// DATABASE_URL comes from heroku
const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export default db;
