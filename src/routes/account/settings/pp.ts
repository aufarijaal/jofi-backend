import multer, { MulterError, memoryStorage } from 'multer'
import { authenticatedRoleCheck } from '../../../middleware/authenticated-role-check'
import { photoProfileStorage } from '../../../middleware/upload-handlers'
import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import prisma from '../../../prisma/client'
import { rm, rmSync } from 'fs'
import { join } from 'path'
import supabase from '../../../lib/supabase'
import { decode } from 'base64-arraybuffer'
import dayjs from 'dayjs'

const upload = multer({
  storage: memoryStorage(),
  limits: {
    fileSize: 500 * 1024,
  },
}).single('pp')

export const put = [
  authenticatedRoleCheck(['EMPLOYER', 'JOBSEEKER']),
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
          .from('photo-profiles')
          .upload(filename, decode(file?.buffer.toString('base64')), {
            contentType: file?.mimetype,
          })
          .catch((error) => {
            console.log(error)
            next(error)
          })

        const userInfo = await prisma.user.findFirstOrThrow({
          where: {
            id: req.user!.id,
          },
          select: {
            profile: {
              select: {
                photo: true,
              },
            },
          },
        })

        if (userInfo.profile?.photo) {
          supabase.storage
            .from('photo-profiles')
            .remove([userInfo.profile?.photo])
            .catch((error) => {
              next(error)
            })
        }

        await prisma.user.update({
          where: {
            id: req.user!.id,
          },
          data: {
            profile: {
              update: {
                photo: filename,
              },
            },
          },
        })
        res.send()
      })
    } catch (error) {
      next(error)
    }
  },
]

export const del = [
  authenticatedRoleCheck(['EMPLOYER', 'JOBSEEKER']),
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const userInfo = await prisma.user.findFirstOrThrow({
        where: {
          id: req.user!.id,
        },
        select: {
          profile: {
            select: {
              photo: true,
            },
          },
        },
      })

      if (userInfo.profile?.photo) {
        rmSync(
          join(
            __dirname,
            '../../../uploads/photo-profiles',
            userInfo.profile?.photo
          )
        )
      }

      await prisma.user.update({
        where: {
          id: req.user!.id,
        },
        data: {
          profile: {
            update: {
              photo: null,
            },
          },
        },
      })

      res.status(StatusCodes.NO_CONTENT).send()
    } catch (error) {
      next(error)
    }
  },
]
