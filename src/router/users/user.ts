import { Router } from 'express'

import { createUser, getAllUser, updateUserTeams, verifyUser, changePassWord, getInfo, updateUser } from '../../controller/user/user'
import { createToken } from '../../controller/tokens/tokens'
const routeBase = '/api/v1/user'

const routeUser = Router()

routeUser.get(`${routeBase}/getAtri`, getInfo)
routeUser.post(`${routeBase}`, createUser)// crear usuario
routeUser.post(`${routeBase}/login`, verifyUser)// loggearte
routeUser.get(`${routeBase}/create`, createToken)// ESTO NO TE IMPORTA SAPO
routeUser.get(`${routeBase}/getUsers`, getAllUser)// trae a todo los mmguevo
routeUser.put(`${routeBase}/updateTeams`, updateUserTeams)
routeUser.put(`${routeBase}/newPass/:id`, changePassWord)
routeUser.put(`${routeBase}/updateUser`, updateUser)

export default routeUser
