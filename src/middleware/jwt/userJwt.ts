import { NextFunction, Request, Response } from 'express'
import { userFrom } from '../../helpers/tokensHelpers'

// fuera de servicio por ahora

export const checkJwt = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const token = req.headers.authorization
    if (token === null) {
      res.status(401).json({ data: 'not found token' })
      return
    }
    const decode = token?.split(' ').pop()
    const verify = decode ?? ''
    const newDecode = userFrom(verify)
    if (newDecode === null) {
      res.status(401).json({ error: 'Undefined' })
      return
    }
    req.body = newDecode ?? undefined
    next()
  } catch (error) {
    console.log(error)
    console.log('Here')
  }
}
