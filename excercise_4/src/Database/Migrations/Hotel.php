<?php
namespace Blindma1den\Excercise4\Database\Migrations;
use Blindma1den\Excercise4\Libs\Connection;
use Faker\Factory;
use PDO;

class Hotel{
  public static function up(){
    $query="CREATE TABLE hotels(
      id SERIAL PRIMARY KEY,
      name CHARACTER VARYING(100) NOT NULL,
      direction CHARACTER VARYING(100) NOT NULL,
      location_id INTEGER NOT NULL,
      vip_suites INTEGER NOT NULL DEFAULT 0,
      single_rooms INTEGER NOT NULL DEFAULT 0,
      double_rooms INTEGER NOT NULL DEFAULT 0,
      group_rooms INTEGER NOT NULL DEFAULT 0,
      luxury_suites INTEGER NOT NULL DEFAULT 0,
      CONSTRAINT fk_location_id FOREIGN KEY (location_id)  REFERENCES locations(id)
    );";

    $stmt = Connection::PDO()->prepare($query);
    $stmt->execute();
  }

  public static function down(){
    $query="DROP TABLE IF EXISTS hotels";
    $stmt = Connection::PDO()->prepare($query);
    $stmt->execute();
  }

  public static function seed(){
    $faker = Factory::create();
    $Array = ["Madrid","Barcelona","Valencia","Paris","Marseille","Madeira","Lisbon","Porto","Rome","Milan","Munich","Berlin"];

    $query="INSERT INTO hotels(name, direction ,location_id) VALUES(:name, :direction, :location_id)";
    $stmt = Connection::PDO()->prepare($query);

    $stmt_2 = Connection::PDO()->prepare("SELECT * FROM locations");
    $stmt_2->execute();

    while($location = $stmt_2->fetch(PDO::FETCH_OBJ)){
      $hotelsCount = $faker->numberBetween(1, 5);
      for ($i=0; $i < $hotelsCount; $i++) {
        $name = $faker->company();
        $direction = $faker->address();
        $stmt->bindParam("name",$name);
        $stmt->bindParam("direction",$direction);
        $stmt->bindParam("location_id",$location->id);
        $stmt->execute();
      }
    }
  }
}