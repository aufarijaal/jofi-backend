import { NextFunction, Request, Response } from 'express'
import prisma from '../../../prisma/client'
import { StatusCodes } from 'http-status-codes'
import { companyLogoStorage } from '../../../middleware/upload-handlers'
import multer from 'multer'

export const get = [
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params

      const applicantDetails = await prisma.user.findFirst({
        where: {
          id: parseInt(id),
        },
        select: {
          id: true,
          email: true,
          profile: {
            select: {
              name: true,
              photo: true,
              about: true,
            },
          },
          educations: {},
          jobExperiences: {},
          userSkills: {
            include: {
              skill: true,
            },
          },
        },
      })

      res.send({
        data: applicantDetails,
      })
    } catch (error) {
      next(error)
    }
  },
]
