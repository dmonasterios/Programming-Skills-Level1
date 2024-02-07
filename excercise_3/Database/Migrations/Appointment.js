import pool from "../connection.js";

class Appointment{
  static async up(){
    const query = `CREATE TABLE appointments(
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL,
      doctor_id INTEGER NOT NULL,
      schedule CHARACTER VARYING(25) NOT NULL,
      date TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
      created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT fk_user_id FOREIGN KEY (user_id)  REFERENCES users(id),
      CONSTRAINT fk_doctor_id FOREIGN KEY (doctor_id)  REFERENCES doctors(id)
    );`;
    await pool.query(query);
  }

  static async down(){
    const query = `DROP TABLE IF EXISTS appointments `;
    await pool.query(query);
  }
}

export default Appointment;