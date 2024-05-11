import { NextFunction, Request, Response } from 'express'
import prisma from '../../../prisma/client'
import { StatusCodes } from 'http-status-codes'
import { companyLogoStorage } from '../../../middleware/upload-handlers'
import multer, { MulterError, memoryStorage } from 'multer'
import { authenticatedRoleCheck } from '../../../middleware/authenticated-role-check'
import supabase from '../../../lib/supabase'
import dayjs from 'dayjs'
import { decode } from 'base64-arraybuffer'

const upload = multer({
  storage: memoryStorage(),
  limits: {
    fileSize: 500 * 1024,
  },
}).single('logo')

export const put = [
  authenticatedRoleCheck(['ADMIN', 'EMPLOYER']),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      upload(req, res, async function (err) {
        if (err instanceof MulterError && err.code === 'LIMIT_FILE_SIZE') {
          return res.status(StatusCodes.UNPROCESSABLE_ENTITY).send({
            message: 'Maximum file size is 500KB',
          })
        }

        const file = req.file

        if (!file) {
          return res
            .status(StatusCodes.BAD_REQUEST)
            .send({ message: 'No file is selected.' })
        }

        const filename = `${dayjs().valueOf()}-${file?.originalname}`

        supabase.storage
          .from('company-logos')
          .upload(filename, decode(file?.buffer.toString('base64')), {
            contentType: file?.mimetype,
          })
          .catch((error) => {
            console.log(error)
            next(error)
          })

        const companyInfo = await prisma.company.findFirstOrThrow({
          where: {
            id: parseInt(req.params.id as string),
          },
          select: {
            logo: true,
          },
        })

        if (companyInfo.logo) {
          supabase.storage
            .from('company-logos')
            .remove([companyInfo.logo])
            .catch((error) => {
              next(error)
            })
        }

        await prisma.company.update({
          where: {
            id: parseInt(req.params.id as string),
          },
          data: {
            logo: filename,
          },
        })
        res.send()
      })
    } catch (error) {
      next(error)
    }
  },
]
