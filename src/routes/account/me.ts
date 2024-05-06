import { NextFunction, Request, Response } from 'express'
import prisma from '../../prisma/client'
import { authenticatedRoleCheck } from '../../middleware/authenticated-role-check'
import { StatusCodes } from 'http-status-codes'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

export const get = [
  authenticatedRoleCheck(['ALLOW_ANY_ROLES']),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userInfo =
        req.user?.role === 'ADMIN'
          ? await prisma.admin.findFirstOrThrow({
              where: {
                id: req.user.id,
              },
              select: {
                id: true,
                username: true,
              },
            })
          : await prisma.user.findFirstOrThrow({
              where: {
                id: req.user?.id,
              },
              select: {
                id: true,
                email: true,
              },
            })

      res.send({
        data: {
          ...userInfo,
          role: req.user?.role,
        },
      })
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2015'
      ) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .send({ message: 'User cannot be found' })
      }

      next(error)
    }
  },
]
