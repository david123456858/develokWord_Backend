import { Request, Response } from "express";
import { connect } from "../user/user";


export const createTeams = async (req: Request, res: Response) => {
    try {
        const { id_equipo, nombre, descripcion, estado } = req.body
        if (!id_equipo || !nombre || !estado) {
            return res.status(422).json({
                detail: {
                    info: "Unprocessable Content",
                    message: "No se han enviado todos los datos necesarios"
                }
            })

        }
        const response = await connect.query(`INSERT INTO public.equipos(
            id_equipo, nombre, id_estado, descrip)
            VALUES ($1, $2, $3, $4);`, [id_equipo, nombre, estado, descripcion])

        res.status(201).json({ data: 'El equipo ha sido creado corretamente' })

    } catch (error) {
        console.log(error)
        res.status(500).json({ data: 'Error internal Server' })
    }

}
export const getAll = async (req: Request, res: Response) => {
    try {
        const reponse = await connect.query('SELECT * FROM EQUIPOS')
        res.status(200).json({ data: reponse.rows })
    } catch (error) {
        console.log(error)
        res.status(500).json({ data: "Internal server Error" })
    }
}
export const getIdTeam = async () => {

}
export const updateTeams = async () => {

}