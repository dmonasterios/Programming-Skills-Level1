<?php

namespace Blindma1den\Excercise2\Database\Models;

use Blindma1den\Excercise2\Libs\Connection;
use PDO;

class Recomendation extends Connection
{
  private static $baseQuery = "SELECT
      des.name as destination,
      act.name as activity,
      ss.name as season,
      ss.cost
    FROM
      activities_destinations AS ad
    INNER JOIN activities act ON act.id = ad.activity_id
    INNER JOIN destinations AS des ON des.id = ad.destination_id
  INNER JOIN seasons AS ss ON ss.id = des.season_id";

  public static function getRecomendacion($activity, $season)
  {
    $query = self::$baseQuery."
      WHERE
        act.name LIKE :activity
        AND ss.name LIKE :season
      ORDER BY
    ss.cost DESC";
    $stmt = Connection::PDO()->prepare($query);
    $stmt->bindParam(':activity', $activity);
    $stmt->bindParam(':season', $season);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public static function getRecomendationsByActivity($activity){
    $query = self::$baseQuery."
      WHERE
        AND act.name LIKE :activity
      ORDER BY
    ss.cost DESC";
    $stmt = Connection::PDO()->prepare($query);
    $stmt->bindParam(':activity', $activity);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }
}
