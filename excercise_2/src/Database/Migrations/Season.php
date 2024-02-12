<?php
namespace Blindma1den\Excercise2\Database\Migrations;
use Blindma1den\Excercise2\Libs\Connection;

class Season extends Connection {

  public static function up(){
    $query="CREATE TABLE seasons(
      id SERIAL PRIMARY KEY,
      name CHARACTER VARYING(25) NOT NULL,
      cost FLOAT NOT NULL,
      created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
    );";

    $stmt = Connection::PDO()->prepare($query);
    $stmt->execute();
  }

  public static function down(){
    $query="DROP TABLE IF EXISTS seasons ";
    $stmt = Connection::PDO()->prepare($query);
    $stmt->execute();
  }

  public static function seed(){
    $seasons = ["Summer" => 400, "Spring" => 300, "Autumn" => 200, "Winter" => 100];
    $query="INSERT INTO seasons(name, cost) VALUES(:name, :cost)";
    $stmt = Connection::PDO()->prepare($query);

    foreach($seasons as $season => $cost){
      $stmt->bindParam(':name', $season);
      $stmt->bindParam(':cost', $cost);
      $stmt->execute();
    }
  }
}

?>