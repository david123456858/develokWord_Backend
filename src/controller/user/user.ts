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
    const { correo, contra } = req.body
    const responseC = await employes.findOne({
      where: { correo },
      select: ['contrasena']
    })
    const contrase = responseC?.contrasena as string
    if (responseC === null) {
      res.status(404).json({ detail: 'Not Found user' })
    }
    console.log(await comparePassWord(contra, contrase))
    if (await comparePassWord(contra, contrase)) {
      const response = await employes.findOne({
        where: { correo },
        select: ['id_usuario', 'nombre1', 'nombre2', 'apellido1', 'apellido2', 'correo', 'idEquipo', 'idRol', 'idEstado'],
        relations: {
          idEstado: true,
          idRol: true,
          idEquipo: true
        }
      })
      const user: User = {
        user: response?.correo as string,
        rol: response?.idRol.nombre_rol as string
      }
      const tokenS = await tokenSing(user)
      res.status(200).json({ info: { data: response, token: tokenS, message: 'Has iniciado sesión' } })
    } else {
      res.status(404).json({ detail: 'Contraseña o usuario incorrecto' })
    }
  } catch (error) {
    res.status(505).json({ info: 'Error internal Server' })
    console.log(error)
  }
}
export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { idUsuario, nombre1, nombre2, apellido1, apellido2, correo, contrasena, idRol, idEstado, idEquipo } = req.body
    const user = new employes()
    const password = await encryptPassWord(contrasena) as string
    user.id_usuario = idUsuario
    user.nombre1 = nombre1
    user.nombre2 = nombre2
    user.apellido1 = apellido1
    user.apellido2 = apellido2
    user.correo = correo
    user.idRol = idRol
    user.idEstado = idEstado
    user.contrasena = password
    user.idEquipo = idEquipo
    if (idUsuario === null || nombre1 === null || apellido1 === null || correo === null || contrasena === null || idRol === null || idEstado === null) {
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
    const { idUsuario, idEquipo } = req.body
    if (idUsuario === null || idEquipo === null) {
      res.status(422).json({ message: 'No se han enviado todos los datos necesarios' })
      return
    }
    const cont = await employes.countBy({ idEquipo })
    const contT = await getId(idEquipo)
    if (contT === undefined) {
      res.json({ data: 'No se encontro' })
      return
    }
    const num = parseInt(contT.NumIntegrantes)
    if (cont < num) {
      const user = await employes.findOneBy({ id_usuario: idUsuario })
      if (user === null) {
        res.status(404).json({ message: 'User does dont exist' })
        return
      }
      user.idEquipo = idEquipo
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
    const { contra } = req.body
    const contrasena = await encryptPassWord(contra) as string
    const user = await employes.findOneBy({ id_usuario: req.params.id })
    if (user === null) {
      res.status(404).json({ message: 'User does dont exist' })
      return
    }
    user.contrasena = contrasena
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
// export const contIntegrate = async (idEquipo: string, idUsuario: string): Promise<boolean | undefined > => {
//   try {
//     if (idUsuario === null || idEquipo === null) {
//       console.log('No se han enviado todos los datos necesarios')
//       return
//     }
//     const cont = await employes.countBy({ idEquipo })
//     const contT = await getId(idEquipo)
//     if (contT === undefined) {
//       return
//     }
//     return true
//   } catch (error) {

//   }
// }
