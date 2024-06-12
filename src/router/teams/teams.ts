import { Router } from 'express'
import { createTeams, getAll, getIdTeam, updateTeams } from '../../controller/teams/teams'

const routeBaseTeams: string = '/api/v1/teams'

const routeTeams = Router()

routeTeams.post(`${routeBaseTeams}/createTeams`, createTeams)
routeTeams.get(`${routeBaseTeams}`, getAll)
routeTeams.get(`${routeBaseTeams}/:id`, getIdTeam)
routeTeams.put(`${routeBaseTeams}/updateTeams`, updateTeams)

export default routeTeams
