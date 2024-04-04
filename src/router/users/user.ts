import { createToken, createUser, getAllUser, updateUserTeams, verifyUser, updateUser,changePassWord } from "../../controller/user/user"
import { Router } from "express";
import { checkJwt } from "../../middleware/jwt/userJwt";


const routeBase = '/api/v1/user'

const routeUser = Router() 

routeUser.post(`${routeBase}/createUser`, createUser)//crear usuario
routeUser.get(`${routeBase}/login`, checkJwt, verifyUser)//loggearte
routeUser.get(`${routeBase}/create`, createToken)//ESTO NO TE IMPORTA SAPO
routeUser.get(`${routeBase}/getUsers`, getAllUser)//
routeUser.put(`${routeBase}/update`, updateUserTeams)
routeUser.put(`${routeBase}/updateUser/:id`, updateUser)
routeUser.put(`${routeBase}/newPass/:id`,changePassWord)

export default routeUser 