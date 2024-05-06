import { NextFunction, Request, Response } from 'express'
import prisma from '../../../prisma/client'
import { StatusCodes } from 'http-status-codes'
import * as PrismaClient from '@prisma/client'
import { authenticatedRoleCheck } from '../../../middleware/authenticated-role-check'

export const get = [
  authenticatedRoleCheck(['ADMIN']),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      let dataPerPage = parseInt((req.query.dataPerPage as string) ?? '10')
      let page = parseInt((req.query.page as string) ?? '1')
      const offset = (page - 1) * dataPerPage

      const whereInput: PrismaClient.Prisma.UserWhereInput = {
        isEmployer: true,
        employerVerified: false,
        OR: [
          {
            email: {
              contains: req.query.q as string,
              mode: 'insensitive',
            },
          },
          {
            profile: {
              name: {
                contains: req.query.q as string,
                mode: 'insensitive',
              },
            },
          },
        ],
      }

      const count = await prisma.user
        .findMany({
          where: whereInput,
          select: {
            id: true,
          },
        })
        .then((d) => d.length)

      const employerRequests = await prisma.user.findMany({
        where: whereInput,
        select: {
          id: true,
          email: true,
          companyId: true,
          company: {
            select: {
              name: true,
            },
          },
          profile: {
            select: {
              name: true,
            },
          },
        },
        take: dataPerPage,
        skip: offset,
      })

      res.send({
        data: {
          employers: employerRequests,
          count,
        },
      })
    } catch (error) {
      next(error)
    }
  },
]
