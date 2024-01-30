<?php
namespace Blindma1den\Excercise4\Libs\Traits;
use Symfony\Component\Console\Question\ChoiceQuestion;
use Symfony\Component\Console\Question\Question;
use Blindma1den\Excercise4\Libs\IO;
use DateTime;

trait ConsoleTrait{
  function clearConsole(){
    IO::io()->writeln((sprintf("\033\143")));
  }

  function promptList($title,$list){
    $question = new ChoiceQuestion(
      $title,
      $list
    );

    $question->setErrorMessage('Option %s is invalid.');
    $option = IO::helper()->ask(IO::input(),IO::output(),$question);
    return $option;
  }

  function promptListGetID($title,$list,$key){
    $optionsArr = [];
    foreach($list as $item){
      $optionsArr[] = $item[$key];
    }
    $question = new ChoiceQuestion(
      $title,
      $optionsArr
    );

    $question->setErrorMessage('Option %s is invalid.');
    $option = IO::helper()->ask(IO::input(),IO::output(),$question);

    foreach($list as $item){
      if($item[$key] === $option){
        return [$key => $item[$key],"id" => $item['id']];
      }
    }
    return $option;
  }

  function promptNumber($title){
    $question = new Question(
      $title,
      "1"
    );
    $question->setValidator(function ($answer) {
      $answer = intval($answer);
      if (!is_numeric($answer) || $answer <= 0) {
        throw new \RuntimeException(
                'The value should be a positive number.'
            );
      }
      else return $answer;
    });
    $question->setMaxAttempts(null);
    $option = IO::helper()->ask(IO::input(),IO::output(),$question);
    return $option;
  }

  function promptDate($title){
    $question = new Question(
      $title." (d/m/Y H:m:s):",
      "1"
    );
    $question->setValidator(function ($answer) {
      $dateTime = DateTime::createFromFormat("d/m/Y H:m:s", $answer);
      if (!$dateTime) {
        throw new \RuntimeException(
                'The value should be a valid date.'
            );
      }
      else return $answer;
    });
    $question->setMaxAttempts(null);
    $option = IO::helper()->ask(IO::input(),IO::output(),$question);
    return $option;
  }
}
?>