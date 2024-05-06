import { NextFunction, Request, Response } from 'express'
import prisma from '../../../prisma/client'
import { StatusCodes } from 'http-status-codes'
import { companyLogoStorage } from '../../../middleware/upload-handlers'
import multer from 'multer'
import { authenticatedRoleCheck } from '../../../middleware/authenticated-role-check'

export const put = [
  authenticatedRoleCheck(['ADMIN', 'EMPLOYER']),
  multer({ storage: companyLogoStorage }).single('logo'),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params

      const file = req.file

      if (!file) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .send({ message: 'No file is selected.' })
      }

      await prisma.company.update({
        where: {
          id: parseInt(id),
        },
        data: {
          logo: file.filename,
        },
      })

      res.send()
    } catch (error) {
      next(error)
    }
  },
]
