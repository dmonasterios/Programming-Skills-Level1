import inquirer, { Answers } from "inquirer";

async function list<T>(choices: T[], msj?: string): Promise<T> {
  const { opt }: { opt: T } = await inquirer.prompt([
    {
      type: "list",
      name: "opt",
      message: msj || "Please Select an option:",
      choices: choices,
    },
  ]);

  return opt;
}

type Questions = {
  name: string,
  message:string,
  default: string
}

async function ask(questions: Questions[]): Promise<Answers>{
  const response = await inquirer.prompt(questions);
  return response;
}

async function secret(msj? : string): Promise<string>{
  const {secret}: {secret: string} = await inquirer.prompt([
    {
      type: 'password',
      name: 'secret',
      message: msj || 'Tell me a secret',
    },
  ]);
  return secret;
}

async function confirm(msj? : string): Promise<boolean>{
  const {response}: {response: boolean} = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'response',
      message: msj || 'Are you sure? ',
    },
  ]);
  return response;
}

async function pause(): Promise<void>{
  await inquirer.prompt([
    {
      name: 'enter',
      message: 'Press Enter to continue:  ',
      default:"Enter"
    },
  ]);
}

async function date(): Promise<Date>{
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  do{
    const { value } : { value: string } = await inquirer.prompt([
      {
        name: 'value',
        message: 'Please enter a valid Date: (YYYY/MM/DD or MM/DD/YYYY) ',
        default:Date.now()
      },
    ]);
    let date = new Date(value);
    if(!Number.isNaN(date.getTime())) {
      if(date.getTime() > today.getTime()) return date;
      else console.log("The introduced date can't be less than today.");
    }
    else{
      console.log("Invalid Date. Please introduce a date in format YYYY/MM/DD or MM/DD/YYYY.");
    }
  }while(true);
}

export default {
  list,
  ask,
  secret,
  confirm,
  pause,
  date
};
