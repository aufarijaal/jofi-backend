import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import jwt from 'jsonwebtoken'
import tokenUtil from '../lib/token'
import { cookieOptions } from '../lib/cookie-options'
import dayjs from 'dayjs'

export const post = [
  async function (req: Request, res: Response, next: NextFunction) {
    console.log(`kadaluarsa nih. minta lagi dong.`)
    res.send()
    // try {
    //   const { refresh } = req.body

    //   jwt.verify(
    //     refresh,
    //     process.env.JWT_REFRESH_SECRET as string,
    //     function (err: any, decoded: any) {
    //       if (err) {
    //         return res
    //           .status(StatusCodes.UNAUTHORIZED)
    //           .send({ message: 'Unauthorized' })
    //       }

    //       delete decoded.iat
    //       delete decoded.exp

    //       const token = tokenUtil.generate.accessToken(decoded)

    //       res.cookie('accessToken', token, {
    //         ...cookieOptions,
    //         maxAge: 7 * 24 * 60 * 60 * 1000,
    //       })

    //       res.cookie(
    //         'test',
    //         JSON.stringify({
    //           message: 'Hey you are refreshing the token!',
    //           date: dayjs().format('dddd, DD MMMM YYYY at HH:mm:ss'),
    //         }),
    //         {
    //           ...cookieOptions,
    //           maxAge: 7 * 24 * 60 * 60 * 1000,
    //         }
    //       )

    //       return res.send({
    //         accessToken: token,
    //       })
    //     }
    //   )
    // } catch (error) {
    //   next(error)
    // }
  },
]
