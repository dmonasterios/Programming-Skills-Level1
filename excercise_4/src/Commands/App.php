<?php
/*
Level 1: Excersice 4 from blindma1den discord server

4. The RH Hotels chain has hired you to design the booking algorithm for their mobile application:
Login; it should be locked after the third failed attempt.
The RH Hotels chain exists in 5 countries: Spain, France, Portugal, Italy, and Germany.
Each country has its own hotels located in: Madrid, Barcelona, Valencia, Munich, Berlin, Rome, Milan, Paris, Marseille, Madeira, Lisbon, and Porto.
All hotels have 24 rooms each: 6 VIP suites, 3 single rooms, 6 double rooms, 6 group rooms, and 3 luxury suites.
The user can make reservations at any time of the year and at any hour, and book as many rooms as desired.
Single rooms are priced at $100 per night, double rooms at $200 per night, group rooms at $350 per night, VIP suites at $450 per night, and luxury suites at $550 per night, applicable at any time of the year.
The algorithm functions as follows: Login, choose country, choose city, choose room type, select the number of nights, collect user data (name, surname, ID/passport),
print the total cost, and if the user agrees, print a confirmation message for the reservation. If not, return to the main menu.
*/

namespace Blindma1den\Excercise4\Commands;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Blindma1den\Excercise4\Services\Authentication;
use Blindma1den\Excercise4\Services\Reservations;
use Blindma1den\Excercise4\Libs\Traits\ConsoleTrait;
use Blindma1den\Excercise4\Libs\IO;

class App extends Command{
  use ConsoleTrait;
  protected static $defaultName = 'app';
  protected static $defaultDescription = 'Start the Application';

  public function authMenu(){

  }

  public function Menu($user){
    $actions = new Reservations();
    do{
      $option = $this->promptList("Menu",['Make a Reservation', 'List Reservations', 'Exit']);
      if($option !== "Exit"){
        if($option === "Make a Reservation") $actions->makeReservation($user);
        else $actions->listReservations($user);
      }
      $this->clearConsole();
    }while($option !== "Exit");
  }

  protected function execute(InputInterface $input, OutputInterface $output){
    IO::setIO($input, $output, $this->getHelper('question'));
    $user = null;
    $auth = new Authentication();

    do{
      $option = $this->promptList("RH Hotels System",['Login', 'Register', 'Exit']);
      if($option !== "Exit"){
        $user = $auth->$option();
        if($user !== null){
          $this->clearConsole();
          $this->menu($user);
        }
      }
      $this->clearConsole();
    }while($option !== "Exit");
    IO::io()->success("GoodBye");
    return Command::SUCCESS;
  }
}
?>