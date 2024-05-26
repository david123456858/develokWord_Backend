import { Request, Response } from 'express'

import { encryptPassWord, comparePassWord } from '../../helpers/encryp'
import { employes } from '../../entity/employes'
import { estados } from '../../entity/status'
import { roles } from '../../entity/rols'
import { User } from '../../entity/user'
// import { employes } from '../../entity/employes'

// verificar usuario

export const verifyUser = async (req: Request, res: Response): Promise<void> => {
  // try {
  //   const { correo, contra } = req.body
  //   let response = await connect.query(`SELECT contraseña FROM USUARIOS WHERE
  //       usuarios.correo = $1`, [correo])
  //   if (response.rowCount === 0) {
  //     res.status(404).json({
  //       detail: {
  //         info: 'Not Found',
  //         message: 'Usuario no encontrado'
  //       }
  //     })
  //     return
  //   }
  //   const { contraseña } = response.rows[0]
  //   if (await comparePassWord(contra, contraseña)) {
  //     response = await connect.query(`SELECT idUsuario,nombre1,nombre2,apellido1,apellido2,correo FROM USUARIOS WHERE
  //               usuarios.correo = $1`, [correo])
  //     res.status(200).json({ info: { data: response.rows, message: 'Has iniciado sesión' } })
  //   } else {
  //     res.status(404).json({
  //       detail: {
  //         info: 'Not Found',
  //         message: 'Mala contraseña'
  //       }
  //     })
  //   }
  // } catch (error) {
  //   res.status(505).json({ info: 'Error internal Server' })
  //   console.log(error)
  // }
}

export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { idUsuario, nombre1, nombre2, apellido1, apellido2, correo, contra, rol, estado } = req.body
    const user = new employes()
    const password = await encryptPassWord(contra)
    user.id_usuario = idUsuario
    user.nombre1 = nombre1
    user.nombre2 = nombre2
    user.apellido1 = apellido1
    user.apellido2 = apellido2
    user.correo = correo
    user.idRol = rol
    user.idEstado = estado
    user.contrasena = password
    if (idUsuario === null || nombre1 === null || apellido1 === null || correo === null || contra === null || rol === null || estado === null) {
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
    console.log(idUsuario, idEquipo)
    if (idUsuario === null || idEquipo === null) {
      res.status(422).json({
        detail: {
          info: 'Unprocessable Content',
          message: 'No se han enviado todos los datos necesarios'
        }
      })
      return
    }
    const queryDefault: string = `UPDATE public.usuarios
        SET idEquipo=$2 WHERE usuarios.idUsuario =$1`

    res.status(200).json({ data: 'Usuario asignado a un grupos' })
  } catch (error) {
    console.log(error)
    res.status(505).json({ info: 'Internal error server' })
  }
}

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  // try {
  //   const idUsuario = (req.params.id)
  //   const { nombre1, nombre2, apellido1, apellido2 } = req.body
  //   let quer: string = 'UPDATE public.usuarios SET '
  //   const updateQuery = []
  //   let index = 1
  //   if (nombre1) {
  //     quer += `nombre1=$${index} ,`
  //     updateQuery.push(nombre1)
  //     index++
  //   }
  //   if (nombre2) {
  //     quer += `nombre2=$${index} ,`
  //     updateQuery.push(nombre2)
  //     index++
  //   }
  //   if (apellido1) {
  //     quer += `apellido1=$${index} ,`
  //     updateQuery.push(apellido1)
  //     index++
  //   }
  //   if (apellido2) {
  //     quer += `apellido2=$${index} ,`
  //     updateQuery.push(apellido2)
  //     index++
  //   }
  //   quer = quer.slice(0, -1)
  //   quer += `WHERE idUsuario = '${idUsuario}'`
  //   console.log(quer)

  //   console.log(updateQuery)
  //   await connect.query(quer, updateQuery)
  //   res.status(202).json({ data: 'update user succeFully' })
  // } catch (error) {
  //   console.log(error)
  //   res.status(505).json({ info: 'Internal error server' })
  // }
}

export const changePassWord = async (req: Request, res: Response): Promise<void> => {
  try {
    const idUsuario = req.params.id
    const { contra } = req.body
    const pass = await encryptPassWord(contra)
    console.log(pass)
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
