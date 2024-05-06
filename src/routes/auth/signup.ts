import { check, validationResult } from 'express-validator'
import { StatusCodes } from 'http-status-codes'
import { cookieOptions } from '../../lib/cookie-options'
import authService from '../../services/auth-service'
import { NextFunction, Request, Response } from 'express'
import { Prisma } from '@prisma/client'
import { emailMustAvailable } from '../../middleware/email-must-available'

export const post = [
  check('name').notEmpty().isString().trim(),
  check('email').notEmpty().isString().isEmail().trim(),
  check('password').notEmpty().isString(),
  emailMustAvailable,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = validationResult(req)
      if (!result.isEmpty()) {
        return res
          .status(StatusCodes.UNPROCESSABLE_ENTITY)
          .send({ errors: result.array() })
      }

      const { name, email, password } = req.body

      const { refreshToken, accessToken } = await authService.signup(
        name,
        email,
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
      res.send({ message: 'Signed up successfully', accessToken, refreshToken })
    } catch (error: any | Prisma.PrismaClientKnownRequestError) {
      if (error && error.meta.target[0] === 'email') {
        return res
          .status(StatusCodes.CONFLICT)
          .json({ message: 'Email already taken' })
      }

      next(error)
    }
  },
]
