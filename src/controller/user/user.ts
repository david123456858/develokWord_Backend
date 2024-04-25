import { Request, Response } from "express";
import { tokenSing } from "../../helpers/tokensHelpers";
import { User } from "../../model/user";
import { db_Connect } from "../../db/db";
import { QueryResult } from "pg";
import bcrypt from "bcryptjs"
import { promises } from "readline";

//verificar usuario 

const _db = db_Connect.getIntance()
export const connect = _db.connectdb()


export const verifyUser = async (req: Request, res: Response) => {
    try {
        const userReq = req.body
        const response: QueryResult = await connect.query(`SELECT id_usuario,nombre1,nombre2,apellido1,apellido2,correo FROM USUARIOS WHERE 
        usuarios.correo = '${userReq.user}' AND usuarios.contraseña = '${userReq.passWords}'`)
        console.log(response.rows)
        res.status(200).json(response.rows)

    } catch (error) {
        res.status(505).json({ info: "Error internal Server" })
        console.log(error)
    }
}

export const createToken = async (req: Request, res: Response) => {
    try {
        const users = "LauAltahona@gmail.com"
        const user: User = {
            user: users,
            passWords: "berlin1234"
        }
        const token = await tokenSing(user)
        res.status(200).json({info:{ data: token,message:"Token Creado" }})
    } catch (error) {
        res.status(505).json({ info: "Error internal Server" })
        console.log(error)
    }
}

export const createUser = async (req: Request, res: Response) => {
    try {
        const queryDefault: string = `INSERT INTO usuarios(
            id_usuario, nombre1, nombre2, apellido1, correo, contraseña, id_rol, id_estado, apellido2)
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`
        // console.log(req.body)
        const { id_user, nombre1, nombre2, apellido1, apellido2, correo, contra, rol, estado } = req.body
        if (!id_user || !nombre1 || !apellido1 || !correo || !contra || !rol || !estado) {
            res.status(422).json({
                detail: {
                    info: "Unprocessable Content",
                    message: "No se han enviado todos los datos necesarios"
                }
            })
            return
        }
        const response: QueryResult = await connect.query(queryDefault,
            [id_user, nombre1, nombre2 ?? '', apellido1, correo, contra, rol, estado, apellido2 ?? ''])
            console.log(response)
        res.status(201).json({ data: "Se ha guardado correctamente el usuario" })
    } catch (error) {
        console.log(error)
        res.status(505).json({ info: "Internal error server" })
    }
}

export const getAllUser = async (req: Request, res: Response) => {
    try {
        //Ojo que no puedes mandar todos los datos solo los pertinentes como nombres cedula 
        const response: QueryResult = await connect.query(`SELECT id_usuario, nombre1, nombre2, apellido1 ,apellido2,id_estado 
        FROM usuarios WHERE usuarios.id_rol = '2' `)
        res.status(200).json({ data: response.rows })
    } catch (error) {
        console.log(error)
        res.status(505).json({ info: "Internal error server" })
    }
}

export const updateUserTeams = async (req: Request, res: Response) => {
    try {
        const { id_user, id_team } = req.body
        const queryDefault: string = `UPDATE public.usuarios
        SET id_equipo=$2 WHERE usuarios.id_usuario =$1`
        const response: QueryResult = await connect.query(queryDefault, [id_user, id_team])
        res.status(200).json({ data: "Usuario asignado a un grupos" })
        console.log(response)
    } catch (error) {
        console.log(error)
        res.status(505).json({ info: "Internal error server" })
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {
        const id = (req.params.id)
        const { name1, name2, lastname1, lastname2 } = req.body
        let quer: string = 'UPDATE public.usuarios SET '
        const updateQuery = []
        let index = 1
        if (name1) {
            quer += `nombre1=$${index} ,`
            updateQuery.push(name1)
            index++
        }
        if (name2) {
            quer += `nombre2=$${index} ,`
            updateQuery.push(name2)
            index++
        }
        if (lastname1) {
            quer += `apellido1=$${index} ,`
            updateQuery.push(lastname1)
            index++
        }
        if (lastname2) {
            quer += `apellido2=$${index} ,`
            updateQuery.push(lastname2)
            index++
        }
        quer = quer.slice(0, -1)
        quer += `WHERE id_usuario = '${id}'`
        console.log(quer)

        console.log(updateQuery)
        const response: QueryResult = await connect.query(quer, updateQuery)
        res.status(202).json({ data: `update user succeFully` })
    } catch (error) {
        console.log(error)
        res.status(505).json({ info: "Internal error server" })
    }
}

export const changePassWord = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const { passWordsNew } = req.body
        const queryDefault: string = `UPDATE public.usuarios SET contraseña =$2 WHERE id_usuario = $1`
        const responde: QueryResult = await connect.query(queryDefault, [id, passWordsNew])
        res.status(200).json({ data: "User change succesFully passwords" })

    } catch (error) {
        console.log(error)
        res.status(505).json({ info: "Internal error server" })
    }
}

export const getInfo = async (req: Request, res: Response) => {
    try {
        const responseR: QueryResult = await connect.query(`SELECT * FROM roles`)
        const responseE: QueryResult = await connect.query(`SELECT * FROM estados`)
        res.status(200).json({
            data: {
                "roles": responseR.rows,
                "estados": responseE.rows,
            }
        })
    } catch (error) {
        console.log(error)
        res.status(505).json({ info: "Internal error server" })
    }
}   

export const encryptPassWord = async(pass:string)=>{
    const sal = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(pass,sal)
    return hash
}
export const comparePassWord = async (pass:string, hash:string)=>{
    return await bcrypt.compare(pass, hash)
}