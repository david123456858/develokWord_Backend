import { Request, Response, query } from "express";
import { tokenSing } from "../../helpers/tokensHelpers";
import { User } from "../../model/user";
import { db_Connect } from "../../db/db";
import { QueryResult } from "pg";
import { error } from "console";

//verificar usuario 

const _db = db_Connect.getIntance()
const connect = _db.connectdb()
export const verifyUser = async (req: Request, res: Response) => {
    try {
        const userReq = req.body
        const response: QueryResult = await connect.query(`SELECT * FROM USUARIOS WHERE usuarios.correo = '${userReq.user}' AND usuarios.contraseña = '${userReq.passWords}'`)
        console.log(response.rows)
        res.status(200).json(response.rows)
        connect.end()
            .then((result) => {
                console.log("base de datos cerrada correctamente")
            })
    } catch (error) {
        res.status(505).json({ info: "Error internal Server" })
        console.log(error)
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
        res.status(505).json({ info: "Error internal Server" })
        console.log(error)
    }
}

export const createUser = async (req: Request, res: Response) => {
    try {
        console.log(req.body)
        const { id_user, nombre1, nombre2, apellido1, apellido2, correo, contra, rol, estado } = req.body
        const response = await connect.query(`INSERT INTO usuarios(
            id_usuario, nombre1, nombre2, apellido1, correo, contraseña, id_rol, id_estado, apellido2)
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,[id_user,nombre1,nombre2,apellido1,correo,contra,rol,estado,apellido2])
        connect.end().then((result => {
            console.log("Base de datos cerrada correctamente")
        }))
        res.status(200).json({data: "Se ha guardado correctamente el usuario"})
    } catch (error) { 
        console.log(error)
        res.status(505).json({ info: "Internal error server" })
    }
}

export const getAllUser = async (req:Request,res:Response)=>{
    const response = await connect.query(`SELECT * FROM usuarios WHERE usuarios.id_rol = '2' `)
    res.status(200).json({data: response.rows})
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