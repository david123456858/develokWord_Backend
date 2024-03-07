import { createToken, verifyUser } from "../../controller/user/user"
import { Router } from "express";
import { checkJwt } from "../../middleware/jwt/userJwt";


const routeBase = '/api/v1/user' 

const routeUser = Router()

routeUser.get(`${routeBase}/aut`, checkJwt,verifyUser)
routeUser.get(`${routeBase}/create`,createToken)
export default routeUser 