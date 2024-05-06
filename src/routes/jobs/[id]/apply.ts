import { NextFunction, Request, Response } from 'express'
import { authenticatedRoleCheck } from '../../../middleware/authenticated-role-check'
import prisma from '../../../prisma/client'
import { StatusCodes } from 'http-status-codes'

export const post = [
  authenticatedRoleCheck(['JOBSEEKER']),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await prisma.application.create({
        data: {
          jobId: parseInt(req.params.id),
          userId: req.user!.id,
        },
      })

      res.status(StatusCodes.CREATED).send()
    } catch (error) {
      next(error)
    }
  },
]
