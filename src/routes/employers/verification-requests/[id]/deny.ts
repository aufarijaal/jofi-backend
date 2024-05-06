import { NextFunction, Request, Response } from 'express'
import prisma from '../../../../prisma/client'
import { authenticatedRoleCheck } from '../../../../middleware/authenticated-role-check'

export const del = [
  authenticatedRoleCheck(['ADMIN']),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params

      await prisma.user.delete({
        where: {
          id: parseInt(id),
          isEmployer: true,
          employerVerified: false,
        },
      })

      res.send()
    } catch (error) {
      next(error)
    }
  },
]
