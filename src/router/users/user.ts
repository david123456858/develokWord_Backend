import { createToken, createUser, getAllUser, updateUserTeams, verifyUser, updateUser } from "../../controller/user/user"
import { Router } from "express";
import { checkJwt } from "../../middleware/jwt/userJwt";


const routeBase = '/api/v1/user'

const routeUser = Router()

routeUser.get(`${routeBase}/login`, checkJwt, verifyUser)
routeUser.get(`${routeBase}/create`, createToken)
routeUser.post(`${routeBase}/createUser`, createUser)
routeUser.get(`${routeBase}/getUsers`, getAllUser)
routeUser.put(`${routeBase}/update`, updateUserTeams)
routeUser.put(`${routeBase}/updateUser/:id`, updateUser)

export default routeUser 