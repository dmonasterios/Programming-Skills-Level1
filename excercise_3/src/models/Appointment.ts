import DB from "../utils/DB.ts";
import { Appointment as AppointmentType, specialties, schedules } from "../types/types.ts";

type AppointmentResult = {
  doctor_full_name: string,
  specialty: specialties,
  schedule: schedules,
  date: Date
}

class Appointment extends DB {
  public static async create(values: AppointmentType) {
    const query = `INSERT INTO appointments(user_id, doctor_id, schedule, date) VALUES ( :user_id, :doctor_id, :schedule, :date )`;
    return await DB.pool().query(DB.bind(query, values));
  }

  public static async getCountByUser(
    user_id: number,

  ) {
    const query = `SELECT COUNT(*)
      FROM appointments
    WHERE user_id = :user_id`;
    const result = await DB.pool().query(
      DB.bind(query, { user_id, })
    );
    return result.rows[0] as {count: string};
  }

  public static async getCountBySpeciality(
    user_id: number,
    specialty: specialties
  ) {
    const query = `SELECT COUNT(*)
      FROM appointments as aps
      INNER JOIN doctors as doc ON doc.id = aps.doctor_id
    WHERE aps.user_id = :user_id AND doc.specialty LIKE :specialty`;
    const result = await DB.pool().query(
      DB.bind(query, { user_id, specialty })
    );
    return result.rows[0] as {count: string};
  }

  public static async getByUser(user_id: number) {
    const query = `SELECT
        CONCAT(doc.first_name,' ',doc.last_name) as doctor_full_name,
        doc.specialty,
        aps.schedule,
        aps.date
      FROM appointments as aps
      INNER JOIN doctors as doc ON doc.id = aps.doctor_id
    WHERE aps.user_id = :user_id`;
    const result = await DB.pool().query(DB.bind(query, { user_id }))
    return result.rows as AppointmentResult[];
  }
}

export default Appointment;
