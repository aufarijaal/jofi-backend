import { NextFunction, Request, Response } from 'express'
import prisma from '../../prisma/client'
import { StatusCodes } from 'http-status-codes'
import * as PrismaClient from '@prisma/client'
import { authenticatedRoleCheck } from '../../middleware/authenticated-role-check'

export const get = [
  authenticatedRoleCheck(['EMPLOYER']),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      let dataPerPage = parseInt((req.query.dataPerPage as string) ?? '10')
      let page = parseInt((req.query.page as string) ?? '1')

      // Calculate offset based on the requested page
      const offset = (page - 1) * dataPerPage

      const whereInput: PrismaClient.Prisma.ApplicationWhereInput = {
        OR: [
          {
            job: {
              title: {
                contains: (req.query.q as string) ?? '',
                mode: 'insensitive',
              },
            },
          },
          {
            user: {
              profile: {
                name: {
                  contains: (req.query.q as string) ?? '',
                  mode: 'insensitive',
                },
              },
            },
          },
        ],
        job: {
          companyId: req.user?.companyId,
        },
      }

      const count = await prisma.application
        .findMany({
          where: whereInput,
        })
        .then((d) => d.length)

      const applications = await prisma.application.findMany({
        where: whereInput,
        select: {
          id: true,
          jobId: true,
          userId: true,
          status: true,
          createdAt: true,
          job: {
            select: {
              title: true,
            },
          },
          user: {
            select: {
              profile: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
        take: dataPerPage,
        skip: offset,
      })

      res.send({
        data: {
          applications,
          count,
        },
      })
    } catch (error) {
      next(error)
    }
  },
]
