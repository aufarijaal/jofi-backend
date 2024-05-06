import slugify from 'slugify'
import prisma from '../../prisma/client'
import { NextFunction, Request, Response } from 'express'
import { check, validationResult } from 'express-validator'
import { StatusCodes } from 'http-status-codes'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { authenticatedRoleCheck } from '../../middleware/authenticated-role-check'

export const get = [
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      let dataPerPage = parseInt((req.query.dataPerPage as string) ?? '10')
      let page = parseInt((req.query.page as string) ?? '1')
      const offset = (page - 1) * dataPerPage

      const count = await prisma.jobCategory
        .findMany({
          where: {
            name: {
              contains: req.query.q as string,
              mode: 'insensitive',
            },
          },
        })
        .then((d) => d.length)

      const jobCategories = await prisma.jobCategory.findMany({
        where: {
          name: {
            contains: req.query.q as string,
            mode: 'insensitive',
          },
        },
        take: dataPerPage,
        skip: offset,
      })

      res.send({
        data: jobCategories,
        count,
      })
    } catch (error) {
      next(error)
    }
  },
]

export const del = [
  authenticatedRoleCheck(['ADMIN']),
  check('ids').exists().isArray(),
  async (req: Request, res: Response) => {
    await prisma.jobCategory.deleteMany({
      where: {
        id: {
          in: req.body.ids,
        },
      },
    })

    res.status(StatusCodes.NO_CONTENT).send()
  },
]

export const post = [
  authenticatedRoleCheck(['ADMIN']),
  check('name').exists().isString().isLength({ min: 1 }),
  async (req: Request, res: Response) => {
    const result = validationResult(req)
    if (!result.isEmpty()) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send({ errors: result.array() })
    }

    const { name } = req.body

    try {
      await prisma.jobCategory.create({
        data: {
          name,
          slug: slugify(name, { lower: true }),
        },
      })

      res.status(StatusCodes.CREATED).send()
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002' &&
        (error.meta?.target as any)[0] === 'name'
      ) {
        return res.status(StatusCodes.CONFLICT).send({
          message: 'This category already exists',
        })
      }

      throw error
    }
  },
]
