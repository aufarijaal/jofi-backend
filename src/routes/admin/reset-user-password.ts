import { NextFunction, Request, Response } from 'express'
import prisma from '../../prisma/client'
import bcrypt from 'bcryptjs'
import { authenticatedRoleCheck } from '../../middleware/authenticated-role-check'

export const put = [
  authenticatedRoleCheck(['ADMIN']),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id, password } = req.body

      await prisma.user.update({
        where: {
          id,
        },
        data: {
          password: bcrypt.hashSync(password, 10),
        },
      })

      res.send()
    } catch (error) {
      next(error)
    }
  },
]
