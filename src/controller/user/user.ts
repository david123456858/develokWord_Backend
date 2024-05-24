import { QueryResult } from 'pg'
import { Request, Response } from 'express'

import { tokenSing } from '../../helpers/tokensHelpers'
import { User } from '../../entity/user'
import { db_Connect } from '../../db/db'
import { encryptPassWord, comparePassWord } from '../../helpers/encryp'

// verificar usuario

const _db = db_Connect.getIntance()
export const connect = _db.connectdb()

export const verifyUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { correo, contra } = req.body
    let response: QueryResult = await connect.query(`SELECT contraseña FROM USUARIOS WHERE 
        usuarios.correo = $1`, [correo])
    if (response.rowCount === 0) {
      res.status(404).json({
        detail: {
          info: 'Not Found',
          message: 'Usuario no encontrado'
        }
      })
      return
    }
    const { contraseña } = response.rows[0]
    if (await comparePassWord(contra, contraseña)) {
      response = await connect.query(`SELECT idUsuario,nombre1,nombre2,apellido1,apellido2,correo FROM USUARIOS WHERE 
                usuarios.correo = $1`, [correo])
      res.status(200).json({ info: { data: response.rows, message: 'Has iniciado sesión' } })
    } else {
      res.status(404).json({
        detail: {
          info: 'Not Found',
          message: 'Mala contraseña'
        }
      })
    }
  } catch (error) {
    res.status(505).json({ info: 'Error internal Server' })
    console.log(error)
  }
}

export const createToken = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = 'LaurAltahona@gmail.com'
    const user: User = {
      user: users,
      passWords: 'Berlin12345'
    }
    const token = await tokenSing(user)
    res.status(200).json({ info: { data: token, message: 'Token Creado' } })
  } catch (error) {
    res.status(505).json({ info: 'Error internal Server' })
    console.log(error)
  }
}

export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const queryDefault: string = `INSERT INTO usuarios(
            idUsuario, nombre1, nombre2, apellido1, correo, contraseña, id_rol, id_estado, apellido2)
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`
    // console.log(req.body)
    const { idUsuario, nombre1, nombre2, apellido1, apellido2, correo, contra, rol, estado } = req.body
    const password = await encryptPassWord(contra)
    // console.log(password);
    console.log('que deberia', idUsuario, nombre1, nombre2, apellido1, correo, contra, rol, estado)
    if (!idUsuario || !nombre1 || !apellido1 || !correo || !contra || !rol || !estado) {
      res.status(422).json({
        detail: {
          info: 'Unprocessable Content',
          message: 'No se han enviado todos los datos necesarios'
        }
      })
      return
    }
    const response: QueryResult = await connect.query(queryDefault,
      [idUsuario, nombre1, nombre2 ?? '', apellido1, correo, password, rol, estado, apellido2 ?? ''])
    console.log(response)
    res.status(201).json({ data: 'Se ha guardado correctamente el usuario' })
  } catch (error) {
    console.log(error)
    res.status(505).json({ info: 'Internal error server' })
  }
}

export const getAllUser = async (req: Request, res: Response): Promise<void> => {
  try {
    // Ojo que no puedes mandar todos los datos solo los pertinentes como nombres cedula
    const response: QueryResult = await connect.query(`SELECT idUsuario, nombre1, nombre2, apellido1, apellido2, id_estado, correo, roles.nombre
         FROM usuarios
        INNER JOIN roles ON usuarios.id_rol = roles.id_rol
        WHERE usuarios.id_rol = '2'`)
    console.log(response.rows)
    res.status(200).json({ data: response.rows })
  } catch (error) {
    console.log(error)
    res.status(505).json({ info: 'Internal error server' })
  }
}

export const updateUserTeams = async (req: Request, res: Response): Promise<void> => {
  try {
    const { idUsuario, idEquipo } = req.body
    console.log(idUsuario, idEquipo)
    if (!idUsuario || !idEquipo) {
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

    const response: QueryResult = await connect.query(queryDefault, [idUsuario, idEquipo])
    res.status(200).json({ data: 'Usuario asignado a un grupos' })
    console.log(response)
  } catch (error) {
    console.log(error)
    res.status(505).json({ info: 'Internal error server' })
  }
}

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const idUsuario = (req.params.id)
    const { nombre1, nombre2, apellido1, apellido2 } = req.body
    let quer: string = 'UPDATE public.usuarios SET '
    const updateQuery = []
    let index = 1
    if (nombre1) {
      quer += `nombre1=$${index} ,`
      updateQuery.push(nombre1)
      index++
    }
    if (nombre2) {
      quer += `nombre2=$${index} ,`
      updateQuery.push(nombre2)
      index++
    }
    if (apellido1) {
      quer += `apellido1=$${index} ,`
      updateQuery.push(apellido1)
      index++
    }
    if (apellido2) {
      quer += `apellido2=$${index} ,`
      updateQuery.push(apellido2)
      index++
    }
    quer = quer.slice(0, -1)
    quer += `WHERE idUsuario = '${idUsuario}'`
    console.log(quer)

    console.log(updateQuery)
    await connect.query(quer, updateQuery)
    res.status(202).json({ data: 'update user succeFully' })
  } catch (error) {
    console.log(error)
    res.status(505).json({ info: 'Internal error server' })
  }
}

export const changePassWord = async (req: Request, res: Response): Promise<void> => {
  try {
    const idUsuario = req.params.id
    const { contra } = req.body
    const pass = await encryptPassWord(contra)
    console.log(pass)
    const queryDefault: string = 'UPDATE public.usuarios SET contraseña =$2 WHERE idUsuario = $1'
    await connect.query(queryDefault, [idUsuario, pass])
    res.status(200).json({ data: 'User change succesFully passwords' })
  } catch (error) {
    console.log(error)
    res.status(505).json({ info: 'Internal error server' })
  }
}

export const getInfo = async (res: Response): Promise<void> => {
  try {
    const responseR: QueryResult = await connect.query('SELECT * FROM roles')
    const responseE: QueryResult = await connect.query('SELECT * FROM estados')
    res.status(200).json({
      data: {
        roles: responseR.rows,
        estados: responseE.rows
      }
    })
  } catch (error) {
    console.log(error)
    res.status(505).json({ info: 'Internal error server' })
  }
}
