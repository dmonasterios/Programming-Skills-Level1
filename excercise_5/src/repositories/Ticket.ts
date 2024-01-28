import connection from "../libs/connectionDB.ts";
import { ticketParams } from "../types/types.ts"
import { RowDataPacket } from "mysql2"

export async function save(ticket : ticketParams){
  return new Promise((resolve, reject) => {
    const query = "INSERT INTO tickets SET ?";
    connection.query(query, ticket, (error, results) => {
      if (error) reject(error);
      else resolve(results);
    });
  });
}

export async function getTikets(user_id : number){
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM tickets WHERE user_id = ?";
    connection.query(query, user_id, (error, results: RowDataPacket[]) => {
      if (error) reject(error);
      else resolve(results);
    });
  });
}