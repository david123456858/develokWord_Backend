import { Request, Response, query } from "express";
import { tokenSing } from "../../helpers/tokensHelpers";
import { User} from "../../model/user";
import { db_Connect } from "../../db/db";
import {QueryResult } from "pg";

//verificar usuario 

const _db = db_Connect.getIntance()
const connect = _db.connectdb()
export const verifyUser = async (req: Request, res: Response) => {
    try {
        const userReq = req.body
        const response:QueryResult = await connect.query(`SELECT * FROM USUARIOS WHERE usuarios.correo = '${userReq.user}' AND usuarios.contraseña = '${userReq.passWords}'`) 
        console.log(response.rows)
        res.status(200).json(response.rows)
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

export const createUser = async (req:Request,res:Response)=>{
    try {
        console.log(req.body)
    } catch (error) {
        console.log(error)
        res.status(505).json({data:"Internal error server"})
    }
}
/* INSERT INTO public.usuarios(
	id_usuario, nombre1, nombre2, apellido1, correo, "contraseña", id_equipo, id_rol, id_estado, apellido2)
	VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);


   INSERT INTO public.equipos(
	id_equipo, nombre)
	VALUES (?, ?);

   INSERT INTO public."ordenes "(
	id_orden, comentarios, id_equipo, id_prioridad)
	VALUES (?, ?, ?, ?);
    
    
    UPDATE public.usuarios
	SET id_usuario=?, nombre1=?, nombre2=?, apellido1=?, correo=?, "contraseña"=?, id_equipo=?, id_rol=?, id_estado=?, apellido2=?
	WHERE <condition>;

    DELETE FROM public.usuarios
	WHERE <condition>;
    
    */