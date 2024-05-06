import { NextFunction, Request, Response } from 'express'
import prisma from '../../prisma/client'
import { StatusCodes } from 'http-status-codes'
import bcrypt from 'bcryptjs'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { check, validationResult } from 'express-validator'
import { authenticatedRoleCheck } from '../../middleware/authenticated-role-check'

// Create user by admin
export const post = [
  authenticatedRoleCheck(['ADMIN']),
  check('name').exists().isString().trim().isLength({ min: 1 }),
  check('email').exists().isEmail().trim(),
  check('password').exists().isLength({ min: 3 }),
  check('isEmployer').isBoolean().optional(),
  check('companyId').isNumeric().optional({ values: 'null' }),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = validationResult(req)
      if (!result.isEmpty()) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .send({ errors: result.array() })
      }

      const { name, email, password, isEmployer, companyId } = req.body
      await prisma.user.create({
        data: {
          email,
          password: bcrypt.hashSync(password, 10),
          isEmployer,
          employerVerified: isEmployer,
          companyId: parseInt(companyId) ?? null,
          profile: {
            create: {
              name,
            },
          },
        },
      })

      res.status(StatusCodes.CREATED).send()
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          return res
            .status(StatusCodes.BAD_REQUEST)
            .send({ message: 'Email already exists' })
        }
      }

      next(error)
    }
  },
]
