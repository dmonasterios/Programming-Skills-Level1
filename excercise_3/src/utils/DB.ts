import pool from "../libs/conecctionDB.ts";
import bind from "pg-bind";

type paramsType = {[key: string] : string | number | boolean}

class DB {
  protected static pool(){
    return pool;
  }

  protected static bind(query: string, values: {[key: string] : unknown}){
    return bind(query, values);
  }

  protected static getUpdateSQL(table: string, params: paramsType ){
    const arrParams = [];
    for(const [key, value] of Object.entries(params)){
      arrParams.push(`${key} = :${key}`);
    }
    return `UPDATE ${table} SET ${arrParams.join(', ')} WHERE id = :id`
  }

  protected static getInsertSQL(table: string, params: paramsType ){
    const arrParams = [];
    const arrValues = [];
    for(const [key, value] of Object.entries(params)){
      arrValues.push(`${key}`);
      arrParams.push(`:${key}`);
    }
    return `INSERT INTO ${table}(${arrValues.join(', ')}) VALUES(${arrParams.join(', ')}) `
  }

  public static end(){
    pool.end();
  }

}


export default DB;