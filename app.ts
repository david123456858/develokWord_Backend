import express, { Request, Response } from 'express';
import morgan from 'morgan'
import routeUser from './src/router/users/user';
import routeTeams from './src/router/teams/teams';


const app = express()

const PORT = process.env.PORT ?? 3000


app.use(express.json())
app.use(morgan('dev'))
app.use(routeUser)
app.use(routeTeams)

app.get("/", (req: Request, res: Response) => {
    res.send("Bienvenido a DelevolkWord 2.0 mejorado")
})


app.listen(PORT, () => {
    console.log(`El servidor esta escuchando http://localhost:${PORT}`)
})