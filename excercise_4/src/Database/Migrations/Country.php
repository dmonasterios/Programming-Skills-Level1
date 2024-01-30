<?php
namespace Blindma1den\Excercise4\Database\Migrations;
use Blindma1den\Excercise4\Libs\Connection;

class Country{
  public static function up(){
    $query="CREATE TABLE countries(
      id SERIAL PRIMARY KEY,
      name CHARACTER VARYING(25) NOT NULL
    );";

    $stmt = Connection::PDO()->prepare($query);
    $stmt->execute();
  }

  public static function down(){
    $query="DROP TABLE IF EXISTS countries";
    $stmt = Connection::PDO()->prepare($query);
    $stmt->execute();
  }

  public static function seed(){
    $countries = ["Spain", "France", "Portugal", "Italy", "Germany"];
    $query="INSERT INTO countries(name) VALUES(:name)";
    $stmt = Connection::PDO()->prepare($query);

    foreach($countries as $country){
      $stmt->bindParam(':name', $country);
      $stmt->execute();
    }
  }
}


?>