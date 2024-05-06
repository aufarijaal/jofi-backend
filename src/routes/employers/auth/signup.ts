import { check, validationResult } from 'express-validator'
import { StatusCodes } from 'http-status-codes'
import { cookieOptions } from '../../../lib/cookie-options'
import authService from '../../../services/auth-service'
import { AppError } from '../../../lib/error'
import { NextFunction, Request, Response } from 'express'
import { Prisma } from '@prisma/client'

export const post = [
  check('name').notEmpty().isString().trim(),
  check('email').notEmpty().isString().isEmail().trim(),
  check('password').notEmpty().isString(),
  check('companyId').notEmpty().isNumeric(),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = validationResult(req)
      if (!result.isEmpty()) {
        return res
          .status(StatusCodes.UNPROCESSABLE_ENTITY)
          .send({ errors: result.array() })
      }

      const { email, password, companyId } = req.body

      await authService.employerSignup(email, password, parseInt(companyId))

      res.send({
        message: 'Sign up success, contact admin for account verification',
      })
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
