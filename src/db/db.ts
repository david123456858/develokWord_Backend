import { Client, connect } from 'ts-postgres'
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

  public async connectdb(): Promise<Client>{
    const client = await connect({
      "host": process.env.HOST,
      "user": process.env.USER,
      "database": process.env.DATABASE,
      "password": process.env.PASSWORD,
      "port": 5432
    }
    )
    return client
  }
}
