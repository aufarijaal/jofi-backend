import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import prisma from '../../prisma/client'
import { authenticatedRoleCheck } from '../../middleware/authenticated-role-check'

export const get = [
  authenticatedRoleCheck(['JOBSEEKER']),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const savedJobs = await prisma.savedJob.findMany({
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
        data: savedJobs,
      })
    } catch (error) {
      next(error)
    }
  },
]

export const post = [
  authenticatedRoleCheck(['JOBSEEKER']),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { jobId } = req.body

      await prisma.savedJob.create({
        data: {
          jobId: parseInt(jobId),
          userId: req.user!.id,
        },
      })

      res.status(StatusCodes.CREATED).send()
    } catch (error) {
      next(error)
    }
  },
]
