
import { config } from 'dotenv'
import { DataSource } from 'typeorm'

config()

export class Db_Connect {
  private static _intance: Db_Connect// hago una traibuto de la clase a la cual le voy aplicar el patron

  private constructor () {
  }

  public static getIntance (): Db_Connect {
    if (!Db_Connect._intance) {
      Db_Connect._intance = new Db_Connect()
    }
    return Db_Connect._intance // sigleton
  }

  public connectdb (): DataSource {
    const appDataSource = new DataSource({
      type: 'postgres',
      host: process.env.HOST,
      port: 5432,
      username: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      entities: [],
      synchronize: true,
      logging: true
    })

    return appDataSource
  }
}
