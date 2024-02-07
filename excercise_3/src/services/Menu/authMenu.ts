import prompt from "../../utils/prompt.ts";
import printfn from "../../utils/printfn.ts";
import { login, register, logOut  } from "../../services/authentication.ts";
import { User } from "../../types/types.ts";

type options = 'LogIn' | 'Register' | 'Exit';

const authMenu = {
  'LogIn':login,
  'Register':register,
  'Exit':logOut
}

const printAuthMenu = async () : Promise<Required<User>> => {
  let user : Required<User> | void;

  do{
    console.clear();
    printfn.title("Welcome to Valencia Hospital System \n");
    let opt: options = await prompt.list<options>(['LogIn', 'Register', 'Exit']);
    user = await authMenu[opt]();
  }while(user === undefined);

  return user;
}

export default printAuthMenu;