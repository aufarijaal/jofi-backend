import { NextFunction, Request, Response } from 'express'
import prisma from '../../prisma/client'
import { authenticatedRoleCheck } from '../../middleware/authenticated-role-check'
import { body, validationResult } from 'express-validator'
import { StatusCodes } from 'http-status-codes'
import dayjs from 'dayjs'

export const post = [
  authenticatedRoleCheck(['JOBSEEKER', 'EMPLOYER']),
  body('title').exists().isString().notEmpty(),
  body('companyName').exists().isString().notEmpty(),
  body('startDate').exists().isString().notEmpty(),
  body('endDate').exists().isString().optional({ values: 'null' }),
  body('isCurrent').exists().isBoolean(),
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const result = validationResult(req)
      if (!result.isEmpty()) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .send({ errors: result.array() })
      }

      console.log(req.body)

      const { title, companyName, startDate, endDate, isCurrent } = req.body

      await prisma.jobExperience.create({
        data: {
          userId: req.user!.id,
          title,
          companyName,
          startDate: dayjs(startDate).format().valueOf(),
          endDate: endDate === '' || !endDate ? null : dayjs(endDate).format().valueOf(),
          isCurrent,
        },
      })

      res.status(StatusCodes.CREATED).send()
    } catch (error) {
      next(error)
    }
  },
]

export const put = [
  authenticatedRoleCheck(['JOBSEEKER', 'EMPLOYER']),
  body('id').exists().isNumeric(),
  body('title').exists().isString().notEmpty(),
  body('companyName').exists().isString().notEmpty(),
  body('startDate').exists().isString().notEmpty(),
  body('endDate').exists().isString().optional({ values: 'null' }),
  body('isCurrent').exists().isBoolean(),
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const result = validationResult(req)
      if (!result.isEmpty()) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .send({ errors: result.array() })
      }

      console.log(req.body)

      const { id, title, companyName, startDate, endDate, isCurrent } = req.body

      await prisma.jobExperience.update({
        where: {
          id: parseInt(id),
        },
        data: {
          title,
          companyName,
          startDate: dayjs(startDate).format().valueOf(),
          endDate: endDate === '' || !endDate ? null : dayjs(endDate).format().valueOf(),
          isCurrent,
        },
      })

      res.send()
    } catch (error) {
      next(error)
    }
  },
]
