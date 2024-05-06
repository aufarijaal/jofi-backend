import { authenticatedRoleCheck } from '../../../middleware/authenticated-role-check'
import prisma from '../../../prisma/client'
import { NextFunction, Request, Response } from 'express'

export const get = [
  authenticatedRoleCheck(['EMPLOYER', 'JOBSEEKER']),
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const info = await prisma.user.findFirstOrThrow({
        where: {
          id: req.user!.id,
        },
        select: {
          profile: {
            select: {
              about: true,
            },
          },
          jobExperiences: true,
          userSkills: {
            include: {
              skill: true,
            },
            orderBy: {
              skill: {
                name: 'asc'
              }
            }
          },
          educations: true,
        },
      })

      res.send({
        data: info,
      })
    } catch (error) {
      next(error)
    }
  },
]
