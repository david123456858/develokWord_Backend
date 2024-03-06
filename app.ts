import express, { Request, Response } from 'express';
import morgan from 'morgan'
import routeUser from './src/router/users/user';



const app = express()



const PORT = process.env.PORT ?? 3000


app.use(express.json())
app.use(morgan('dev'))
app.use(routeUser)

app.get("/", (req: Request, res: Response) => {
    res.send("funciona lo basico")
})


app.listen(PORT, () => {
    console.log(`El servidor esta escuchando http://localhost:${PORT}`)
})