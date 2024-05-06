import { AppError } from '../../../lib/error'
import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import prisma from '../../../prisma/client'
import { body, validationResult } from 'express-validator'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { authenticatedRoleCheck } from '../../../middleware/authenticated-role-check'

export const put = [
  authenticatedRoleCheck(['EMPLOYER', 'ADMIN']),
  body('jobCategoryId').exists().isNumeric(),
  body('title').exists().notEmpty(),
  body('description').exists(),
  body('requirements').exists().isArray({ min: 1 }),
  body('salary').exists().isNumeric(),
  body('location').exists().notEmpty(),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = validationResult(req)
      if (!result.isEmpty()) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .send({ errors: result.array() })
      }

      await prisma.job.update({
        where: {
          id: parseInt(req.params.id),
        },
        data: {
          companyId: req.user?.companyId,
          employerId: req.user?.id,
          jobCategoryId: parseInt(req.body.jobCategoryId),
          title: req.body.title,
          description: req.body.description,
          requirements: req.body.requirements
            .map((r: { requirement: string }) => r.requirement)
            .join('~'),
          salary: req.body.salary,
          location: req.body.location,
        },
      })

      res.send()
    } catch (error) {
      next(error)
    }
  },
]

export const del = [
  authenticatedRoleCheck(['EMPLOYER', 'ADMIN']),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await prisma.job.delete({
        where: {
          id: parseInt(req.params.id),
        },
      })

      res.status(StatusCodes.NO_CONTENT).send()
    } catch (error) {
      next(error)
    }
  },
]

export const get = [
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const job = await prisma.job.findFirstOrThrow({
        where: {
          id: parseInt(req.params.id),
        },
        include: {
          category: {
            select: {
              name: true,
              slug: true,
            },
          },
          company: {
            select: {
              name: true,
              logo: true,
              slug: true,
            },
          },
          savedJobs: {
            select: {
              userId: true,
            },
          },
          applications: {
            select: {
              userId: true,
            },
          },
        },
      })

      const relatedJobs = await prisma.job.findMany({
        where: {
          jobCategoryId: job.jobCategoryId,
        },
        include: {
          company: {
            select: {
              name: true,
              slug: true,
              logo: true,
            },
          },
          savedJobs: {
            select: {
              userId: true,
            },
          },
        },
        take: 3,
      })

      const moreFromCompany = await prisma.job.findMany({
        where: {
          companyId: job.companyId,
          NOT: {
            id: parseInt(req.params.id),
          },
        },
        include: {
          company: {
            select: {
              name: true,
              slug: true,
              logo: true,
            },
          },
          savedJobs: {
            select: {
              userId: true,
            },
          },
        },
        take: 3,
      })

      ;(job as any).saved = req.user?.id
        ? (job as any).savedJobs.some(
            (savedJob: any) => savedJob.userId === req.user?.id
          )
        : false
      ;(job as any).applied = req.user?.id
        ? (job as any).applications.some(
            (application: any) => application.userId === req.user?.id
          )
        : false
      delete (job as any).savedJobs
      delete (job as any).applications

      moreFromCompany.forEach((jobPost: any) => {
        jobPost.saved = req.user?.id
          ? jobPost.savedJobs.some(
              (savedJob: any) => savedJob.userId === req.user?.id
            )
          : false
        delete jobPost.savedJobs
      })

      relatedJobs.forEach((jobPost: any) => {
        jobPost.saved = req.user?.id
          ? jobPost.savedJobs.some(
              (savedJob: any) => savedJob.userId === req.user?.id
            )
          : false
        delete jobPost.savedJobs
      })

      res.send({
        data: {
          detail: job,
          relatedJobs,
          moreFromCompany,
        },
      })
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025' &&
        error.name === 'NotFoundError'
      ) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .send({ message: 'Job post not found' })
      }

      next(error)
    }
  },
]
