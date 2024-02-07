import DB from "../utils/DB.ts";
import { Doctor as DoctorType, specialties } from "../types/types.ts";

class Doctor extends DB{
  public static async getBySpecialty( specialty : specialties ){
    const query = `SELECT id, CONCAT('Dr.',first_name,' ',last_name) as full_name
    FROM doctors WHERE specialty LIKE :specialty`;
    const result = await DB.pool().query(DB.bind(query, {specialty}));
    return result.rows as {full_name: string, id:number}[];
  }
}

export default Doctor;