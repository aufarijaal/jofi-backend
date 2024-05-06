import { NextFunction, Request, Response } from 'express'
import prisma from '../../prisma/client'
import { authenticatedRoleCheck } from '../../middleware/authenticated-role-check'
import { body, validationResult } from 'express-validator'
import { StatusCodes } from 'http-status-codes'
import dayjs from 'dayjs'

export const post = [
  authenticatedRoleCheck(['JOBSEEKER', 'EMPLOYER']),
  body('level').exists().isString().notEmpty(),
  body('institution').exists().isString().notEmpty(),
  body('major').exists().isString().notEmpty(),
  body('startDate').exists().isString(),
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

      const { level, institution, major, startDate, endDate, isCurrent } =
        req.body

      await prisma.education.create({
        data: {
          userId: req.user!.id,
          level,
          institution,
          major,
          startDate: dayjs(startDate).format().valueOf(),
          endDate:
            endDate === '' || !endDate
              ? null
              : dayjs(endDate).format().valueOf(),
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
  body('level').exists().isString().notEmpty(),
  body('institution').exists().isString().notEmpty(),
  body('major').exists().isString().notEmpty(),
  body('startDate').exists().isString(),
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

      const { id, level, institution, major, startDate, endDate, isCurrent } =
        req.body

      await prisma.education.update({
        where: {
          id: parseInt(id),
        },
        data: {
          userId: req.user!.id,
          level,
          institution,
          major,
          startDate: dayjs(startDate).format().valueOf(),
          endDate:
            endDate === '' || !endDate
              ? null
              : dayjs(endDate).format().valueOf(),
          isCurrent,
        },
      })

      res.send()
    } catch (error) {
      next(error)
    }
  },
]
