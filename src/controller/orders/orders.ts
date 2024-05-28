import { Request, Response } from 'express'
import { prioridades } from '../../entity/priority'
import { ordenes } from '../../entity/orders'

export const saveOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const { idOrder, prioridad, idUsuario, idEquipo, descripcion, tiempoFinal, tiempoInicio } = req.body
    const orden = new ordenes()
    orden.id_orden = idOrder
    orden.prioridades = prioridad
    orden.usuario = idUsuario
    orden.equipo = idEquipo
    orden.comentarios = descripcion
    orden.fecha_finalizacion = tiempoFinal
    orden.fecha_inicio = tiempoInicio
    await orden.save()
    res.status(202).json({ message: 'Created Orders sucessfully' })
  } catch (error) {
    res.status(500).json({
      data: {
        message: 'Internal Server Error',
        info: error
      }
    })
  }
}
export const getPrioridades = async (req: Request, res: Response): Promise<void> => {
  try {
    const reponse = prioridades.find()
    res.status(200).json({ data: reponse })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      data: {
        message: 'Internal Server Error',
        info: error
      }
    })
  }
}
export const getAllOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const orden = await ordenes.find({
      relations: {
        equipo: true,
        prioridades: true,
        usuario: true
      }
    })
    res.status(200).json({ data: orden })
  } catch (error) {
    console.log(error)
    res.status(505).json({ error: 'error internal server' })
  }
}
