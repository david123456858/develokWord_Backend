import { Request, Response } from "express";
import { tokenSing } from "../../helpers/tokensHelpers";
import { User } from "../../model/user";

//verificar usuario 

export const verifyToken = async (req:Request,res:Response)=>{
    console.log(req.body)
    const user:User={
        user:"kadir",
        passWords:"ayValentina"
    }
    const token = await tokenSing(user)
    res.json({data:token})
}