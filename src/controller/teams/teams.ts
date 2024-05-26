import { Request, Response } from 'express'

import { connect } from '../user/user'
import { equipos } from '../../entity/teams'
import { User } from '../../entity/user'

export const createTeams = async (req: Request, res: Response): Promise<void> => {
  try {
    const { idEquipo, nombre, descripcion, estado } = req.body
    const equipo = new equipos()
    equipo.id_equipo = idEquipo
    equipo.nombre_equipo = nombre
    equipo.estados = estado
    equipo.descripcion = descripcion
    console.log(equipo)
    if (idEquipo === null || nombre === null || estado === null) {
      res.status(422).json({
        detail: {
          info: 'Unprocessable Content',
          message: 'No se han enviado todos los datos necesarios'
        }
      })
      return
    }
    await equipo.save()
    res.status(201).json({ data: 'El equipo ha sido creado corretamente' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ data: 'Error internal Server' })
  }
}
export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const reponse = await equipos.find()
    res.status(200).json({ data: reponse })
  } catch (error) {
    console.log(error)
    res.status(500).json({ data: 'Internal server Error' })
  }
}
export const getIdTeam = async () => {

}
export const updateTeams = async () => {

}
