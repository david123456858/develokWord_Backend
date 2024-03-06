import { verifyToken } from "../../controller/user/user"
import { Router } from "express";


const routeBase = '/api/v1/user'

const routeUser = Router()

routeUser.get(`${routeBase}/authentication`,verifyToken)

export default routeUser 