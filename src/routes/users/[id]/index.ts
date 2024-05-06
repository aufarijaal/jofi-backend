import { NextFunction, Request, Response } from 'express'
import prisma from '../../../prisma/client'
import { StatusCodes } from 'http-status-codes'
import bcrypt from 'bcryptjs'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { check, validationResult } from 'express-validator'
import { authenticatedRoleCheck } from '../../../middleware/authenticated-role-check'

// Update user by admin
export const put = [
  authenticatedRoleCheck(['ADMIN']),
  check('name').exists().isString().trim().isLength({ min: 1 }),
  check('email').exists().isEmail().trim(),
  check('isEmployer').isBoolean().optional(),
  check('companyId').isNumeric().optional({ nullable: true }),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = validationResult(req)
      if (!result.isEmpty()) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .send({ errors: result.array() })
      }

      const { name, email, isEmployer, companyId } = req.body
      const { id } = req.params

      await prisma.user.update({
        where: {
          id: parseInt(id),
        },
        data: {
          email,
          isEmployer,
          employerVerified: isEmployer,
          companyId: companyId === null ? null : parseInt(companyId),
          profile: {
            update: {
              name,
            },
          },
        },
      })

      res.send()
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

export const del = [
  authenticatedRoleCheck(['ADMIN']),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params

      await prisma.user.delete({
        where: {
          id: parseInt(id),
        },
      })

      res.status(StatusCodes.NO_CONTENT).send()
    } catch (error) {
      next(error)
    }
  },
]
