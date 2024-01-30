<?php
namespace Blindma1den\Excercise4\Database\Models;
use Blindma1den\Excercise4\Libs\Connection;
use PDO;

class User{
  public static function get($username){
    $stmt = Connection::PDO()->prepare("SELECT * FROM users WHERE username LIKE :username");
    $stmt->bindParam(':username', $username);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_OBJ);
  }

  public static function login($username, $password){
    $query = "SELECT COUNT(*) FROM users WHERE username LIKE :username AND password LIKE :password";
    $stmt = Connection::PDO()->prepare($query);
    $stmt->bindParam(':username', $username);
    $stmt->bindParam(':password', $password);
    $stmt->execute();
    return $stmt->fetchColumn();;
  }

  public static function create($user){
    $query="INSERT INTO users(first_name, last_name, username, password)
    VALUES(:first_name, :last_name, :username, :password)";
    $stmt = Connection::PDO()->prepare($query);
    $stmt->bindParam(':first_name', $user->first_name);
    $stmt->bindParam(':last_name', $user->last_name);
    $stmt->bindParam(':username', $user->username);
    $stmt->bindParam(':password', $user->password);
    $stmt->execute();
  }

  public static function update($params, $id){
    $query = Connection::getUpdateSQL("users",$params);
    $stmt = Connection::PDO()->prepare($query);
    $stmt->bindParam(":id", $id);
    foreach ($params as $key => $value){
      $stmt->bindParam(":$key", $value);
    }
    $stmt->execute();
  }
}

?>