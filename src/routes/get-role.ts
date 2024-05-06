import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import prisma from '../prisma/client'

export const get = [
  async (req: Request, res: Response) => {
    res.send({
      data: {
        role: req.user?.role,
      },
    })
  },
]
