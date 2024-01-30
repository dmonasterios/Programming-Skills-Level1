<?php
namespace Blindma1den\Excercise4\Database\Models;
use Blindma1den\Excercise4\Libs\Connection;
use PDO;

class Country{
  public static function getAll(){
    $query = "SELECT id, name FROM countries";
    $stmt = Connection::PDO()->prepare($query);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }
}



?>