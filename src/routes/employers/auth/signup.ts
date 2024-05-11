import { check, validationResult } from 'express-validator'
import { StatusCodes } from 'http-status-codes'
import { cookieOptions } from '../../../lib/cookie-options'
import authService from '../../../services/auth-service'
import { AppError } from '../../../lib/error'
import { NextFunction, Request, Response } from 'express'
import { Prisma } from '@prisma/client'
import prisma from '../../../prisma/client'

export const post = [
  check('name').notEmpty().isString().trim(),
  check('email').notEmpty().isString().isEmail().trim(),
  check('password').notEmpty().isString(),
  check('companyId').notEmpty().isNumeric().isLength({ min: 1 }),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = validationResult(req)
      if (!result.isEmpty()) {
        return res
          .status(StatusCodes.UNPROCESSABLE_ENTITY)
          .send({ errors: result.array() })
      }

      const { email, password, companyId } = req.body

      const employer = await prisma.user.findFirst({
        where: {
          email,
          employerVerified: false,
          companyId
        }
      })

      if(employer) {
        return res.status(StatusCodes.BAD_REQUEST).send({message: "Your account already created but not verified yet, please contact JoFi admin for employer account verification."})
      }

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
