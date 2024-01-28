import prompt from "../utils/prompt.ts";
import * as user from "../repositories/User.ts";
import connection from "../libs/connectionDB.ts";
import { userParams } from "../types/types.ts";

export const login = async (): Promise< Required<userParams> | void> => {
  let isProcessEnding = false;
  do {
    try {
      console.clear();
      console.log("LogIn \n");

      const { username } = (await prompt.ask([
        {
          name: "username",
          message: "Username: ",
          default: "jdoe",
        },
      ])) as { username: string };

      const password: string = await prompt.secret("Password:");

      const userData = await user.getUser(username) as Required<userParams>;

      if(userData === undefined)
        console.log("Invalid Username or password.");
      else if(userData.login_attempts >= 3) console.log("Your User is Blocked.");
      else {
        const response = await user.login(username, password);
        if(response !== 0) {
          await user.update(userData.id, {
            login_attempts: 0
          });
          return userData;
        }

        await user.update(userData.id, {
          login_attempts: userData.login_attempts + 1
        });
        console.log("Invalid Username or password.");
      }

      isProcessEnding = !(await prompt.confirm(
        "Do you want to try to login again? (Y/N): "
      ));

    } catch (error) {
      console.log(error);
    }

  } while (!isProcessEnding);
};

export const logOut = () => {
  console.log("Goodbye See you later");
  connection.end();
  process.exit();
};

export const register = async () => {
  let isProcessEnding = false;

  do {
    try {
      console.clear();
      console.log("Register a new user \n");
      console.log("Please respond the following questions:");

      const userData = (await prompt.ask([
        {
          name: "first_name",
          message: "First name: ",
          default: "John",
        },
        {
          name: "last_name",
          message: "Last name: ",
          default: "Doe",
        },
        {
          name: "username",
          message: "Username: ",
          default: "jdoe",
        },
      ])) as userParams;
      const password = await prompt.secret("Password:");

      const userID = await user.verifyIfExist(userData.username) as number;

      if (userID) {
        console.clear();
        console.log("The introduced username is not available.");
        isProcessEnding = !(await prompt.confirm(
          "Do you want to try to register again? (Y/N): "
        ));
      } else {
        await user.create({
          ...userData,
          password
        });

        isProcessEnding = true;
      }
    } catch (error) {
      console.log("Catch Error: "+error);
    }
  } while (!isProcessEnding);
};
