<?php
namespace Blindma1den\Excercise4\Database\Migrations;
use Blindma1den\Excercise4\Libs\Connection;

class User {

  public static function up(){
    $query="CREATE TABLE users(
      id SERIAL PRIMARY KEY,
      first_name CHARACTER VARYING(25) NOT NULL,
      last_name CHARACTER VARYING(25) NOT NULL,
      username CHARACTER VARYING(25) NOT NULL UNIQUE,
      password CHARACTER VARYING(25) NOT NULL,
      created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
      login_attempts INTEGER NOT NULL DEFAULT 0
    );";

    $stmt = Connection::PDO()->prepare($query);
    $stmt->execute();
  }

  public static function down(){
    $query="DROP TABLE IF EXISTS users ";
    $stmt = Connection::PDO()->prepare($query);
    $stmt->execute();
  }
}

?>