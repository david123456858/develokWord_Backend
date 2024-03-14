import { Pool } from 'pg'
import { config } from 'dotenv'
import { PreviewModule } from 'astro'


config()

export class db_Connect {
  private static _intance: db_Connect

  private constructor() {
  }

  public static  getIntance(): db_Connect {

    if (!db_Connect._intance) {
      db_Connect._intance = new db_Connect()
    }
    return db_Connect._intance
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
