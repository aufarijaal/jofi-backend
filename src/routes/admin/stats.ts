import { NextFunction, Request, Response } from 'express'
import prisma from '../../prisma/client'
import { authenticatedRoleCheck } from '../../middleware/authenticated-role-check'

export const get = [
  authenticatedRoleCheck(['ADMIN']),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const companies = await prisma.company.count()
      const users = await prisma.user.count()
      const jobCategories = await prisma.jobCategory.count()

      res.send({
        data: {
          companies,
          users,
          jobCategories,
        },
      })
    } catch (error) {
      next(error)
    }
  },
]
