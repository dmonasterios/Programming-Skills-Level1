import * as ticketsRepository from "../repositories/Ticket.ts";
import prompt from "../utils/prompt.ts";
import { userParams, ticketParams } from "../types/types.ts";

async function listFlights(user: Required<userParams>): Promise<void> {
  const tickets = (await ticketsRepository.getTikets(
    user.id
  )) as ticketParams[];
  const full_name = `${user.first_name} ${user.last_name}`;

  if (tickets.length === 0) console.log("There aren't any ticket bought yet");
  else
    tickets.map((ticket) => {
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
    });

    await prompt.pause();
}

export default listFlights;
