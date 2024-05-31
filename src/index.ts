import cors from 'cors'
import express, {
  NextFunction,
  Request,
  Response,
  RequestHandler,
} from 'express'
import morgan from 'morgan'
import 'dotenv/config'
import cookieParser from 'cookie-parser'
import path from 'path'
import { router } from 'express-file-routing'
import expressListRoutes from 'express-list-routes'
import { StatusCodes } from 'http-status-codes'
import { AppError } from './lib/error'
import jwt from 'jsonwebtoken'
import { cookieOptions } from './lib/cookie-options'
import { extractExpressRoutes } from 'express-routes-extractor'

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number
        role: 'ADMIN' | 'EMPLOYER' | 'JOBSEEKER'
        email?: string
        username?: string
        companyId?: number
      }
    }
  }
}

async function main() {
  const app = express()
  const port = process.env.PORT

  app.use(cookieParser())
  // app.use(express.static(path.join(__dirname, 'public/uploads')))
  app.use(morgan('tiny'))
  app.use(express.json())
  app.use(
    cors({
      origin: process.env.ALLOWED_ORIGINS as string,
      credentials: true,
    })
  )
  app.use(express.urlencoded({ extended: true }))
  app.set('view engine', 'ejs')

  app.use((req, res, next) => {
    const accessToken = req.headers.authorization ?? req.cookies.accessToken
    try {
      jwt.verify(
        accessToken,
        process.env.JWT_SECRET as string,
        function (err: any, decoded: any) {
          if (err && err.name === 'TokenExpiredError') {
            res.cookie('accessToken', '', {
              ...cookieOptions,
              maxAge: -1,
              path: '/',
            })
            res.cookie('refreshToken', '', {
              ...cookieOptions,
              maxAge: -1,
              path: '/',
            })
          }

          req.user = err ? null : decoded
        }
      )

      next()
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
    }
  })

  app.use(
    '/',
    await router({
      directory: path.join(__dirname, process.env.ROUTE_FOLDER as string),
    })
  )

  app.get('/info', (req, res) => {
    const routes = extractExpressRoutes(app)
    res.render('info', {
      title: 'JoFi API Info',
      routes: routes,
    })
  })

  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (process.env.NODE_ENV === 'development') {
      console.error(err.stack)
    }

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message)
  })

  app.listen(port, () => {
    console.log(`🚀 Server ready at: http://localhost:${port}`)
  })

  return app
}

main().then((app) => {
  if (process.env.NODE_ENV === 'development') {
    expressListRoutes(app)
  }
})
