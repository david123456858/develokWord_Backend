import { Router } from "express";
import { createTeams, getAll } from "../../controller/teams/teams";

const routeBaseTeams: String = '/api/v1/teams'

const routeTeams = Router()

routeTeams.post(`${routeBaseTeams}/createTeams`, createTeams)
routeTeams.get(`${routeBaseTeams}`, getAll)
routeTeams.put(`${routeBaseTeams}/updateTeams`)

export default routeTeams