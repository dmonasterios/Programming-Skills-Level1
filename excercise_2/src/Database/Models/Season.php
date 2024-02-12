<?php
namespace Blindma1den\Excercise2\Database\Models;
use Blindma1den\Excercise2\Libs\Connection;
use PDO;

class Season extends Connection {
  public static function getAll(){
    $query = "SELECT id, name FROM seasons";
    $stmt = Connection::PDO()->prepare($query);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public static function getSeasonData($season){
    $query = "SELECT * FROM seasons WHERE name LIKE :name";
    $stmt = Connection::PDO()->prepare($query);
    $stmt->bindParam(':name', $season);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_OBJ);
  }
}



?>