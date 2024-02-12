<?php
namespace Blindma1den\Excercise2\Database\Migrations;
use Blindma1den\Excercise2\Libs\Connection;
use PDO;
class Activity_Destination extends Connection {

  public static function up(){
    $query="CREATE TABLE activities_destinations(
      id SERIAL PRIMARY KEY,
      activity_id INTEGER NOT NULL,
      CONSTRAINT fk_activity_id FOREIGN KEY (activity_id)  REFERENCES activities(id),
      destination_id INTEGER NOT NULL,
      CONSTRAINT fk_destination_id FOREIGN KEY (destination_id)  REFERENCES destinations(id),
      created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
    );";

    $stmt = Connection::PDO()->prepare($query);
    $stmt->execute();
  }

  public static function down(){
    $query="DROP TABLE IF EXISTS activities_destinations ";
    $stmt = Connection::PDO()->prepare($query);
    $stmt->execute();
  }

  public static function seed(){
    $destinations = [
      "Andorra" => ["skiing", "extreme sports"],
      "Switzerland" => ["tour of the Swiss Alps"],
      "Spain" => ["hiking"],
      "Portugal" => ["beaches"],
      "France" => ["extreme sports"],
      "Italy" => ["cultural tour", "historical tour"],
      "Belgium" => ["hiking", "extreme sports"],
      "Austria" => ["cultural tour", "historical tour"]
    ];

    $query="INSERT INTO activities_destinations(activity_id, destination_id) VALUES(:activity_id, :destination_id)";
    $stmt = Connection::PDO()->prepare($query);

    foreach($destinations as $country => $activitiesArr){
      $stmt_2 = Connection::PDO()->prepare("SELECT id FROM destinations WHERE name LIKE :name");
      $stmt_2->bindParam(':name', $country);
      $stmt_2->execute();
      $country = $stmt_2->fetch(PDO::FETCH_OBJ);

      foreach($activitiesArr as $activity){
        $stmt_3 = Connection::PDO()->prepare("SELECT id FROM activities WHERE name LIKE :name");
        $stmt_3->bindParam(':name', $activity);
        $stmt_3->execute();
        $activity = $stmt_3->fetch(PDO::FETCH_OBJ);

        $stmt->bindParam("destination_id", $country->id);
        $stmt->bindParam("activity_id", $activity->id);
        $stmt->execute();
      }

    }
/*
    $stmt = Connection::PDO()->prepare($query);

    foreach($activities as $activity){
      $stmt->bindParam(':name', $activity);
      $stmt->execute();
    } */
  }
}

?>