<?php
namespace Blindma1den\Excercise4\Database\Migrations;
use Blindma1den\Excercise4\Libs\Connection;
use PDO;

class Location{
  public static function up(){
    $query="CREATE TABLE locations(
      id SERIAL PRIMARY KEY,
      name CHARACTER VARYING(25) NOT NULL,
      country_id INTEGER NOT NULL,
      CONSTRAINT fk_country_id FOREIGN KEY (country_id)  REFERENCES countries(id)
    );";

    $stmt = Connection::PDO()->prepare($query);
    $stmt->execute();
  }

  public static function down(){
    $query="DROP TABLE IF EXISTS locations";
    $stmt = Connection::PDO()->prepare($query);
    $stmt->execute();
  }

  public static function seed(){
    $Array = [
      "Spain" => ["Madrid","Barcelona","Valencia"],
      "France" => ["Paris","Marseille"],
      "Portugal"=> ["Madeira","Lisbon","Porto"],
      "Italy"=> ["Rome","Milan"],
      "Germany"=> ["Munich","Berlin"]
    ];
    $query="INSERT INTO locations(name, country_id) VALUES(:name, :country_id)";
    $stmt = Connection::PDO()->prepare($query);

    foreach($Array as $key => $countryArr){
      $stmt_2 = Connection::PDO()->prepare("SELECT * FROM countries WHERE name LIKE :name");
      $stmt_2->bindParam(':name', $key);
      $stmt_2->execute();
      $country = $stmt_2->fetch(PDO::FETCH_OBJ);

      foreach($countryArr as  $location){
        $stmt->bindParam(':name', $location);
        $stmt->bindParam(':country_id', $country->id);
        $stmt->execute();
      }
    }
  }
}