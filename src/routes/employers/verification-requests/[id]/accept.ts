import { NextFunction, Request, Response } from 'express'
import prisma from '../../../../prisma/client'
import { authenticatedRoleCheck } from '../../../../middleware/authenticated-role-check'

export const put = [
  authenticatedRoleCheck(['ADMIN']),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params

      await prisma.user.update({
        where: {
          id: parseInt(id),
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
