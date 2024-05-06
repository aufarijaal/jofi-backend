import { AppError } from '../../lib/error'
import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { body, validationResult } from 'express-validator'
import prisma from '../../prisma/client'
import * as PrismaClient from '@prisma/client'
import { authenticatedRoleCheck } from '../../middleware/authenticated-role-check'

// Get job posts
export const get = [
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { q, sortBy, category } = req.query

      let dataPerPage = parseInt((req.query.dataPerPage as string) ?? '10')
      let page = parseInt((req.query.page as string) ?? '1')

      const offset = (page - 1) * dataPerPage

      const whereInput: PrismaClient.Prisma.JobWhereInput = {
        OR: [
          {
            title: {
              contains: q as string,
              mode: 'insensitive',
            },
          },
          {
            company: {
              name: {
                contains: q as string,
                mode: 'insensitive',
              },
            },
          },
        ],
      }

      if (category && (category as string) !== 'all') {
        whereInput.category = {
          slug: category as string,
        }
      }

      const orderByInput = ():
        | PrismaClient.Prisma.JobOrderByWithRelationInput
        | PrismaClient.Prisma.JobOrderByWithRelationInput[] => {
        switch (sortBy) {
          case 'highestSalary':
            return { salary: 'desc' }
          case 'recentlyPosted':
            return { createdAt: 'desc' }
          default:
            return { id: 'asc' }
        }
      }

      const count = await prisma.job
        .findMany({
          where: whereInput,
        })
        .then((d) => d.length)

      const jobPosts = await prisma.job.findMany({
        where: whereInput,
        orderBy: orderByInput(),
        skip: offset,
        take: dataPerPage,
        select: {
          id: true,
          title: true,
          salary: true,
          createdAt: true,
          location: true,
          updatedAt: true,
          companyId: true,
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
        },
      })

      jobPosts.forEach((jobPost: any) => {
        jobPost.saved = req.user?.id
          ? jobPost.savedJobs.some((app: any) => app.userId === req.user?.id)
          : false
        delete jobPost.savedJobs
      })

      const totalPages = Math.ceil(count / dataPerPage)

      res.send({
        data: {
          count,
          pagination: {
            hasNextPage: page < totalPages,
            hasPreviousPage: page > 1,
            totalPages,
            // pages:
          },
          jobPosts,
        },
      })
    } catch (error) {
      next(error)
    }
  },
]

// Create job post
export const post = [
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

      await prisma.job.create({
        data: {
          companyId: req.user?.companyId as number,
          employerId: req.user?.id as number,
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

      res.status(StatusCodes.CREATED).send()
    } catch (error) {
      next(error)
    }
  },
]
