import prisma from '../../prisma/client'
import { NextFunction, Request, Response } from 'express'
import * as PrismaClient from '@prisma/client'
import { authenticatedRoleCheck } from '../../middleware/authenticated-role-check'

export const get = [
  authenticatedRoleCheck(['ADMIN']),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      let dataPerPage = parseInt((req.query.dataPerPage as string) ?? '10')
      let page = parseInt((req.query.page as string) ?? '1')

      // Calculate offset based on the requested page
      const offset = (page - 1) * dataPerPage

      const whereInput: PrismaClient.Prisma.JobCategoryWhereInput = {
        name: {
          contains: req.query.q as string,
          mode: 'insensitive',
        },
      }

      const count = await prisma.jobCategory
        .findMany({
          where: whereInput,
        })
        .then((d) => d.length)

      const jobCategories = await prisma.jobCategory.findMany({
        where: whereInput,
        take: dataPerPage,
        skip: offset,
        include: {
          _count: {
            select: {
              jobs: true
            }
          }
        }
      })

      res.send({
        data: {
          jobCategories,
          count,
        },
      })
    } catch (error) {
      next(error)
    }
  },
]
