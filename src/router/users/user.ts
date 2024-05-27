import { Router } from 'express'

import { createUser, getAllUser, updateUserTeams, verifyUser, updateUser, changePassWord, getInfo } from '../../controller/user/user'
import { createToken } from '../../controller/tokens/tokens'
const routeBase = '/api/v1/user'

const routeUser = Router()

routeUser.get(`${routeBase}/getAtri`, getInfo)
routeUser.post(`${routeBase}`, createUser)// crear usuario
routeUser.get(`${routeBase}/login`, verifyUser)// loggearte
routeUser.get(`${routeBase}/create`, createToken)// ESTO NO TE IMPORTA SAPO
routeUser.get(`${routeBase}/getUsers`, getAllUser)//
routeUser.put(`${routeBase}/updateTeams`, updateUserTeams)
routeUser.put(`${routeBase}/updateUser/:id`, updateUser)
routeUser.put(`${routeBase}/newPass/:id`, changePassWord)

export default routeUser
