import multer, { MulterError } from 'multer'
import { authenticatedRoleCheck } from '../../../middleware/authenticated-role-check'
import { photoProfileStorage } from '../../../middleware/upload-handlers'
import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import prisma from '../../../prisma/client'
import { rm, rmSync } from 'fs'
import { join } from 'path'

const upload = multer({
  storage: photoProfileStorage,
  limits: {
    fileSize: 1 * 1024 * 1024,
  },
}).single('pp')

export const put = [
  authenticatedRoleCheck(['EMPLOYER', 'JOBSEEKER']),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      upload(req, res, async function (err) {
        if (err instanceof MulterError && err.code === 'LIMIT_FILE_SIZE') {
          return res.status(StatusCodes.UNPROCESSABLE_ENTITY).send({
            message: 'Maximum file size is 1MB',
          })
        }

        const file = req.file

        if (!file) {
          return res
            .status(StatusCodes.BAD_REQUEST)
            .send({ message: 'No file is selected.' })
        }

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
                photo: file.filename,
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
