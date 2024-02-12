<?php
namespace Blindma1den\Excercise2\Database\Migrations;
use Blindma1den\Excercise2\Libs\Connection;

class Activity extends Connection {

  public static function up(){
    $query="CREATE TABLE activities(
      id SERIAL PRIMARY KEY,
      name CHARACTER VARYING(25) NOT NULL,
      created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
    );";

    $stmt = Connection::PDO()->prepare($query);
    $stmt->execute();
  }

  public static function down(){
    $query="DROP TABLE IF EXISTS activities ";
    $stmt = Connection::PDO()->prepare($query);
    $stmt->execute();
  }

  public static function seed(){
    $activities = [
      "skiing",
      "tour of the Swiss Alps",
      "cultural tour",
      "historical tour",
      "hiking",
      "extreme sports",
      "beaches",
    ];
    $query="INSERT INTO activities(name) VALUES(:name)";
    $stmt = Connection::PDO()->prepare($query);

    foreach($activities as $activity){
      $stmt->bindParam(':name', $activity);
      $stmt->execute();
    }
  }
}

?>