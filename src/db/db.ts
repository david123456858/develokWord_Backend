import { Pool } from 'pg'
import { config } from 'dotenv'



config()

export class db_Connect {
  
  private static _intance: db_Connect// hago una traibuto de la clase a la cual le voy aplicar el patron

  private constructor() {
  }

  public static  getIntance(): db_Connect {

    if (!db_Connect._intance) {
      db_Connect._intance = new db_Connect()
    }
    return db_Connect._intance // sigleton 
  }

  public connectdb(): Pool{
    
    const pool =  new Pool({
      user:process.env.USER,
      host:process.env.HOST,
      password:process.env.PASSWORD,
      database: process.env.DATABASE,
      port: 5432
      
    })
    return pool
  }
}
