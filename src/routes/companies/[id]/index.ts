import { NextFunction, Request, Response } from 'express'
import prisma from '../../../prisma/client'
import { StatusCodes } from 'http-status-codes'
import slugify from 'slugify'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { authenticatedRoleCheck } from '../../../middleware/authenticated-role-check'

// update company info by admin
export const put = [
  authenticatedRoleCheck(['ADMIN']),
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, location, industry, about } = req.body

    const nameSlug = slugify(name, { lower: true })

    try {
      await prisma.company.update({
        where: {
          id: parseInt(req.params.id),
        },
        data: {
          name,
          slug: nameSlug,
          about,
          location,
          industry,
        },
      })

      res.status(StatusCodes.NO_CONTENT).send()
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          return res
            .status(StatusCodes.BAD_REQUEST)
            .send({ message: 'Company already exists' })
        }
      }
      next(e)
    }
  },
]

// delete company by
export const del = [
  authenticatedRoleCheck(['ADMIN']),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await prisma.company.delete({
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
