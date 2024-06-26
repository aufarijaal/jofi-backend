import { JwtPayload } from 'jsonwebtoken'
import jwt from 'jsonwebtoken'

export const tokenUtil = {
  generate: {
    // Function to generate access token
    accessToken: (
      payload: string | JwtPayload,
      expiresIn?: string | number
    ) => {
      const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
        expiresIn: '7d',
      })

      return token
    },

    // Function to generate refresh token
    refreshToken: (
      payload: string | JwtPayload,
      expiresIn?: string | number
    ) => {
      const refreshToken = jwt.sign(
        payload,
        process.env.JWT_REFRESH_SECRET as string,
        {
          expiresIn: '365d',
        }
      )

      return refreshToken
    },
  },
}

export default tokenUtil
