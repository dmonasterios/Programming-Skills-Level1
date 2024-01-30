<?php
namespace Blindma1den\Excercise4\Libs;
use Symfony\Component\Console\Style\SymfonyStyle;

abstract class IO{
  public static $input;
  public static $output;
  public static $io;
  public static $helper;

  public static function setIO($input, $output, $helper){
    self::$input = $input;
    self::$output = $output;
    self::$io = new SymfonyStyle($input, $output);
    self::$helper = $helper;
  }

  public static function input(){
    return self::$input;
  }

  public static function output(){
    return self::$output;
  }

  public static function io(){
    return self::$io;
  }

  public static function helper(){
    return self::$helper;
  }

}



?>