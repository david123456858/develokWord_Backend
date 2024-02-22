import express from 'express';
import morgan from 'morgan'

const app = express()

const PORT = 3000

app.use(express.json())
app.use(morgan('dev'))

app.listen(PORT,()=>{
    console.log(`El servidor esta escuchando http://localhost${PORT}`)
})