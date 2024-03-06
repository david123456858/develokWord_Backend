import { Client, connect } from 'ts-postgres'
import { config } from 'dotenv'


config()

class db_Connect {
  private static _intance: db_Connect

  private constructor() {
  }

  public static async getIntance(): Promise<db_Connect> {

    if (!db_Connect._intance) {
      db_Connect._intance = new db_Connect()
      await db_Connect._intance.connectdb()
    }
    return db_Connect._intance
  }

  private async connectdb(): Promise<Client> {
    const client = connect({
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
  