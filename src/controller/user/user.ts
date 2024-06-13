import { Request, Response } from 'express'

import { encryptPassWord, comparePassWord } from '../../helpers/encryp'
import { employes } from '../../entity/employes'
import { estados } from '../../entity/status'
import { roles } from '../../entity/rols'
import { User } from '../../entity/user'
import { tokenSing } from '../../helpers/tokensHelpers'
import { getId } from '../teams/teams'
// import { employes } from '../../entity/employes'

export const verifyUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { correo, contrasena } = req.body
    const responseC = await employes.findOne({
      where: { correo },
      select: ['contrasena']
    })
    const contrasenase = responseC?.contrasena as string
    if (responseC === null) {
      res.status(404).json({ detail: 'Not Found user' })
    }
    console.log(await comparePassWord(contrasena, contrasenase))
    if (await comparePassWord(contrasena, contrasenase)) {
      const data: employes | null = await employes.findOne({
        where: { correo },
        select: ['id_usuario', 'nombre1', 'nombre2', 'apellido1', 'apellido2', 'correo', 'idEquipo', 'idRol', 'idEstado'],
        relations: {
          idEstado: true,
          idRol: true,
          idEquipo: true
        }
      })
      const user: User = {
        user: data?.correo as string,
        rol: data?.idRol.nombre_rol as string
      }
      console.log(data?.id_usuario)
      const tokenS = await tokenSing(user)
      res.status(200).json({ info: { data, token: tokenS, message: 'Has iniciado sesión' } })
    } else {
      res.status(404).json({ detail: 'Contrasenaseña o usuario incorrecto' })
    }
  } catch (error) {
    res.status(505).json({ info: 'Error internal Server' })
    console.log(error)
  }
}
export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id_usuario, nombre1, nombre2, apellido1, apellido2, correo, contrasena, idRol, idEstado, idEquipo } = req.body
    const user = new employes()
    const password = await encryptPassWord(contrasena) as string
    user.id_usuario = id_usuario
    user.nombre1 = nombre1
    user.nombre2 = nombre2
    user.apellido1 = apellido1
    user.apellido2 = apellido2
    user.correo = correo
    user.idRol = idRol
    user.idEstado = idEstado
    user.contrasena = password
    user.idEquipo = idEquipo
    if (id_usuario === null || nombre1 === null || apellido1 === null || correo === null || contrasena === null || idRol === null || idEstado === null) {
      res.status(422).json({
        detail: {
          info: 'Unprocessable Content',
          message: 'No se han enviado todos los datos necesarios'
        }
      })
      return
    }
    await user.save()
    res.status(201).json({ data: 'Se ha guardado correctamente el usuario' })
  } catch (error) {
    console.log(error)
    res.status(505).json({ info: 'Internal error server' })
  }
}
export const getAllUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await employes.find({
      relations: {
        idEstado: true,
        idRol: true,
        idEquipo: true
      }
    })
    res.status(200).json({ users })
  } catch (error) {
    console.log(error)
    res.status(505).json({ info: 'Internal error server' })
  }
}
export const updateUserTeams = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id_usuario, id_equipo } = req.body
    console.log(id_equipo, id_usuario)

    if (id_usuario === null || id_equipo === null) {
      res.status(422).json({ message: 'No se han enviado todos los datos necesarios' })
      return
    }
    const cont: number = await employes.count({ where: { idEquipo: id_equipo } })
    console.log(cont)
    const contT = await getId(id_equipo)
    if (contT === undefined) {
      res.json({ data: 'No se encontro' })
      return
    }
    console.log(contT)
    const num = parseInt(contT.NumIntegrantes)
    if (cont < num) {
      const user = await employes.findOneBy({ id_usuario })
      if (user === null) {
        res.status(404).json({ message: 'User does dont exist' })
        return
      }
      console.log(user)
      user.idEquipo = id_equipo
      await user.save()
      res.status(200).json({ data: 'Usuario asignado a un grupos' })
    } else {
      res.status(404).json({ data: 'Maximo de integrantes' })
    }
  } catch (error) {
    console.log(error)
    res.status(505).json({ info: 'Internal error server' })
  }
}
export const changePassWord = async (req: Request, res: Response): Promise<void> => {
  try {
    const { contrasena } = req.body
    const contra = await encryptPassWord(contrasena) as string
    const user = await employes.findOneBy({ id_usuario: req.params.id })
    if (user === null) {
      res.status(404).json({ message: 'User does dont exist' })
      return
    }
    user.contrasena = contra
    await user.save()
    res.status(200).json({ data: 'User change succesFully passwords' })
  } catch (error) {
    console.log(error)
    res.status(505).json({ info: 'Internal error server' })
  }
}
export const getInfo = async (req: Request, res: Response): Promise<void> => {
  try {
    const responseR = await estados.find()
    const responseE = await roles.find()
    res.status(200).json({
      data: {
        roles: responseR,
        estados: responseE
      }
    })
  } catch (error) {
    console.log(error)
    res.status(505).json({ info: 'Internal error server' })
  }
}
export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id_usuario, nombre1, nombre2, apellido1, apellido2, correo, idEstado, idEquipo } = req.body
    console.log(idEstado)

    const responseEmpleados = await employes.findOne({ where: { id_usuario } })
    if (responseEmpleados === null) {
      res.status(404).json({ data: 'empleado not found' })
      return
    }
    responseEmpleados.id_usuario = id_usuario
    responseEmpleados.nombre1 = nombre1
    responseEmpleados.nombre2 = nombre2
    responseEmpleados.apellido1 = apellido1
    responseEmpleados.apellido2 = apellido2
    responseEmpleados.correo = correo
    responseEmpleados.idEquipo = idEquipo
    console.log('AQUIIII', idEstado)
    responseEmpleados.idEstado = idEstado
    await responseEmpleados.save()
    res.status(200).json({ data: 'Se actualizo correctamente el usuario' })
  } catch (error) {
    console.log(error)
    res.status(505).json({ info: 'Internal error server' })
  }
}
