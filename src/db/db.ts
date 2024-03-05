import { Pool } from "pg"
import { config } from 'dotenv'
import { promises } from "dns"

config()

class db_Connect {
  private static _intance: db_Connect

  private constructor(){
  }

  public static async getIntance():Promise<db_Connect>{

    if(!db_Connect._intance){
      db_Connect._intance = new db_Connect()
      await db_Connect._intance.connect()
    }
    return db_Connect._intance
  }

  private async connect(): Promise<Pool> {
    const pool = new Pool({
      user: process.env.USER,
      host: process.env.HOST,
      database: process.env.DATABASE,
      password: process.env.PASSWORD,
      port: 5432,
    })
    return pool
  }

}
