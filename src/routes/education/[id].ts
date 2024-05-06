import { NextFunction, Request, Response } from 'express'
import prisma from '../../prisma/client'
import { StatusCodes } from 'http-status-codes'

export const del = [
  async function(req: Request, res: Response, next: NextFunction) {
  try {
    await prisma.education.delete({
      where: {
        id: parseInt(req.params.id)
      }
    })

    res.status(StatusCodes.NO_CONTENT).send()
  } catch (error) {
    next(error)
  }
}
]