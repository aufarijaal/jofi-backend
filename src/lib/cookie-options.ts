import { CookieOptions } from 'express'

export const cookieOptions: CookieOptions = {
  maxAge: 3_600_000, // Cookie expiration time in milliseconds
  httpOnly: true, // Cookie accessible only through HTTP(S) requests, not JavaScript
  secure: true, // Cookie sent only over HTTPS
  sameSite: 'none',
}
