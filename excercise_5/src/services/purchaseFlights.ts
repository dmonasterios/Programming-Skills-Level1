import * as ticketsRepository from "../repositories/Ticket.ts";
import prompt from "../utils/prompt.ts";
import {
  getCountries,
  getTicketsDate,
  registerAdditionalLuggage,
  getMeal,
  calculateCost,
  getFlightType,
} from "./getTicketsData.ts";
import { meals, flightType, ticketParams, userParams } from "../types/types.ts";

type ticketsInfo<T> = {
  outbound: T;
  return: T;
};

function printTickets(ticket : ticketParams, full_name: string) : void {
  console.log("******************************");
  console.log(`Full Name: ${full_name}`);
  console.log(`Passport ID: ${ticket.passport_id}`);
  console.log(`Origin Country: ${ticket.origin_country}`);
  console.log(`Destiny Country: ${ticket.destiny_country}`);
  console.log(`Date: ${ticket.flight_date}`);
  console.log(`Flight Category: ${ticket.type}`);
  console.log(`Meal: ${ticket.meal}`);
  console.log(`Additional Luggage: ${ticket.additional_luggage} Pieces`);
  console.log(`Cost: ${ticket.cost} $`);
  console.log("******************************");
}

async function purchaseFlights(user: Required<userParams>): Promise<void> {
  let luggageAmount = 0;
  const meals = {} as ticketsInfo<meals>;
  const flightCategory = {} as ticketsInfo<flightType>;
  const ticketsCost = {} as ticketsInfo<number>;
  const full_name = `${user.first_name} ${user.last_name}`

  console.clear();
  console.log("Turkish Airlines System");
  console.log("Purchase Flights \n");
  console.log(
    "Thanks for flying with us. Remember that both the outbound and return tickets must be purchased."
  );
  console.log("Please respond the following questions:\n");

  const { passportID } = (await prompt.ask([
    {
      name: "passportID",
      message: "passport ID: ",
      default: "PS-1234567890",
    },
  ])) as { passportID: string };

  const countries = await getCountries();
  const dates = await getTicketsDate();

  const areAdditionalLuggage = await prompt.confirm(
    "Do you want to check an additional piece of luggage into the hold?"
  );

  if (areAdditionalLuggage) {
    luggageAmount = await registerAdditionalLuggage();
  }

  console.clear();
  console.log("Outbound Ticket:");
  meals.outbound = await getMeal();
  flightCategory.outbound = await getFlightType();
  ticketsCost.outbound = calculateCost(luggageAmount, meals.outbound, flightCategory.outbound);

  console.clear();
  console.log("Return Ticket:");
  meals.return = await getMeal();
  flightCategory.return = await getFlightType();
  ticketsCost.return = calculateCost(luggageAmount, meals.return, flightCategory.return);

  console.clear();
  console.log("Outbound Ticket:");
  const outboundTicket: ticketParams = {
    user_id: user.id,
    passport_id: passportID,
    origin_country: countries.origin,
    destiny_country: countries.destiny,
    flight_date: dates.outbound,
    type: flightCategory.outbound,
    meal: meals.outbound,
    additional_luggage: luggageAmount,
    cost: ticketsCost.outbound
  }
  printTickets(outboundTicket, full_name);

  console.log("Return Ticket:");
  const returnTicket: ticketParams = {
    user_id: user.id,
    passport_id: passportID,
    origin_country: countries.destiny,
    destiny_country: countries.origin,
    flight_date: dates.return,
    type: flightCategory.return,
    meal: meals.return,
    additional_luggage: luggageAmount,
    cost: ticketsCost.return
  }
  printTickets(returnTicket, full_name);

  const areTicketsBought = await prompt.confirm("Do you want to buy these tickets?");

  if(areTicketsBought){
    await ticketsRepository.save(outboundTicket);
    await ticketsRepository.save(returnTicket);
  }
  else{
    console.clear();
    console.log("Canceled purchase.");
    await prompt.pause();
  }
}

export default purchaseFlights;
