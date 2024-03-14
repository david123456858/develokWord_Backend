import { createToken, createUser, getAllUser, verifyUser } from "../../controller/user/user"
import { Router } from "express";
import { checkJwt } from "../../middleware/jwt/userJwt";


const routeBase = '/api/v1/user' 

const routeUser = Router()

routeUser.get(`${routeBase}/login`, checkJwt,verifyUser)
routeUser.get(`${routeBase}/create`,createToken)
routeUser.post(`${routeBase}/createUser`,createUser)
routeUser.get(`${routeBase}/getUsers`,getAllUser)
export default routeUser 