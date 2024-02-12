<?php
namespace Blindma1den\Excercise2\Services;

use Blindma1den\Excercise2\Database\Models\Activity;
use Blindma1den\Excercise2\Database\Models\Season;
use Blindma1den\Excercise2\Libs\IO;
use Blindma1den\Excercise2\Libs\Traits\ConsoleTrait;

class UserPreferences{
  use ConsoleTrait;
  public function get(){
    $activities = Activity::getAll();
    $seasons = Season::getAll();
    $activitiesPreferences = [];
    $seasonsPreferences = [];
    $this->clearConsole();
    IO::io()->title("Get Preferences");
    IO::io()->writeln("Hello, with this system you will know which of our offers for travelling this 2024 suit to you.");
    IO::io()->writeln("Please respond the following questions:");
    $userBudget = $this->promptNumber("Budget: ");
    IO::io()->writeln("Rate the following activities from one to ten:");
    IO::io()->title("Activities: ");

    foreach($activities as $activity){
      $activitiesPreferences += [
        $activity['name'] => $this->promptNumberFromRange(1,10,$activity['name'].' :')
      ];
    }
    IO::io()->title("Seasons: ");
    foreach($seasons as $season){
      $seasonsPreferences += [
        $season['name'] => $this->promptNumberFromRange(1,10,$season['name'].' :')
      ];
    }

    return [
      "user_budget" => $userBudget,
      "activities" => $activitiesPreferences,
      "seasons" => $seasonsPreferences
    ];
  }
}

?>