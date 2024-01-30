<?php
namespace Blindma1den\Excercise4\Database\Models;
use Blindma1den\Excercise4\Libs\Connection;
use PDO;

class Hotel{
  public static function getByLocation($locationID){
    $query = "SELECT * FROM hotels WHERE location_id = :location_id";
    $stmt = Connection::PDO()->prepare($query);
    $stmt->bindParam(':location_id', $locationID);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public static function getByID($hotelID){
    $query = "SELECT * FROM hotels WHERE id = :id";
    $stmt = Connection::PDO()->prepare($query);
    $stmt->bindParam(':id', $hotelID);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC);
  }

  public static function update($params, $id){
    $query = Connection::getUpdateSQL("hotels",$params);
    $stmt = Connection::PDO()->prepare($query);
    $stmt->bindParam(":id", $id);
    foreach ($params as $key => $value){
      $stmt->bindParam(":$key", $value);
    }
    $stmt->execute();
  }
}



?>