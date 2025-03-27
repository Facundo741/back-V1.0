import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;

const adminPool = new Pool({
  user: DB_USER,
  host: DB_HOST,
  password: DB_PASSWORD,
  port: Number(DB_PORT),
  database: "postgres",
});

const initDB = async () => {
  try {
    const client = await adminPool.connect();
    console.log("Connection established");

    const checkDB = await client.query(
      `SELECT 1 FROM pg_database WHERE datname = $1`, 
      [DB_NAME]
    );

    if (checkDB.rowCount === 0) {
      console.log(`⚠️ The database "${DB_NAME}" does not exist. Creating...`);
      await client.query(`CREATE DATABASE "${DB_NAME}"`); 
      console.log(`Database "${DB_NAME}" successfully created.`);
    }

    client.release();
  } catch (error) {
    console.error("Error initializing the database:", error);
  }
};

initDB();

const pool = new Pool({
  user: DB_USER,
  host: DB_HOST,
  password: DB_PASSWORD,
  port: Number(DB_PORT),
  database: DB_NAME,
});

export default pool;
