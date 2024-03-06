import { Request, Response, query } from "express";
import { tokenSing } from "../../helpers/tokensHelpers";
import { User } from "../../model/user";
import { db_Connect } from "../../db/db";

//verificar usuario 

const _db = db_Connect.getIntance()

export const verifyToken = async (req: Request, res: Response) => {
    try {
        console.log(req.body)
        const connect = await _db.connectdb()
        
        
    } catch (error) {

    }



}

export const createToken = async (req: Request, res: Response) => {
    try {
        const user: User = {
            user: "kadir",
            passWords: "ayValentina"
        }
        const token = await tokenSing(user)
        res.json({ data: token })
    } catch (error) {
        throw new Error
    }
}