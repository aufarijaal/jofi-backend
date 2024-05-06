import { check, validationResult } from 'express-validator'
import { StatusCodes } from 'http-status-codes'
import { cookieOptions } from '../../../lib/cookie-options'
import authService from '../../../services/auth-service'
import { AppError } from '../../../lib/error'
import { NextFunction, Request, Response } from 'express'

export const post = [
  check('username').notEmpty().isString().trim(),
  check('password').notEmpty().isString(),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = validationResult(req)
      if (!result.isEmpty()) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .send({ errors: result.array() })
      }

      const { username, password } = req.body

      const { accessToken, refreshToken } = await authService.adminSignin(
        username,
        password
      )

      res.cookie('accessToken', accessToken, {
        ...cookieOptions,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      res.cookie('refreshToken', refreshToken, {
        ...cookieOptions,
        maxAge: 365 * 24 * 60 * 60 * 1000,
      })

      res.send({ message: 'Signed in successfully', accessToken, refreshToken })
    } catch (error: any) {
      if (error && error.name === 'NotFoundError') {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: 'Account not found' })
      } else if (error instanceof AppError) {
        return res.status(error.statusCode).send({ message: error.message })
      }

      next(error)
    }
  },
]
