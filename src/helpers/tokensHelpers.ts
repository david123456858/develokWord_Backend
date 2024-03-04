import * as jwt from 'jsonwebtoken'
import { config } from 'dotenv'


config()

if (!process.env.PASSWORDTOKEN) {
    throw new Error
}

const processToken = process.env.PASSWORDTOKEN

export const tokenSing = async (user: string) => {
    try {
        return jwt.sign({
            user: user
        }, processToken, {
            expiresIn: '1h'
        }
        )
    } catch (error) {
        throw new Error
    }
}