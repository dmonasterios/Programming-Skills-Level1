/*
Level 1: Excersice 5 from blindma1den discord server

5. Turkish Airlines has just launched an offer to travel among the following destinations: Turkey, Greece, Lebanon, Spain, and Portugal. Develop an algorithm with the following characteristics:
  *It must have a login and validate the data; after the third failed attempt, it should be locked.
  *The user must choose the origin country and the destination country, the flight date, and the condition: Economy or First Class.
  *The user must choose if they want to check an additional piece of luggage into the hold.
  *Hand luggage is free of charge.
  *The user must purchase both the outbound and return tickets.
  *The user can choose their preferred meal: Regular, Vegetarian, Kosher.
  *The program must collect the following data: Name, country of origin, passport, and destination country.
  *Upon completing the process, the system will display everything the user has previously chosen along with their information.
  *The system will provide the option to confirm the reservation or cancel it. If the user chooses YES, a confirmation message will appear. If not, it will return to the main menu.
*/

import  printAuthMenu  from "./services/Menu/authMenu.ts";
import  printMenu  from "./services/Menu/menu.ts";
import { userParams } from "./types/types.ts";

let user : Required<userParams>;

do{
  user = await printAuthMenu();
  if(user !== undefined) await printMenu(user);
}while(true);