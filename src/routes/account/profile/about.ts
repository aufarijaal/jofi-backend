import { body } from 'express-validator'
import { authenticatedRoleCheck } from '../../../middleware/authenticated-role-check'
import prisma from '../../../prisma/client'
import { NextFunction, Request, Response } from 'express'

export const put = [
  authenticatedRoleCheck(['EMPLOYER', 'JOBSEEKER']),
  body('about').exists().isLength({ max: 300 }),
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      await prisma.user.update({
        where: {
          id: req.user!.id,
        },
        data: {
          profile: {
            update: {
              about: req.body.about,
            },
          },
        },
      })

      res.send()
    } catch (error) {
      next(error)
    }
  },
]
