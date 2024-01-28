import prompt from "../utils/prompt.ts";
import { countries as countryList, flightType, meals } from "../types/types.ts";

type dates = {
  outbound: Date;
  return: Date;
};

type countries = {
  origin: countryList;
  destiny: countryList;
};

function getCountriesData(originCountry?: countryList): countryList[] {
  const options: countryList[] = [
    "Turkey",
    "Greece",
    "Lebanon",
    "Spain",
    "Portugal",
  ];
  if (originCountry === undefined) return options;
  return options.filter((option) => option !== originCountry);
}

export async function getCountries() : Promise<countries>{
  const countries = {} as countries
  console.log("Origin Country:");
    countries.origin = await prompt.list<countryList>(getCountriesData());
    console.log("Destity Country:");
    countries.destiny = await prompt.list<countryList>(
      getCountriesData(countries.origin)
    );

  return countries;
}

export async function getTicketsDate(): Promise<dates> {
  let dates = {} as dates;

  do {
    console.log("Outbound Date:");
    dates.outbound = await prompt.date();
    console.log("Return Date:");
    dates.return = await prompt.date();
    if (dates.outbound.getTime() > dates.return.getTime())
      console.log("The outbound date can't be less than the return date.");
  } while (dates.outbound.getTime() > dates.return.getTime());

  return dates;
}

export async function registerAdditionalLuggage(): Promise<number> {
  let luggageAmount = NaN;
  do {
    const { result } = (await prompt.ask([
      {
        name: "result",
        message: "Please introduce the amount of additional piece of luggage to hold: ",
        default: "0",
      },
    ])) as { result: string };

    if (Number.isNaN(result))
      console.log("Invalid value. Please introduce a number.");
    else if (Number(result) <= 0)
      console.log(
        "Invalid value. Please introduce a number greater or equal to zero."
      );
    else luggageAmount = Number(result);
  } while (Number.isNaN(luggageAmount));
  return Math.trunc(luggageAmount);
}

export async function getMeal(): Promise<meals>{
  console.log("Preferred Meal:");
  return await prompt.list<meals>(["Regular", "Kosher", "Vegetarian"]);
}

export async function  getFlightType() : Promise<flightType> {
  console.log("Flights Type:");
  return await prompt.list<flightType>(["Economy","First Class"]);
}

export function calculateCost(luggageAmount: number, meal: meals, category : flightType) : number{
  const mealCost = {
    "Regular": 5.3,
    "Kosher": 7.6,
    "Vegetarian": 6.3
  }

  const categoryCost = {
    "Economy":40,
    "First Class":140
  }
  const baseCost = Math.floor(Math.random() * (150 - 90) + 90);



  return baseCost + (luggageAmount * 2.5) + mealCost[meal] + categoryCost[category];
}