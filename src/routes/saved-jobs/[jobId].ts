import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import prisma from '../../prisma/client'
import { authenticatedRoleCheck } from '../../middleware/authenticated-role-check'

export const del = [
  authenticatedRoleCheck(['JOBSEEKER']),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await prisma.savedJob.deleteMany({
        where: {
          jobId: parseInt(req.params.jobId),
          userId: req.user!.id,
        },
      })

      res.status(StatusCodes.NO_CONTENT).send()
    } catch (error) {
      next(error)
    }
  },
]
