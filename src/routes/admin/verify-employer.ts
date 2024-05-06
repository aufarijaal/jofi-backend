import { AppError } from '../../lib/error'
import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import authService from '../../services/auth-service'
import { authenticatedRoleCheck } from '../../middleware/authenticated-role-check'

export const post = [
  authenticatedRoleCheck(['ADMIN']),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      authService.verifyEmployerByAdmin(parseInt(req.body.id))

      res.send()
    } catch (error: any) {
      if (error && error.name === 'NotFoundError') {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: 'Account not found' })
      } else if (error instanceof AppError) {
        return res.status(error.statusCode).send({ message: error.message })
      }

      next(error)
    }
  },
]
