import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import prisma from '../../prisma/client'
import { authenticatedRoleCheck } from '../../middleware/authenticated-role-check'
import slugify from 'slugify'

export const post = [
  authenticatedRoleCheck(['EMPLOYER', 'JOBSEEKER']),
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const { id: skillId, name } = req.body

      await prisma.$transaction(async function (tx) {
        // zero skillId means that the client sending new skill data
        // that is not available in skills table
        if (skillId > 0) {
          console.log(`skillId is 0`)
          await tx.userSkill.create({
            data: {
              skillId,
              userId: req.user!.id,
            },
          })

          // if skillId is not greater than zero it means that the client wants
          // to add an existing skill from skills table into their userSkill
        } else if (skillId === 0) {
          console.log(`skillId is ${skillId}`)
          const newSkill = await tx.skill.create({
            data: {
              name,
              slug: slugify(name, { lower: true }),
            },
          })

          await tx.userSkill.create({
            data: {
              userId: req.user!.id,
              skillId: newSkill.id,
            },
            include: {
              skill: true,
            },
          })
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
  },
]
