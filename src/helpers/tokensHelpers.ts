import * as jwt from 'jsonwebtoken'
import { config } from 'dotenv'
import { User } from '../entity/user'

config()

const { PASSWORDTOKEN } = process.env

declare module 'jsonwebtoken' {
  export interface myJwtRol extends jwt.JwtPayload {
    user: string
  }
}

export const tokenSing = async (user: User): Promise<any> => {
  try {
    return jwt.sign({
      user: user.user,
      rol: user.rol
    }, PASSWORDTOKEN as string, {
      expiresIn: '1h'
    }
    )
  } catch (error) {
    throw new Error()
  }
}
export const userFrom = (jsonwebtoken: string): jwt.myJwtRol => {
  try {
    const data = jwt.verify(jsonwebtoken, PASSWORDTOKEN as string) as jwt.myJwtRol // se convierte en el tipo
    return data
  } catch (error) {
    console.log(error)
    throw new Error()
  }
}
