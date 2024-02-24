import { Request, Response, Router } from "express";

const routes = Router()
const _pathBasic = "/basic"

routes.get(`${_pathBasic}`, (req: Request, res: Response) => { res.json({ data: "bueno esto esta melo" }) })

export default routes