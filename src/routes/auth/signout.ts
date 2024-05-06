import { cookieOptions } from '../../lib/cookie-options'
import { Request, Response } from 'express'
import authService from '../../services/auth-service'

export const post = authService.signout
