<?php
/*
Level 1: Excersice 2 from blindma1den discord server

2. A travel agency has a special offer for traveling in any season of 2024. Their destinations are:

Winter: Andorra and Switzerland. In Andorra, there are skiing activities, and in Switzerland, there's a tour of the Swiss Alps.
Summer: Spain and Portugal. In Spain, there are hiking and extreme sports activities. In Portugal, there are activities on the beaches.
Spring: France and Italy. In France, there are extreme sports activities, and in Italy, there's a cultural and historical tour.
Autumn: Belgium and Austria. In Belgium, there are hiking and extreme sports activities, and in Austria, there are cultural and historical activities.
Note: Traveling in winter costs $100, in autumn $200, in spring $300, and in summer $400.

Design a system that helps users choose their best destination according to their personal preferences and the season they want to travel in.
12. Important: With the information you have, you should ask the user the right questions and display on screen what their best destination would be.

Clue: You could consider the user's budget*/

namespace Blindma1den\Excercise2\Commands;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

use Blindma1den\Excercise2\Libs\Traits\ConsoleTrait;
use Blindma1den\Excercise2\Libs\IO;
use Blindma1den\Excercise2\Services\TravelRecomendation;
use Blindma1den\Excercise2\Services\UserPreferences;

class App extends Command{
  use ConsoleTrait;
  protected static $defaultName = 'app';
  protected static $defaultDescription = 'Start the Application';

  private function printRecomendations($recomendations){
    $this->clearConsole();
    if(!empty($recomendations['best'])){
      IO::io()->writeln("There are our offers for travelling for this year that suits perfect to your preferences: ");
      foreach($recomendations['best'] as $recomendation){
        TravelRecomendation::printData($recomendation);
      }
      IO::io()->ask("Press Enter to Continue");
      return;
    }

    if(!empty($recomendations['regular'])){
      IO::io()->writeln("There are our offers for travelling for this year that you might  be interested:");
      foreach($recomendations['regular'] as $recomendation){
        TravelRecomendation::printData($recomendation);
      }
      IO::io()->ask("Press Enter to Continue");
      return;
    }

    if(!empty($recomendations['by_user_budget'])){
      IO::io()->writeln("There are our offers for travelling for this year that you might  be interested based on your budget:");
      foreach($recomendations['by_user_budget'] as $recomendation){
        TravelRecomendation::printData($recomendation);
      }
      IO::io()->ask("Press Enter to Continue");
      return;
    }

    IO::io()->writeln("Oh. No. We don't have any offer that fill out your preferences. Sorry  ");
    IO::io()->ask("Press Enter to Continue");
  }

  protected function execute(InputInterface $input, OutputInterface $output){
    IO::setIO($input, $output, $this->getHelper('question'));

    $preferences = new UserPreferences();
    $userPreferences = $preferences->get();
    $travelRecomendation = new TravelRecomendation($userPreferences);
    $recomendations = $travelRecomendation->get($preferences);
    $this->printRecomendations($recomendations);

    return Command::SUCCESS;
  }
}
?>