import { Response, Request } from 'express'

import { User } from '../../entity/user'
import { tokenSing } from '../../helpers/tokensHelpers'

export const createToken = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = 'LaurAltahona@gmail.com'
    const user: User = {
      user: users,
      rol: 'administrador'
    }
    const token = await tokenSing(user)
    res.status(200).json({ info: { data: token, message: 'Token Creado' } })
  } catch (error) {
    res.status(505).json({ info: 'Error internal Server' })
    console.log(error)
  }
}
