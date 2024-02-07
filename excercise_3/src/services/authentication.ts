import User from "../models/User.ts";
import prompt from "../utils/prompt.ts";
import printfn from "../utils/printfn.ts";
import { User as UserType } from "../types/types.ts";
import DB from "../utils/DB.ts";
import sleep from "../utils/sleep.ts";

export const login = async (): Promise<Required<UserType> | void> => {
  let isProcessEnding = false;

  do {
    console.clear();
    printfn.title("LogIn");
    const username = await prompt.ask({
      msj: "Username: ",
      defaultValue: "jdoe",
    });
    const password = await prompt.secret("Password: ");
    const userData = (await User.get(username)) as Required<UserType>;

    if (userData === undefined) printfn.error("Invalid Username or password.");
    else if (userData.login_attempts >= 3)
      printfn.error("Your User is Blocked.");
    else {
      const response = (await User.login(username, password)) as {
        count: string;
      };

      if (Number(response.count) !== 0) {
        await User.update(userData.id, {
          login_attempts: 0,
        });
        printfn.success("Login Successful");
        await sleep(1);
        return userData;
      }

      await User.update(userData.id, {
        login_attempts: userData.login_attempts + 1,
      });

      printfn.error("Invalid Username or password.");
    }
    isProcessEnding = !(await prompt.confirm(
      "Do you want to try to login again? (Y/N): "
    ));
  } while (!isProcessEnding);
};

export const logOut = () => {
  printfn.success("Goodbye See you later");
  DB.end();
  process.exit();
};

export const register = async () => {
  let isProcessEnding = false;
  do {
    console.clear();
    printfn.title("Register");
    const first_name = await prompt.ask({
      msj: "First Name: ",
      defaultValue: "John",
    });
    const last_name = await prompt.ask({
      msj: "Last Name: ",
      defaultValue: "Doe",
    });
    const username = await prompt.ask({
      msj: "Username: ",
      defaultValue: "jdoe",
    });
    const password = await prompt.secret("Password: ");

    const user = (await User.get(username)) as Required<UserType>;

    if (user) {
      console.clear();
      printfn.error("The introduced username is not available.");
      isProcessEnding = !(await prompt.confirm(
        "Do you want to try to register again? (Y/N): "
      ));
    }
    else {
      await User.create({first_name, last_name, username, password});
      printfn.success("Registration Successful");
      isProcessEnding = true;
      await sleep(1);
    }
  } while (!isProcessEnding);
};
