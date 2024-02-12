<?php
namespace Blindma1den\Excercise4\Libs\Traits;
use Faker\Factory;
trait HotelTrait{
  private $roomsCountPerHotel = [
    "vip_suites" => 6,
    "single_rooms" => 3,
    "double_rooms" => 6,
    "group_rooms" => 6,
    "luxury_suites" => 3,
  ];

  private $roomsCost = [
    "vip_suites" => 450,
    "single_rooms" => 100,
    "double_rooms" => 200,
    "group_rooms" => 350,
    "luxury_suites" => 550,
  ];

  private function getCostPerNight($room){
    return $this->roomsCost[$room];
  }

  private function calculateCost($room, $duration){
    return $this->roomsCost[$room] * $duration;
  }

  private function generateRoomNumber(){
    $faker = Factory::create();
    return $faker->randomLetter()."-".$faker->numberBetween(1, 24);
  }

  private function getHotelsAvailable($hotels){
    $availableHotels = [];
    foreach($hotels as $hotel){
      if(!empty($this->getRoomsAvailable($hotel))){
        $availableHotels[] = [
          "name" => $hotel["name"],
          "id" => $hotel["id"],
        ];
      }
    }

    return $availableHotels;
  }

  private function getRoomsAvailable($hotel){
    $available_rooms = [];

    foreach((array)$hotel as $key => $val){
      if(array_key_exists($key,$this->roomsCountPerHotel)){

        if($hotel[$key] < $this->roomsCountPerHotel[$key]){
          $available_rooms[] = [
            "name" => str_replace("_"," ", $key),
            "id" => $key
          ];
        }
      }
    }
    return $available_rooms;
  }
}

?>
