import { NextFunction, Request, Response } from 'express'
import { authenticatedRoleCheck } from '../../middleware/authenticated-role-check'
import prisma from '../../prisma/client'
import { StatusCodes } from 'http-status-codes'

export const del = [
  authenticatedRoleCheck(['EMPLOYER', 'JOBSEEKER']),
  async function(req: Request, res: Response, next: NextFunction) {
  try {
    await prisma.userSkill.delete({
      where: {
        id: parseInt(req.params.userSkillId),
        userId: req.user!.id,
      },
      select: {
        id: true,
        userId: true,
        skillId: true,
        skill: true
      }
    })

    const updated = await prisma.userSkill.findMany({
      where: {
        userId: req.user!.id,
      },
      include: {
        skill: true,
      },
      orderBy: {
        skill: {
          name: 'asc',
        },
      },
    })
    
    res.send({
      data: updated,
    })
  } catch (error) {
    next(error)
  }
}
]