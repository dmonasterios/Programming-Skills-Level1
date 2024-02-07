import pool from "../connection.js";
import {faker} from "@faker-js/faker"

class Doctor{
  static name = "doctors";
  static async up(){
    const query = `CREATE TABLE doctors(
      id SERIAL PRIMARY KEY,
      first_name CHARACTER VARYING(25) NOT NULL,
      last_name CHARACTER VARYING(25) NOT NULL,
      specialty CHARACTER VARYING(25) NOT NULL,
      created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
    );`;
    await pool.query(query);
  }

  static async down(){
    const query = `DROP TABLE IF EXISTS doctors `;
    await pool.query(query);
  }

  static async seed(){
    const query ="INSERT INTO doctors(first_name, last_name, specialty) VALUES($1, $2, $3)";
    const specialties = ["General Medicine","Emergency Care","Clinical Analysis","Cardiology","Neurology","Nutrition","Physiotherapy","Traumatology","Internal Medicine"];

    for(const specialty of specialties){
      for(let i = 0; i < 3; i++){
        const values = [
          faker.person.firstName(),
          faker.person.lastName(),
          specialty
        ];

        await pool.query(query, values);
      }
    }

  }
}

export default Doctor;