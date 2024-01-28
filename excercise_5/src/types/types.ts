export type meals = "Regular" | "Vegetarian" | "Kosher";

export type flightType = "Economy" | "First Class";

export type countries = "Turkey" | "Greece" | "Lebanon" | "Spain" | "Portugal";

export type ticketParams = {
  id?: number,
  user_id?: number,
  passport_id: string,
  origin_country: countries,
  destiny_country: countries,
  flight_date: Date,
  type: flightType,
  meal: meals,
  additional_luggage: number,
  cost: number,
};

export type userParams = {
  id?: number,
  first_name: string,
  last_name: string,
  username: string,
  password: string,
  login_attempts?: number
}