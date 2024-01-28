import * as user from "../../repositories/User.ts";
import prompt from "../../utils/prompt.ts";
import { userParams } from "../../types/types.ts";
import purchaseFlights from "../purchaseFlights.ts";
import listFlights from "../listFlights.ts";

type menuOptions = "Purchase Flights" | "List Flights" | "Log Out";

const menu = {
  "Purchase Flights": purchaseFlights,
  "List Flights": listFlights,
}


const printMenu = async (user: Required<userParams>) : Promise<void> => {
  let isUserLogIn: boolean = true;
  const full_name = `${user.first_name} ${user.last_name}`;
  do{
    console.clear();
    console.log("Turkish Airlines System");
    console.log(`Ẁelcome ${full_name} \n`);
    console.log("Menu: \n");
    let opt = await prompt.list<menuOptions>([
      "Purchase Flights",
      "List Flights",
      "Log Out",
    ]);

    opt === "Log Out" ? (isUserLogIn = false) : await menu[opt](user);
  }while (isUserLogIn);
}

export default printMenu;