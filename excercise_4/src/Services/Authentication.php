<?php
namespace Blindma1den\Excercise4\Services;

use Blindma1den\Excercise4\Libs\Traits\ConsoleTrait;
use Blindma1den\Excercise4\Database\Models\User;
use Blindma1den\Excercise4\Libs\IO;

class Authentication{
  use ConsoleTrait;


  public function login(){
    $isProcessEnding = false;
    do{
      $this->clearConsole();
      IO::io()->title("LogIn");
      $username = IO::io()->ask("Username: ");
      $password = IO::io()->askHidden("Password: ");
      $user = User::get($username);

      if(!$user){
        IO::io()->error("Invalid Username or password.");
      } else if($user->login_attempts >= 3) IO::io()->error("Your User is Blocked.");
      else {
        $result = User::login($username, $password);
        if($result > 0){
          User::update(["login_attempts" => 0], $user->id);
          return $user;
        }
        $login_attempts = $user->login_attempts + 1;
        User::update(["login_attempts" => $login_attempts], $user->id);
        IO::io()->error("Invalid Username or password.");
      }

      if(!IO::io()->confirm("Do you want to try to login again?")) $isProcessEnding = true;
    }while(!$isProcessEnding);
  }

  public function register(){
    $isProcessEnding = false;
    do{
      $this->clearConsole();
      IO::io()->title("Register");
      $first_name = IO::io()->ask("First Name: ");
      $last_name = IO::io()->ask("Last Name: ");
      $username = IO::io()->ask("Username: ");
      $password = IO::io()->askHidden("Password: ");
      $newUser = (object)[
        "first_name" => $first_name,
        "last_name" => $last_name,
        "username" => $username,
        "password" => $password,
      ];

      $userData = User::get($newUser->username);

      if(!$userData){
        User::create($newUser);
        $isProcessEnding = true;
      }else{
        IO::io()->error("The introduced username is not available.");
        if(!IO::io()->confirm("Do you want to try to register again?")) $isProcessEnding = true;
      }
    }while(!$isProcessEnding);
  }
}

?>