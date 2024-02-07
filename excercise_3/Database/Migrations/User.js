import pool from "../connection.js";

class User{
  static name = "users";
  static async up(){
    const query = `CREATE TABLE users(
      id SERIAL PRIMARY KEY,
      first_name CHARACTER VARYING(25) NOT NULL,
      last_name CHARACTER VARYING(25) NOT NULL,
      username CHARACTER VARYING(25) NOT NULL UNIQUE,
      password CHARACTER VARYING(25) NOT NULL,
      created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
      login_attempts INTEGER NOT NULL DEFAULT 0
    );`;
    await pool.query(query);
  }

  static async down(){
    const query = `DROP TABLE IF EXISTS users `;
    await pool.query(query);
  }
}

export default User;