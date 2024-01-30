<?php
namespace Blindma1den\Excercise4\Database\Migrations;
use Blindma1den\Excercise4\Libs\Connection;

class Reservation {

  public static function up(){
    $query="CREATE TABLE reservations(
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL,
      hotel_id INTEGER NOT NULL,
      room_type CHARACTER VARYING(25) NOT NULL,
      room_number CHARACTER VARYING(5) NOT NULL,
      duration INTEGER NOT NULL,
      start_date TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
      cost_per_night FLOAT NOT NULL,
      total_cost FLOAT NOT NULL,
      created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP

    );";

    $stmt = Connection::PDO()->prepare($query);
    $stmt->execute();
  }

  public static function down(){
    $query="DROP TABLE IF EXISTS reservations ";
    $stmt = Connection::PDO()->prepare($query);
    $stmt->execute();
  }
}

?>