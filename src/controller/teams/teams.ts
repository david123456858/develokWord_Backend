import { Request, Response } from "express";
import { connect } from "../user/user";
import { ExitStatus } from "typescript";




export const createTeams = async (req: Request, res: Response) => {
    try {
        const { id_equipo, name_team } = req.body
        const response = await connect.query(`INSERT INTO public.equipos(id_equipo, nombre) VALUES ($1,$2)`, [id_equipo, name_team])
        res.status(200).json({ data: ' El equipo ha sido creado corretamente' })

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
// INSERT INTO public.equipos(id_equipo, nombre) VALUES (?, ?);