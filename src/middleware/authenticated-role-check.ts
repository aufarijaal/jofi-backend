import { NextFunction, Request, RequestHandler, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

export const authenticatedRoleCheck = (
  roles: ('ADMIN' | 'JOBSEEKER' | 'EMPLOYER' | 'ALLOW_ANY_ROLES')[]
) => {
  return function (req: Request, res: Response, next: NextFunction) {
    if (!req.user) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .send({ message: 'Unauthorized' })
    }

    const userRole = req.user?.role

    // Check if 'all' is included in allowedRoles array
    if (roles.includes('ALLOW_ANY_ROLES')) {
      // If 'all' is present, allow the request to continue
      next()
    } else {
      // Check if userRole is present in allowedRoles array
      if (roles.includes(userRole)) {
        // If user role is allowed, continue to the next middleware
        next()
      } else {
        // If user role is not allowed, send forbidden error response
        return res.status(StatusCodes.FORBIDDEN).send({
          error: 'Forbidden',
          message: 'You do not have permission to access this resource.',
          role: userRole,
        })
      }
    }
  } as RequestHandler
}
