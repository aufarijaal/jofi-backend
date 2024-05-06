import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import prisma from '../../../prisma/client'
import slugify from 'slugify'
import { authenticatedRoleCheck } from '../../../middleware/authenticated-role-check'

export const put = [
  authenticatedRoleCheck(['ADMIN']),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name } = req.body

      await prisma.jobCategory.update({
        where: {
          id: parseInt(req.params.id),
        },
        data: {
          name,
          slug: slugify(name, { lower: true }),
        },
      })

      res.status(StatusCodes.NO_CONTENT).send()
    } catch (error) {
      next(error)
    }
  },
]

export const del = [
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await prisma.jobCategory.delete({
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
