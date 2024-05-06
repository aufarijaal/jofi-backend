import { NextFunction, Request, Response } from 'express'
import prisma from '../../prisma/client'

export const get = [
  async function(req: Request, res: Response, next: NextFunction) {
  try {
    const skills = await prisma.skill.findMany({
      where: {
        name: {
          contains: req.query.q as string,
          mode: 'insensitive'
        },
        id: {
          notIn: (req.query.excludedId as string[]).map((id) => parseInt(id))
        }
      }
    })

    res.send({
      data: skills
    })
  } catch (error) {
    next(error)
  }
}
]