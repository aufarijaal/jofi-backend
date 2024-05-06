import { NextFunction, Request, Response } from 'express'
export const get = [
  async function (req: Request, res: Response, next: NextFunction) {
    try {
    } catch (error) {
      next(error)
    }
  },
]
