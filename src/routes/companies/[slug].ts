import { NextFunction, Request, Response } from 'express'
import prisma from '../../prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { StatusCodes } from 'http-status-codes'

export const get = [
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const company = await prisma.company.findFirstOrThrow({
        where: {
          slug: req.params.slug as string,
        },
        select: {
          id: true,
          name: true,
          logo: true,
          slug: true,
          about: true,
          industry: true,
          location: true,
          jobs: {
            include: {
              savedJobs: {
                select: {
                  userId: true,
                },
              },
            },
            take: 3,
          },
        },
      })

      company.jobs.forEach((job) => {
        ;(job as any).saved = job.savedJobs.some(
          (savedJob) => savedJob.userId === req.user!.id
        )
        delete (job as any).savedJobs
      })

      res.send({
        data: company,
      })
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025' &&
        error.name === 'NotFoundError'
      ) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .send({ message: 'Company not found' })
      }

      next(error)
    }
  },
]
