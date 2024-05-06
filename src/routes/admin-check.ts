import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { authenticatedRoleCheck } from '../middleware/authenticated-role-check'

export const get = [
  authenticatedRoleCheck(['ADMIN']),
  async (req: Request, res: Response) => {
    res.status(StatusCodes.PERMANENT_REDIRECT).send()
  },
]
