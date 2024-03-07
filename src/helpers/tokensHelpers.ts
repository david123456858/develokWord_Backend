import * as jwt from 'jsonwebtoken'
import { config } from 'dotenv'
import { User } from '../model/user'


config()

if (!process.env.PASSWORDTOKEN) {
    throw new Error
}

declare module 'jsonwebtoken' {
    export interface myJwtRol extends jwt.JwtPayload {
        user: string
    }
}
const processToken = process.env.PASSWORDTOKEN

export const tokenSing = async (user: User) => {
    try {
        return jwt.sign({
            user: user.user,
            passWords: user.passWords
        }, processToken, {
            expiresIn: '12h'
        }
        )
    } catch (error) {
        throw new Error
    }
}
export const userFrom = (jsonwebtoken: string): User | undefined => {
    try {
        const { user, passWords } = <jwt.myJwtRol>jwt.verify(jsonwebtoken, processToken)
        const fromuser: User = {
            user: user,
            passWords: passWords
        }
        return fromuser
    } catch (error) {
        console.log("aqui esta el error " + error)
    }
}