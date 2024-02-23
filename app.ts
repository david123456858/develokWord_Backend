import express, { Request, Response } from 'express';
import morgan from 'morgan'

import route from './src/router/userOperario';
import { pool } from './src/db/db';

const app = express()



const PORT = process.env.PORT ?? 3000


app.use(express.json())
app.use(morgan('dev'))

app.get("/",(req:Request,res:Response)=>{
    res.send("funciona lo basico")
})

app.use(route)
app.listen(PORT, () => {
    console.log(`El servidor esta escuchando http://localhost:${PORT}`)
})