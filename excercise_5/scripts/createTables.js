import { createConnection } from 'mysql2';
import {ticketsTableQuery, userTableQuery} from "./queries.js"
import dotenv from "dotenv";
dotenv.config();

const connection =  createConnection({
  host:process.env.DB_HOST || 'localhost',
  user:process.env.DB_USER || 'root',
  password:process.env.DB_PASSWORD || 'root',
  database:process.env.DB_DATABASE || 'excercise_5',
  port: Number(process.env.DB_PORT) || 3306,
});

const printError = (msg) => (err) => {
  err && console.log(msg, err);
};

connection.connect((err) => {
  connection.query(userTableQuery, printError("User Table error"));
  connection.query(ticketsTableQuery, printError("Tickets Table error"));

  err? console.log("Error connecting to database", err) : console.log("creation tables done");
  connection.end();
});