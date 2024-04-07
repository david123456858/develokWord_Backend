import { Request, Response } from "express"
import { order } from "../../interface/order"
import { QueryResult } from "pg"
import { connect } from "../user/user"

export const saveOrders = (req: Request, res: Response) => {
  try {
    const { idOrder, estado, prioridad, id_Usuario, id_Equipo, description, TimeFinished } = req.body
    const finishedOrder: order = {
      idOrder: idOrder,
      estado,
      prioridad,
      id_usuario: id_Usuario,
      id_equipo: id_Equipo,
      description: description,
      timeFinished: TimeFinished,
    }
    res.status(200).json(finishedOrder)
  } catch (error) {
    res.status(500).json({
      data: {
        message: "Internal Server Error",
        info: error
      }
    })
  }
}
export const getPrioridades = async (req: Request, res: Response) => {
  try {
    const query = `SELECT * FROM prioridades`
    const reponse: QueryResult = await connect.query(query)
    res.status(200).json(reponse.rows)
  } catch (error) {
    res.status(500).json({
      data: {
        message: "Internal Server Error",
        info: error
      }
    })
  }

}
// INSERT INTO public.prioridades(id_prioridad, nombre)VALUES ('2', 'media');