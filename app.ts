import express, { Request, Response } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import 'reflect-metadata'

import routeUser from './src/router/users/user'
import routeTeams from './src/router/teams/teams'
import routerOrders from './src/router/orders/orders'
import { Db_Connect } from './src/db/db'

const app = express()
const PORT = process.env.PORT ?? 3000
app.use(cors({
  origin: '*'
}))

export const responseDb = Db_Connect.getIntance().connectdb()

responseDb.initialize()
  .then(() => {
    console.log('Conexion realizada con la base de datos')
  })
  .catch((error: Error) => {
    console.log(error)
  })

app.disable('x-powered-by')// cabecera que no permite darle a la persona la info de la creacion
app.use(express.json())
app.use(morgan('dev'))
app.use(routeUser)
app.use(routeTeams)
app.use(routerOrders)

app.get('/', (req: Request, res: Response) => {
  res.json({ info: 'Bienvenido a DelevolkWord 2.0 mejorado' })
})
app.listen(PORT, () => {
  console.log(`El servidor esta escuchando http://localhost:${PORT}`)
})
