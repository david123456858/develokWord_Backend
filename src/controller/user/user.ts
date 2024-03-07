import { Request, Response, query } from "express";
import { tokenSing } from "../../helpers/tokensHelpers";
import { User } from "../../model/user";
import { db_Connect } from "../../db/db";
import { Console } from "console";

//verificar usuario 

const _db = db_Connect.getIntance()

export const verifyUser = async (req: Request, res: Response) => {
    try {
        
        const user = req.body
        
        const connect = await _db.connectdb()
        const result = await connect.query(`SELECT * FROM USUARIOS WHERE usuarios.correo = '${user.user}' AND usuarios.contraseña = '${user.passWords}'`)
        console.log(result)
        res.status(204).json(result)
        connect.end().then(response =>{
            console.log("se ha cerrado la base de datos")
        })
    } catch (error) {

    }



}

export const createToken = async (req: Request, res: Response) => {
    try {
        const user: User = {
            user: "juandavid@gmail.com",
            passWords: "12345678"
        }
        const token = await tokenSing(user)
        res.json({ data: token })
    } catch (error) {
        throw new Error
    }
}