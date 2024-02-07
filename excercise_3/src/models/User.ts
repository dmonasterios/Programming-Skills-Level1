import DB from "../utils/DB.ts";
import { User as UserType } from "../types/types.ts";

class User extends DB {
  public static async create(values: UserType) {
    const query = DB.getInsertSQL("users", values);
    return await DB.pool().query(DB.bind(query, values));
  }

  public static async get(username: string){
    const query = "SELECT * FROM users WHERE username LIKE :username";
    const result = await DB.pool().query(DB.bind(query, {username}));
    return result.rows[0] as Required<UserType> | undefined;
  }

  public static async login(username: string, password: string){
    const query = "SELECT COUNT(*) FROM users WHERE username LIKE :username AND password LIKE :password";
    const result = await DB.pool().query(DB.bind(query, {username, password}));
    return result.rows[0];
  }

  public static async update(userID: number,values: Partial<UserType>){
    const query = DB.getUpdateSQL("users", values);
    return await DB.pool().query(DB.bind(query, {id: userID,...values}));
  }
}

export default User;
