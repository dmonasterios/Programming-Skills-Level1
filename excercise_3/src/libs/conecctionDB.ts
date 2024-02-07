import  pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const USER = encodeURIComponent(process.env.DB_USER || "postgres");
const PASSWORD = encodeURIComponent(process.env.DB_PASSWORD || "postgres");
const HOST = process.env.DB_HOST || "localhost";
const PORT = process.env.DB_PORT || 5432;
const DATABASE = process.env.DB_NAME || "exercise_3";

const URI = `postgres://${USER}:${PASSWORD}@${HOST}:${PORT}/${DATABASE}`;

const pool = new  pg.Pool({ connectionString: URI });

pool.on("error", (err) => {
  throw new Error(err.message);
});

export default pool;
