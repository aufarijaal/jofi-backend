import { NextFunction, Request, Response } from 'express'
import prisma from '../../prisma/client'
import { authenticatedRoleCheck } from '../../middleware/authenticated-role-check'
import { StatusCodes } from 'http-status-codes'

export const post = [
  authenticatedRoleCheck(['EMPLOYER', 'JOBSEEKER']),
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const { rate, message } = req.body

      const currentRate = await prisma.rate.findMany({
        where: {
          userId: req.user!.id,
        },
      })

      if (!currentRate.length) {
        await prisma.rate.create({
          data: {
            userId: req.user!.id,
            rate: parseInt(rate),
            message,
          },
        })
      } else {
        await prisma.rate.updateMany({
          where: {
            userId: req.user!.id,
          },
          data: {
            userId: req.user!.id,
            rate: parseInt(rate),
            message,
          },
        })
      }

      res.send()
    } catch (error) {
      next(error)
    }
  },
]
