<?php

namespace Blindma1den\Excercise2\Utils;

class Destination
{
  private static $activityPerDestination = [
    "Andorra" => ["Skiing"],
    "Switzerland" => ["Tour of the Swiss Alps"],
    "Spain" => ["hiking", "extreme sports"],
    "Portugal" => ["beaches"],
    "France" => ["sports activities"],
    "Italy" => ["cultural and historical tour"],
    "Belgium" => [],
    "Austria" => [],
  ];
  private static $costPerSeason = [
    "Winter" => 100,
    "Summer" => 400,
    "Spring" => 300,
    "Autumn" => 200
  ];

  public static function getDestinationsperSeason($season)
  {
    return self::$activityPerDestination[$season];
  }

  public static function getCostperSeason($season)
  {
    return self::$costPerSeason[$season];
  }
}
