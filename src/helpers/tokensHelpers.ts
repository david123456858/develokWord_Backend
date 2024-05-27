import * as jwt from 'jsonwebtoken'
import { config } from 'dotenv'
import { User } from '../entity/user'

config()

if (process.env.PASSWORDTOKEN === null) {
  throw new Error()
}

declare module 'jsonwebtoken' {
  export interface myJwtRol extends jwt.JwtPayload {
    user: string
  }
}
const processToken = process.env.PASSWORDTOKEN !== undefined ? process.env.PASSWORDTOKEN : ''

export const tokenSing = async (user: User): Promise<any> => {
  try {
    return jwt.sign({
      user: user.user,
      rol: user.rol
    }, processToken, {
      expiresIn: '1h'
    }
    )
  } catch (error) {
    throw new Error()
  }
}
export const userFrom = (jsonwebtoken: string): User | undefined => {
  try {
    const { user, rol } = jwt.verify(jsonwebtoken, processToken) as jwt.myJwtRol
    const fromuser: User = {
      user,
      rol
    }
    return fromuser
  } catch (error) {
    console.log(error)
    throw new Error()
  }
}
