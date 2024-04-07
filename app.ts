import express, { Request, Response } from 'express';
import morgan from 'morgan'
import routeUser from './src/router/users/user';
import routeTeams from './src/router/teams/teams';
import routerOrders from './src/router/orders/orders';
import cors from 'cors'

const app = express()

const PORT = process.env.PORT ?? 3000
app.use(cors({
    origin: '*'
}))
app.disable('x-powered-by')// cabecera que no permite darle a la persona la info de la creacion
app.use(express.json())
app.use(morgan('dev')) 
app.use(routeUser)
app.use(routeTeams)
app.use(routerOrders)

app.get("/", (req: Request, res: Response) => {
    res.send("Bienvenido a DelevolkWord 2.0 mejorado")
})

app.listen(PORT, () => {
    console.log(`El servidor esta escuchando http://localhost:${PORT}`)
})