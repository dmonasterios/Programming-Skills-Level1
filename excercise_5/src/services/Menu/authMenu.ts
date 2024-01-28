import prompt from "../../utils/prompt.ts";
import {logOut, register, login} from "../../services/authentication.ts";
import { userParams } from "../../types/types.ts";

type options = 'LogIn' | 'Register' | 'Exit';

const authMenu = {
  'LogIn':login,
  'Register':register,
  'Exit':logOut
}

const printAuthMenu = async () : Promise<Required<userParams>> => {
  let user : Required<userParams> | void;

  do{
    console.clear();
    console.log("Welcome to Turkish Airlines System \n");
    let opt: options = await prompt.list<options>(['LogIn', 'Register', 'Exit']);
    user = await authMenu[opt]();
  }while(user === undefined);

  return user;
}

export default printAuthMenu;