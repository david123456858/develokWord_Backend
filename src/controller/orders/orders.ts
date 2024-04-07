import { Request, Response } from "express"
import { order } from "../../interface/order"

export const saveOrders = (req: Request, res: Response) => {
    const { idOrder, estado, prioridad, id_Usuario, id_Equipo, description, TimeFinished } = req.body
    const finishedOrder: order ={
        idOrder: idOrder,
        estado,
        prioridad,
        id_usuario: id_Usuario,
        id_equipo:id_Equipo,
        description: description,
        timeFinished: TimeFinished,
      }
}
// INSERT INTO public."ordenes "(
// 	id_orden, comentarios, id_equipo, id_prioridad)
// 	VALUES (?, ?, ?, ?);