import { NextFunction, Request, Response } from 'express'
import prisma from '../../../prisma/client'
import { StatusCodes } from 'http-status-codes'
import { companyLogoStorage } from '../../../middleware/upload-handlers'
import multer from 'multer'

export const put = [
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params

      await prisma.application.update({
        where: {
          id: parseInt(id),
        },
        data: {
          status: req.body.status,
        },
      })

      res.send()
    } catch (error) {
      next(error)
    }
  },
]
