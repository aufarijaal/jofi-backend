import { NextFunction, Request, Response } from 'express'
import prisma from '../../prisma/client'
import { authenticatedRoleCheck } from '../../middleware/authenticated-role-check'

export const get = [
  authenticatedRoleCheck(['EMPLOYER']),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const applications = await prisma.application.count({
        where: {
          job: {
            companyId: req.user?.companyId,
          },
        },
      })

      const jobs = await prisma.job.count({
        where: {
          companyId: req.user?.companyId,
        },
      })

      const hiredSuccess = await prisma.application.count({
        where: {
          status: {
            equals: 'APPROVED',
          },
        },
      })

      res.send({
        data: {
          applications,
          jobs,
          hiredSuccess,
        },
      })
    } catch (error) {
      next(error)
    }
  },
]
