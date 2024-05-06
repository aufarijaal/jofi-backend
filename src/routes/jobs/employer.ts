import { AppError } from '../../lib/error'
import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import prisma from '../../prisma/client'
import * as PrismaClient from '@prisma/client'
import { authenticatedRoleCheck } from '../../middleware/authenticated-role-check'

export const get = [
  authenticatedRoleCheck(['EMPLOYER']),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { q, sortBy } = req.query

      let dataPerPage = parseInt(req.query.dataPerPage as string) ?? 10
      let page = parseInt(req.query.page as string) ?? 1

      const offset = (page - 1) * dataPerPage

      const whereInput: PrismaClient.Prisma.JobWhereInput = {
        title: {
          contains: q as string,
          mode: 'insensitive',
        },
        companyId: req.user?.companyId,
      }

      const orderByInput = ():
        | PrismaClient.Prisma.JobOrderByWithRelationInput
        | PrismaClient.Prisma.JobOrderByWithRelationInput[] => {
        switch (sortBy) {
          case 'highestSalary':
            return { salary: 'desc' }
          case 'oldest':
            return { createdAt: 'asc' }
          case 'mostApplied':
            return {
              applications: {
                _count: 'desc',
              },
            }
          default:
            return { createdAt: 'desc' }
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
        include: {
          _count: {
            select: { applications: true },
          },
        },
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
