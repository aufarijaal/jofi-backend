import { NextFunction, Request, Response } from 'express'
import prisma from '../../prisma/client'

export const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const companies = await prisma.company.findMany({
      select: {
        id: true,
        name: true,
      },
    })

    res.send({
      data: companies,
    })
  } catch (error) {
    next(error)
  }
}
