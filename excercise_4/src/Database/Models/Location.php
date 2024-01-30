<?php
namespace Blindma1den\Excercise4\Database\Models;
use Blindma1den\Excercise4\Libs\Connection;
use PDO;

class Location{
  public static function getByCountry($countryID){
    $query = "SELECT id, name FROM locations WHERE country_id = :country_id";
    $stmt = Connection::PDO()->prepare($query);
    $stmt->bindParam(':country_id', $countryID);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }
}



?>