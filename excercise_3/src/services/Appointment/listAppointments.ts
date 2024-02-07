import prompt from "../../utils/prompt.ts";
import sleep from "../../utils/sleep.ts";
import printfn from "../../utils/printfn.ts";
import { User, specialties, schedules } from "../../types/types.ts";
import Appointment from "../../models/Appointment.ts";
import pc from "../../utils/pickColor.ts";

const listAppointment = async (user: Required<User>) => {
  console.clear();
  printfn.title("Get Appointment");

  const appointments = await Appointment.getByUser(user.id);

  if(appointments.length === 0) printfn.error("You don't have any appointment");
  else {
    appointments.forEach((appointment) => {
      console.log(
        pc.green("******************************")
      );
        console.log(pc.blue("Doctor: ")+appointment.doctor_full_name);
        console.log(pc.blue("Specialty:")+appointment.specialty);
        console.log(pc.blue("Schedule: ")+appointment.schedule);
        console.log(pc.blue("Date: ")+appointment.date);
      console.log(
        pc.green("******************************")
      );
    });
  }

  await prompt.pause();
}

export default listAppointment;