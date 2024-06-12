import { Request, Response } from 'express'

import { equipos } from '../../entity/teams'

export const createTeams = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id_equipo, nombre_equipo, NumIntegrantes, estados } = req.body
    const equipo = new equipos()
    console.log(id_equipo)
    equipo.id_equipo = id_equipo
    equipo.nombre_equipo = nombre_equipo
    equipo.estados = estados
    equipo.NumIntegrantes = NumIntegrantes
    if (id_equipo === null || nombre_equipo === null || estados === null) {
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
export const getId = async (id: string): Promise<equipos | undefined> => {
  try {
    const reponse = await equipos.findOne({
      where: {
        id_equipo: id
      },
      relations: {
        estados: true
      }
    })
    if (reponse !== null) {
      return reponse
    }
    return undefined
  } catch (error) {
    console.log(error)
  }
}
export const searchTeams = async (req: Request, res: Response): Promise<void> => {
  try {
    const { nombre_equipo } = req.body
    const responseSearch = await equipos.find({
      where: { nombre_equipo },
      relations: {
        estados: true
      }
    })
    res.status(200).json({ data: responseSearch })
  } catch (error) {
    res.status(505).json({ info: 'Error internal server' })
    console.log(error)
  }
}
export const updateTeams = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id_equipo, nombre_equipo, NumIntegrantes, estados } = req.body
    const responseTeam = await equipos.findOne({ where: { id_equipo } })
    if (responseTeam === null) {
      res.status(404).json({ data: 'No encontre nada' })
      return
    }
    responseTeam.nombre_equipo = nombre_equipo
    responseTeam.NumIntegrantes = NumIntegrantes
    responseTeam.estados = estados
    await responseTeam.save()
    res.status(200).json({ data: 'Ya se actualizo ' })
  } catch (error) {
    res.status(505).json({ info: 'Error internal server' })
    console.log(error)
  }
}
