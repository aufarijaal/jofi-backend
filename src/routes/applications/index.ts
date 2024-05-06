import { NextFunction, Request, Response } from 'express'
import prisma from '../../prisma/client'
import { authenticatedRoleCheck } from '../../middleware/authenticated-role-check'

export const get = [
  authenticatedRoleCheck(['JOBSEEKER']),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const appliedJobs = await prisma.application.findMany({
        where: {
          userId: req.user?.id,
        },
        include: {
          job: {
            include: {
              company: {
                select: {
                  logo: true,
                  name: true,
                  slug: true,
                },
              },
            },
          },
        },
      })

      res.send({
        data: appliedJobs,
      })
    } catch (error) {
      next(error)
    }
  },
]
