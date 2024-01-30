<?php
namespace Blindma1den\Excercise4\Database\Models;
use Blindma1den\Excercise4\Libs\Connection;
use PDO;

class Reservation{
  public static function create($reservation){
    $query="INSERT INTO
      reservations(
        user_id,
        hotel_id,
        room_type,
        room_number,
        duration,
        start_date,
        cost_per_night,
        total_cost
      )
      VALUES(
        :user_id,
        :hotel_id,
        :room_type,
        :room_number,
        :duration,
        :start_date,
        :cost_per_night,
        :total_cost
    )";
    $stmt = Connection::PDO()->prepare($query);
    $stmt->bindParam(':user_id', $reservation->id_user);
    $stmt->bindParam(':hotel_id', $reservation->id_hotel);
    $stmt->bindParam(':room_type', $reservation->room_type);
    $stmt->bindParam(':room_number', $reservation->room_number);
    $stmt->bindParam(':duration', $reservation->duration);
    $stmt->bindParam(':start_date', $reservation->start_date);
    $stmt->bindParam(':cost_per_night', $reservation->cost_per_night);
    $stmt->bindParam(':total_cost', $reservation->total_cost);

    $stmt->execute();
  }

  public static function getByUserID($userID){
    $query="SELECT
        r.id,
        c.name as country,
        l.name as location,
        h.name as hotel_name,
        h.direction as hotel_direction,
        r.room_type,
        r.room_number,
        r.duration,
        r.start_date,
        r.cost_per_night,
        r.total_cost
      FROM reservations as r
      INNER JOIN hotels as h ON r.hotel_id = h.id
      INNER JOIN locations as l ON h.location_id = l.id
      INNER JOIN countries as c ON l.country_id = c.id
    WHERE user_id = :user_id";

    $stmt = Connection::PDO()->prepare($query);
    $stmt->bindParam(':user_id', $userID);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }
}



?>