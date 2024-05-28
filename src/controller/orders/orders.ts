import { Request, Response } from 'express'

export const saveOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    // const { idOrder, estado, prioridad, id_Usuario, id_Equipo, description, TimeFinished } = req.body
    // const finishedOrder: order = {
    //   idOrder: idOrder,
    //   estado,
    //   prioridad,
    //   id_usuario: id_Usuario,
    //   id_equipo: id_Equipo,
    //   description: description,
    //   timeFinished: TimeFinished,
    // }
    // res.status(200).json(finishedOrder)
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
  // try {
  //   const query = 'SELECT * FROM prioridades'
  //   const reponse: QueryResult = await connect.query(query)
  //   res.status(200).json({ data: reponse.rows })
  // } catch (error) {
  //   console.log(error)
  //   res.status(500).json({
  //     data: {
  //       message: 'Internal Server Error',
  //       info: error
  //     }
  //   })
  // }
}
