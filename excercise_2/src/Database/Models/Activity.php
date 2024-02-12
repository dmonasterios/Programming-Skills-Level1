<?php

namespace Blindma1den\Excercise2\Database\Models;

use Blindma1den\Excercise2\Libs\Connection;
use PDO;

class Activity extends Connection
{
  public static function getAll()
  {
    $query = "SELECT id, name FROM activities";
    $stmt = Connection::PDO()->prepare($query);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public static function getBySeasons($season)
  {
    $query = "SELECT
        act.name
      FROM activities as act
      INNER JOIN activities_destinations as ad ON act.id = ad.activity_id
      INNER JOIN destinations AS des ON des.id = ad.destination_id
      INNER JOIN seasons AS ss ON ss.id = des.season_id
      WHERE ss.name LIKE :season
      GROUP BY ss.name, act.name
    ORDER BY act.name, ss.name";

    $stmt = Connection::PDO()->prepare($query);
    $stmt->bindParam(':season', $season);
    $stmt->execute();
    return Connection::simplifyResponse($stmt->fetchAll(PDO::FETCH_ASSOC), 'name');
  }
}
