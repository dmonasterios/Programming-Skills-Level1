<?php
namespace Blindma1den\Excercise2\Services;

use Blindma1den\Excercise2\Database\Models\Activity;
use Blindma1den\Excercise2\Database\Models\Recomendation;
use Blindma1den\Excercise2\Database\Models\Season;
use Blindma1den\Excercise2\Libs\IO;
use Blindma1den\Excercise2\Libs\Traits\ConsoleTrait;

class TravelRecomendation{
  use ConsoleTrait;
  private $preferences;
  private $recomendations = [
    "best" => [],
    "regular" => [],
    "by_user_budget" => [],
  ];

  public function __construct($preferences){
    arsort($preferences["seasons"]);
    arsort($preferences["activities"]);
    $this->preferences = $preferences;
  }

  public function get(){
    foreach($this->preferences["seasons"] as $season => $value){
      $seasonData = Season::getSeasonData($season);
      if($seasonData->cost > $this->preferences['user_budget']) continue;
      if($value > 7){
        $this->setRecomendationsBySeason($season, 'best');
        continue;
      }
      if($value < 8 && $value > 4 ){
        $this->setRecomendationsBySeason($season, 'regular');
        continue;
      }
      $this->setRecomendationsByBudget($season);
    }

    return $this->recomendations;
  }

  private function setRecomendationsBySeason($season, $key){
    $activitiesBySeason = Activity::getBySeasons($season);
    foreach($this->preferences['activities'] as $activity => $value){
      if($value >= 6 && in_array($activity,$activitiesBySeason)){
        $recomendations = Recomendation::getRecomendacion($activity, $season);
        foreach($recomendations as $recomendation) {
          array_push($this->recomendations[$key],$recomendation);
        }
      }
    }
  }

  private function setRecomendationsByBudget($season){
    $activitiesBySeason = Activity::getBySeasons($season);
    foreach($activitiesBySeason  as $activity){
      $recomendations = Recomendation::getRecomendacion($activity, $season);
      foreach($recomendations as $recomendation) {
        array_push($this->recomendations['by_user_budget'],$recomendation);
      }
    }
  }

  public static function printData($recomendation){
    IO::io()->writeln("********************");
    IO::io()->writeln("Season: ".$recomendation['season']);
    IO::io()->writeln("Cost: ".$recomendation['cost']);
    IO::io()->writeln("Country: ".$recomendation['destination']);
    IO::io()->writeln("Activity: ".$recomendation['activity']);
    IO::io()->writeln("********************");
  }
}

?>