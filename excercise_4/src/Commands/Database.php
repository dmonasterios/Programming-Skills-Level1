<?php
namespace Blindma1den\Excercise4\Commands;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

class Database extends Command{
  protected static $defaultName = 'migration';
  protected static $defaultDescription = 'Start the Application';

  protected $migrations = [
    \Blindma1den\Excercise4\Database\Migrations\User::class,
    \Blindma1den\Excercise4\Database\Migrations\Country::class,
    \Blindma1den\Excercise4\Database\Migrations\Location::class,
    \Blindma1den\Excercise4\Database\Migrations\Hotel::class,
    \Blindma1den\Excercise4\Database\Migrations\Reservation::class
  ];

  protected function execute(InputInterface $input, OutputInterface $output): int{
    $io = new SymfonyStyle($input, $output);

    foreach(array_reverse($this->migrations) as $migration){
      $migration::down();
    }

    foreach($this->migrations as $migration){
      $migration::up();
      if (method_exists($migration, "seed")) $migration::seed();
    }

    return Command::SUCCESS;
  }
}
?>