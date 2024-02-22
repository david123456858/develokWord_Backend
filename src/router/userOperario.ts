import { Request, Response, Router } from "express";

const route = Router()
const _pathBasic = "/basic"

route.get(`${_pathBasic}`,(req:Request,res:Response)=>{ res.json({data:"bueno esto esta melo"})})

export default route