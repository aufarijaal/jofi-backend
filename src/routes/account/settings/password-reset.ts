import { authenticatedRoleCheck } from '../../../middleware/authenticated-role-check'
import prisma from '../../../prisma/client'
import { NextFunction, Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import { StatusCodes } from 'http-status-codes'
import { body } from 'express-validator'

export const put = [
  authenticatedRoleCheck(['EMPLOYER', 'JOBSEEKER']),
  body('currentPassword').exists().isString().isLength({ min: 3 }),
  body('newPassword').exists().isString().isLength({ min: 3 }),
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const user = await prisma.user.findFirstOrThrow({
        where: {
          id: req.user!.id,
        },
      })

      if (!bcrypt.compareSync(req.body.currentPassword, user.password)) {
        return res
          .status(StatusCodes.UNPROCESSABLE_ENTITY)
          .send({ message: 'Current password is incorrect' })
      }

      await prisma.user.update({
        where: {
          id: req.user!.id,
        },
        data: {
          password: bcrypt.hashSync(req.body.newPassword, 10),
        },
      })

      res.send()
    } catch (error) {
      next(error)
    }
  },
]
