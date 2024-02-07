import prompt from "../../utils/prompt.ts";
import sleep from "../../utils/sleep.ts";
import printfn from "../../utils/printfn.ts";
import { User, specialties, schedules } from "../../types/types.ts";
import Appointment from "../../models/Appointment.ts";
import Doctor from "../../models/Doctor.ts";

const getAppointment = async (user: Required<User>) => {
  let availableSlots = [];
  let doctors : string[] = [];

  console.clear();
  printfn.title("Get Appointment");

  const totalCount = await Appointment.getCountByUser(user.id);
  if (Number(totalCount.count) === 3) {
    printfn.error("You can only book 3 appointment");
    await sleep(1);
    return;
  }

  console.log(
    "Thanks for chosing us. To make an appointment please respond the following questions:\n"
  );

  console.log("Specialty:");
  const specialty = await prompt.list<specialties>([
    "General Medicine",
    "Emergency Care",
    "Clinical Analysis",
    "Cardiology",
    "Neurology",
    "Nutrition",
    "Physiotherapy",
    "Traumatology",
    "Internal Medicine",
  ]);

  const CountPerSpeciality = await Appointment.getCountBySpeciality(user.id, specialty);
  if (Number(CountPerSpeciality.count) !== 0) {
    printfn.error("You can only book one appointment per specialty");
    await sleep(1);
    return;
  }

  const doctorsArr = await (Doctor.getBySpecialty(specialty));

  doctorsArr.forEach(doctor => {
    doctors.push(doctor.full_name);
  });
  console.log("Doctor:");
  const doctor = await prompt.list(doctors);
  const doctorData = doctorsArr.find((doctorEl) => doctorEl.full_name === doctor) as {full_name: string, id:number}

  console.log("schedule:");
  const schedule = await prompt.list<schedules>(['afternoon','morning']);
  if(schedule === 'afternoon'){
    availableSlots = ['13:00','13:30','14:00','14:30','15:00','15:30'];
  }
  else {
    availableSlots = ['09:00','09:30','10:00','10:30','11:00','11:30'];
  }
  console.log("Time Slot:");
  const time_slot = await prompt.list(availableSlots);

  const date = await prompt.date();
  date.setHours(Number(time_slot.slice(0,2)),Number(time_slot.slice(3,5)) );
  await Appointment.create({
    user_id: user.id,
    doctor_id: doctorData.id,
    schedule,
    date
  });

  printfn.success("Appointment Successful");
  await sleep(1);
};

export default getAppointment;