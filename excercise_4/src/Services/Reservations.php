<?php
namespace Blindma1den\Excercise4\Services;

use Blindma1den\Excercise4\Libs\IO;
use Blindma1den\Excercise4\Libs\Traits\ConsoleTrait;
use Blindma1den\Excercise4\Libs\Traits\HotelTrait;
use Blindma1den\Excercise4\Database\Models\Country;
use Blindma1den\Excercise4\Database\Models\Location;
use Blindma1den\Excercise4\Database\Models\Hotel;
use Blindma1den\Excercise4\Database\Models\Reservation;
use LDAP\Result;

class Reservations{
  use ConsoleTrait;
  use HotelTrait;

  public function makeReservation($user){

    $this->clearConsole();
    IO::io()->title("Make a Reservation");
    IO::io()->writeln("Thanks for choosing us. Please respond the following questions:");

    $country = $this->promptListGetID("Select Country: ",Country::getAll(),"name");
    $location = $this->promptListGetID("Select Location: ",Location::getByCountry($country["id"]),"name");
    $hotels = Hotel::getByLocation($location["id"]);
    $hotel = $this->promptListGetID("Select Hotel: ",$this->getHotelsAvailable($hotels),"name");
    $hotel = Hotel::getByID($hotel["id"]);

    $available_rooms = $this->getRoomsAvailable($hotel);

    $room = $this->promptListGetID("Select Room: ",$available_rooms,"name");
    $date = $this->promptDate("Start Date ");
    $duration = $this->promptNumber("Number of Night: ");
    $room_number = $this->generateRoomNumber();
    $cost_per_night = $this->getCostPerNight($room["id"]);
    $total_cost = $this->calculateCost($room["id"], $duration);

    $this->clearConsole();
    IO::io()->title("Reservation");
    IO::io()->writeln("Country: ".$country["name"]);
    IO::io()->writeln("Location: ".$location["name"]);
    IO::io()->writeln("Hotel: ".$hotel["name"]);
    IO::io()->writeln("Direction: ".$hotel["direction"]);
    IO::io()->writeln("Room: ".$room["name"]);
    IO::io()->writeln("Room Number: ".$room_number);
    IO::io()->writeln("Date: ".$date);
    IO::io()->writeln("Nights: ".$duration);
    IO::io()->writeln("Cost per night: ".$cost_per_night);
    IO::io()->writeln("************************************");
    IO::io()->writeln("Total Cost: ".$total_cost);

    if(IO::io()->confirm("Do you want to buy this reservation?")){
      $reservation =  (object)[
        "id_user" => $user->id,
        "id_hotel" => $hotel['id'],
        "room_type" => $room["name"],
        "room_number" => $room_number,
        "duration" => $duration,
        "start_date"=> $date,
        "cost_per_night" => $cost_per_night,
        "total_cost" => $total_cost,
      ];

      Reservation::create($reservation);
      Hotel::update([
        $room["id"] => $hotel[$room["id"]] + 1
      ],$hotel['id']);
    } else {
      IO::io()->writeln("Canceled purchase.");
      sleep(2);
    }
  }

  public function listReservations($user){
    $reservations = Reservation::getByUserID($user->id);
    IO::io()->title("List Reservation");
    if(empty($reservations)) IO::io()->error("You dont have any reservation.");
    else{
      foreach($reservations as $reservation){
        IO::io()->writeln("************************************");
        IO::io()->writeln("Country: ".$reservation["country"]);
        IO::io()->writeln("Location: ".$reservation["location"]);
        IO::io()->writeln("Hotel: ".$reservation["hotel_name"]);
        IO::io()->writeln("Direction: ".$reservation["hotel_direction"]);
        IO::io()->writeln("Room: ".$reservation["room_type"]);
        IO::io()->writeln("Room Number: ".$reservation["room_number"]);
        IO::io()->writeln("Date: ".$reservation["start_date"]);
        IO::io()->writeln("Nights: ".$reservation["duration"]);
        IO::io()->writeln("Cost per night: ".$reservation["cost_per_night"]);
        IO::io()->writeln("Total Cost: ".$reservation["total_cost"]);
        IO::io()->writeln("************************************");
      }
    }
    IO::io()->ask("Press ENTER to continue:");
  }
}

?>