import * as jwt from 'jsonwebtoken'
import { config } from 'dotenv'
import { User } from '../model/user'


config()

if (!process.env.PASSWORDTOKEN) {
    throw new Error
}

const processToken = process.env.PASSWORDTOKEN

export const tokenSing = async (user:User) => {
    try {
        return jwt.sign({
            user: user.user,
            password: user.passWords
        }, processToken, {
            expiresIn: '1h'
        }
        )
    } catch (error) {
        throw new Error
    }
}