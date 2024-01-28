import connection from "../libs/connectionDB.ts";
import { userParams } from "../types/types.ts"
import { RowDataPacket } from "mysql2"

export async function getUser(username : string){
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM users WHERE username LIKE ?";
    connection.query(query, username, (error, results: RowDataPacket[]) => {
      if (error) reject(error);
      else resolve(results[0]);
    });
  });
}

export async function create(user : userParams){
  return new Promise((resolve, reject) => {
    const query = "INSERT INTO users SET ?";
    connection.query(query, user, (error, results) => {
      if (error) reject(error);
      else resolve(results);
    });
  });
}

export async function update(id: number, params : Partial<userParams>){
  return new Promise((resolve, reject) => {
    const query = "UPDATE users SET ? WHERE id = ?";
    connection.query(query, [params, id], (error, results) => {
      if (error) reject(error);
      else resolve(results);
    });
  });
}

export async function verifyIfExist(username : string){
  return new Promise((resolve, reject) => {
    const query = "SELECT id FROM users WHERE username LIKE ?";
    connection.query(query, username, (error, results: RowDataPacket[]) => {
      if (error) reject(error);
      else resolve(results[0]?.id);
    });
  });
}

export async function login(username : string, password: string){
  return new Promise((resolve, reject) => {
    const query = "SELECT COUNT(*) FROM users WHERE username LIKE ? AND password LIKE ?";
    connection.query(query, [username, password], (error, results: RowDataPacket[]) => {
      if (error) reject(error);
      else resolve(results[0]["COUNT(*)"]);
    });
  });
}