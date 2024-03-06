import { createToken, verifyToken } from "../../controller/user/user"
import { Router } from "express";


const routeBase = '/api/v1/user'

const routeUser = Router()

routeUser.get(`${routeBase}/aut`, verifyToken)
routeUser.get(`${routeBase}/create`,createToken)
export default routeUser 