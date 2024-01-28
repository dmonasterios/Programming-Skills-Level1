// https://sidorares.github.io/node-mysql2/docs/documentation/typescript-examples
// https://typeorm.io/
import {Connection, createConnection} from 'mysql2';
import dotenv from "dotenv";
dotenv.config();

const connection =  createConnection({
  host:process.env.DB_HOST || 'localhost',
  user:process.env.DB_USER || 'root',
  password:process.env.DB_PASSWORD || 'root',
  database:process.env.DB_DATABASE || 'excercise_5',
  port: Number(process.env.DB_PORT) || 3306,
}) as Connection;

export default connection;