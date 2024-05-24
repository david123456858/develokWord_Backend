
import { config } from 'dotenv'
import { DataSource } from 'typeorm'
import { employes } from '../entity/employes'
import { estados } from '../entity/status'
import { roles } from '../entity/rols'

config()

export class db_Connect {
  private static _intance: db_Connect// hago una traibuto de la clase a la cual le voy aplicar el patron

  private constructor () {
  }

  public static getIntance (): db_Connect {
    if (!db_Connect._intance) {
      db_Connect._intance = new db_Connect()
    }
    return db_Connect._intance // sigleton
  }

  public connectdb (): DataSource {
    const appDataSource = new DataSource({
      type: 'postgres',
      host: process.env.HOST,
      port: 5432,
      username: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      entities: [employes, estados, roles],
      synchronize: true
    })

    return appDataSource
  }
}
