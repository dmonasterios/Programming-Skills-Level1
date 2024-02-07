export type specialties = "General Medicine" | "Emergency Care" | "Clinical Analysis" | "Cardiology" | "Neurology" | "Nutrition" | "Physiotherapy" | "Traumatology" | "Internal Medicine";

export type schedules = "morning" | "afternoon";

export type Appointment = {
  id? : number,
  user_id: number,
  doctor_id: number,
  schedule: schedules,
  date: Date,
}

export type User = {
  id? : number,
  first_name: string,
  last_name: string,
  username: string,
  password: string,
  login_attempts?: number,
}

export type Doctor = {
  id : number,
  first_name: string,
  last_name: string,
  specialty: specialties
}
