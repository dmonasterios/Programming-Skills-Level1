import User from "./Migrations/User.js";
import Doctor from "./Migrations/Doctor.js"
import Appointment from "./Migrations/Appointment.js";
import pool from "./connection.js";

const migrations = [
  User,
  Doctor,
  Appointment
]

// Drop all Tables If Exists
for(const migration of migrations.slice().reverse()){
  await migration.down();
  console.log(`Table ${migration.name} dropped`);
}

// Create all Tables
for(const migration of migrations){
  await migration.up();
  console.log(`Table ${migration.name} created`);
  if(migration?.seed){
    await migration.seed();
  console.log(`Table ${migration.name} seeded`);
  }
}

pool.end();