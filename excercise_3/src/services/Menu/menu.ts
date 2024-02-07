import prompt from "../../utils/prompt.ts";
import printfn from "../../utils/printfn.ts";
import { login, register, logOut  } from "../../services/authentication.ts";
import { User } from "../../types/types.ts";
import getAppointment from "../Appointment/getAppointment.ts";
import listAppointment from "../Appointment/listAppointments.ts";

type options = 'Get Appointment' | 'List Appointment' | 'Log Out';

const menu = {
  'Get Appointment':getAppointment,
  'List Appointment':listAppointment,
}

const printMenu = async ( user :Required<User>) : Promise<void> => {
  let isUserLogIn = true;

  do{
    console.clear();
    printfn.title("Menu \n");
    let opt: options = await prompt.list<options>(['Get Appointment', 'List Appointment', 'Log Out']);
    opt === "Log Out" ? (isUserLogIn = false) : await menu[opt](user);
  }while(isUserLogIn);

}

export default printMenu;