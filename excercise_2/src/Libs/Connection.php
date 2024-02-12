<?php
namespace Blindma1den\Excercise2\Libs;
use PDO;
use Dotenv\Dotenv;

$dotenv = Dotenv::createImmutable(__DIR__."/../../");
$dotenv->load();
$dotenv->required(['DB_HOST', 'DB_NAME', 'DB_USER', 'DB_PASSWORD']);

// Patron de creacion Singleton
//Proposito: Solo exista una instancia u objeto de una clase
abstract class Connection{
  private static \PDO $pdo;

  protected static function PDO(){
    if(!isset(self::$pdo)){
      self::$pdo = new PDO(
        "pgsql:host=" . $_ENV['DB_HOST'] . ";dbname=" . $_ENV['DB_NAME'],
        $_ENV['DB_USER'], $_ENV['DB_PASSWORD']
      );
      self::$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }
    return self::$pdo;
  }

  protected static function getUpdateSQL($table, $arrParams){
    $params = [];
    foreach ($arrParams as $key => $column){
      $params[] = "$key = :$key";
    }

    $params = implode(", ", $params);

    return "UPDATE $table SET $params WHERE id = :id";
  }

  protected static function simplifyResponse($data, $key){
    $response = [];
    foreach($data as $element){
      array_push($response, $element[$key]);
    }
    return $response;
  }
}

