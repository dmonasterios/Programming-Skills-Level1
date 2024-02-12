<?php

namespace Blindma1den\Excercise2\Utils;

class Season
{
  private static $destinationsPerSeason = [
    "Winter" => ["Andorra","Switzerland"],
    "Summer" => ["Spain","Portugal"],
    "Spring" => ["France", "Italy"],
    "Autumn" => ["Belgium", "Austria"]
  ];
  private static $costPerSeason = [
    "Winter" => 100,
    "Summer" => 400,
    "Spring" => 300,
    "Autumn" => 200
  ];

  public static function getDestinationsperSeason($season)
  {
    return self::$destinationsPerSeason[$season];
  }

  public static function getCostperSeason($season)
  {
    return self::$costPerSeason[$season];
  }
}
