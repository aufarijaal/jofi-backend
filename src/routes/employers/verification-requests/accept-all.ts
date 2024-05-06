import { NextFunction, Request, Response } from 'express'
import prisma from '../../../prisma/client'
import { authenticatedRoleCheck } from '../../../middleware/authenticated-role-check'

export const put = [
  authenticatedRoleCheck(['ADMIN']),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await prisma.user.updateMany({
        where: {
          isEmployer: true,
          employerVerified: false,
        },
        data: {
          employerVerified: true,
        },
      })

      res.send()
    } catch (error) {
      next(error)
    }
  },
]
