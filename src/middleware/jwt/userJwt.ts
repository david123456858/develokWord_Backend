import { NextFunction, Request, Response } from "express";
import { userFrom } from "../../helpers/tokensHelpers";



export const checkJwt = (req: Request, res: Response, next: NextFunction) => {

    try {
        const token = req.headers.authorization
        if (!token) {
            return res.status(401).json({ data: "not found token" })
        }
        const decode = token?.split(' ').pop()
        const verify = decode ? decode : ''
        const newDecode = userFrom(verify)
        req.body = newDecode ? newDecode : undefined
        next()

    } catch (error) {
        console.log("bueno paso fue aqui " + error)
    }
}