import { authenticatedRoleCheck } from '../../../middleware/authenticated-role-check'
import { emailMustAvailable } from '../../../middleware/email-must-available'
import prisma from '../../../prisma/client'
import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

export const put = [
  authenticatedRoleCheck(['EMPLOYER', 'JOBSEEKER']),
  emailMustAvailable,
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      await prisma.user.update({
        where: {
          id: req.user!.id,
        },
        data: {
          email: req.body.email as string,
        },
      })

      res.send()
    } catch (error) {
      next(error)
    }
  },
]
