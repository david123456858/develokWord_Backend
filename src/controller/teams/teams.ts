import { Request, Response } from 'express'

import { equipos } from '../../entity/teams'

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
    const reponse = await equipos.find({
      relations: {
        estados: true
      }
    })
    res.status(200).json({ data: reponse })
  } catch (error) {
    console.log(error)
    res.status(500).json({ data: 'Internal server Error' })
  }
}
export const getIdTeam = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id
    const idS = id.toString()
    console.log(idS)
    const reponse = await equipos.findOne({
      where: {
        id_equipo: idS
      },
      relations: {
        estados: true
      }
    })
    if (reponse === null) {
      res.status(404).json({ error: 'No fue encontrado' })
    }
    res.status(200).json({ data: reponse })
  } catch (error) {
    res.status(500).json({ data: 'Internal server Error' })
    console.log(error)
  }
}
// export const updateTeams = async () => {

// }
