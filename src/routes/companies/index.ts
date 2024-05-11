import { NextFunction, Request, Response } from 'express'
import prisma from '../../prisma/client'
import { StatusCodes } from 'http-status-codes'
import { check, validationResult } from 'express-validator'
import os from 'os'
import path from 'path'
import { companyLogoStorage } from '../../middleware/upload-handlers'
import multer from 'multer'
import slugify from 'slugify'
import * as PrismaClient from '@prisma/client'
import { authenticatedRoleCheck } from '../../middleware/authenticated-role-check'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

export const get = [
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { q } = req.query

      let dataPerPage = parseInt((req.query.dataPerPage as string) ?? '10')
      let page = parseInt((req.query.page as string) ?? '1')

      const offset = (page - 1) * dataPerPage

      const whereInput: PrismaClient.Prisma.CompanyWhereInput = {
        name: {
          contains: q as string,
          mode: 'insensitive',
        },
      }

      const count = await prisma.company
        .findMany({
          where: whereInput,
        })
        .then((d) => d.length)

      const companies = await prisma.company.findMany({
        where: whereInput,
        orderBy: {
          name: 'asc',
        },
        skip: offset,
        take: dataPerPage,
        select: {
          id: true,
          name: true,
          logo: true,
          slug: true,
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
          companies,
        },
      })
    } catch (error) {
      next(error)
    }
  },
]

// Create a company data
export const post = [
  authenticatedRoleCheck(['ADMIN']),
  check('name').exists().isString().notEmpty().withMessage('name is required'),
  check('location')
    .exists()
    .isString()
    .notEmpty()
    .withMessage('location is required'),
  check('industry')
    .exists()
    .isString()
    .notEmpty()
    .withMessage('industry is required'),
  check('about').isString().notEmpty().isLength({ max: 200 }),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = validationResult(req)
      if (!result.isEmpty()) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .send({ errors: result.array() })
      }

      const { name, location, industry, about } = req.body

      const nameSlug = slugify(name, { lower: true })

      const newCompany = await prisma.company.create({
        data: {
          name,
          location,
          industry,
          about,
          slug: nameSlug,
        },
      })

      res.status(StatusCodes.CREATED).send()
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          return res
            .status(StatusCodes.BAD_REQUEST)
            .send({ message: 'Company already exists' })
        }
      }
      next(error)
    }
  },
]

// Delete many company by admin
export const del = [
  authenticatedRoleCheck(['ADMIN']),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await prisma.company.deleteMany({
        where: {
          id: {
            in: req.body.ids as number[],
          },
        },
      })

      res.status(StatusCodes.NO_CONTENT).send()
    } catch (error) {
      next(error)
    }
  },
]
