<?php
namespace Blindma1den\Excercise2\Database\Migrations;
use Blindma1den\Excercise2\Libs\Connection;
use PDO;

class Destination extends Connection {

  public static function up(){
    $query="CREATE TABLE destinations(
      id SERIAL PRIMARY KEY,
      name CHARACTER VARYING(25) NOT NULL,
      season_id INTEGER NOT NULL,
      CONSTRAINT fk_season_id FOREIGN KEY (season_id)  REFERENCES seasons(id),
      created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
    );";

    $stmt = Connection::PDO()->prepare($query);
    $stmt->execute();
  }

  public static function down(){
    $query="DROP TABLE IF EXISTS destinations ";
    $stmt = Connection::PDO()->prepare($query);
    $stmt->execute();
  }

  public static function seed(){
    $Array = [
      "Summer" => ["Spain", "Portugal"],
      "Spring" => ["France", "Italy"],
      "Autumn" => ["Belgium", "Austria"],
      "Winter" => ["Andorra", "Switzerland"]
    ];
    $query="INSERT INTO destinations(name, season_id) VALUES(:name, :season_id)";
    $stmt = Connection::PDO()->prepare($query);

    foreach($Array as $key => $destinationsArr){
      $stmt_2 = Connection::PDO()->prepare("SELECT id FROM seasons WHERE name LIKE :name");
      $stmt_2->bindParam(':name', $key);
      $stmt_2->execute();
      $season = $stmt_2->fetch(PDO::FETCH_OBJ);

      foreach($destinationsArr as  $destination){
        $stmt->bindParam(':name', $destination);
        $stmt->bindParam(':season_id', $season->id);
        $stmt->execute();
      }
    }

/*     foreach($seasons as $season => $cost){
      $stmt->bindParam(':name', $season);
      $stmt->bindParam(':cost', $cost);
      $stmt->execute();
    } */
  }
}

?>