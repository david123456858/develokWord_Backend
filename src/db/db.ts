import { Pool } from "pg"
import { config } from 'dotenv'

config()


export const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: 5432,
})

console.log(pool)
export default pool