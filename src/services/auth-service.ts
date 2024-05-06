import { cookieOptions } from '../lib/cookie-options'
import { AppError } from '../lib/error'
import tokenUtil from '../lib/token'
import prisma from '../prisma/client'
import bcrypt from 'bcryptjs'
import { Request, Response } from 'express'

async function signin(email: string, password: string) {
  const foundUser = await prisma.user.findFirstOrThrow({
    select: {
      id: true,
      email: true,
      password: true,
    },
    where: {
      email,
      isEmployer: false,
    },
  })

  if (!bcrypt.compareSync(password, foundUser.password)) {
    throw new AppError('Invalid email or password', {
      statusCode: 401,
      name: 'AuthError',
    })
  }

  const accessToken = tokenUtil.generate.accessToken({
    id: foundUser.id,
    email: foundUser.email,
    role: 'JOBSEEKER',
  }, '3m')

  const refreshToken = tokenUtil.generate.refreshToken({
    id: foundUser.id,
    email: foundUser.email,
    role: 'JOBSEEKER',
  }, '10m')

  return {
    accessToken,
    refreshToken,
  }
}

async function signup(name: string, email: string, password: string) {
  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      profile: {
        create: {
          name,
        },
      },
    },
  })

  const accessToken = tokenUtil.generate.accessToken({
    id: user.id,
    email: user.email,
    role: 'JOBSEEKER',
  })

  const refreshToken = tokenUtil.generate.refreshToken({
    id: user.id,
    email: user.email,
    role: 'JOBSEEKER',
  })

  return {
    accessToken,
    refreshToken,
  }
}

async function employerSignin(email: string, password: string) {
  const foundUser = await prisma.user.findFirstOrThrow({
    select: {
      id: true,
      password: true,
      employerVerified: true,
      email: true,
      companyId: true,
    },
    where: {
      email,
      isEmployer: true,
    },
  })

  if (!bcrypt.compareSync(password, foundUser.password)) {
    throw new AppError('Invalid email or password', {
      statusCode: 422,
      name: 'AuthError',
    })
  }

  if (!foundUser.employerVerified) {
    throw new AppError(
      'Unverified employer. Please contact admin for verification.',
      {
        statusCode: 422,
        name: 'AuthError',
      }
    )
  }

  const accessToken = tokenUtil.generate.accessToken({
    id: foundUser.id,
    email: foundUser.email,
    role: 'EMPLOYER',
    companyId: foundUser.companyId,
  })

  const refreshToken = tokenUtil.generate.refreshToken({
    id: foundUser.id,
    email: foundUser.email,
    role: 'EMPLOYER',
    companyId: foundUser.companyId,
  })

  return {
    accessToken,
    refreshToken,
  }
}

async function employerSignup(
  email: string,
  password: string,
  companyId: number
) {
  const hashedPassword = await bcrypt.hash(password, 10)

  await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      isEmployer: true,
      companyId,
    },
  })
}

async function adminSignin(username: string, password: string) {
  const foundAdmin = await prisma.admin.findFirstOrThrow({
    select: {
      id: true,
      username: true,
      password: true,
    },
    where: {
      username,
    },
  })

  if (password !== foundAdmin.password) {
    throw new AppError('Invalid username or password', {
      statusCode: 401,
      name: 'AuthError',
    })
  }

  const accessToken = tokenUtil.generate.accessToken({
    id: foundAdmin.id,
    username: foundAdmin.username,
    role: 'ADMIN',
  })

  const refreshToken = tokenUtil.generate.refreshToken({
    id: foundAdmin.id,
    username: foundAdmin.username,
    role: 'ADMIN',
  })

  return {
    accessToken,
    refreshToken,
  }
}

async function signout(req: Request, res: Response) {
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
  res.send()
}

// Authorization

async function verifyEmployerByAdmin(id: number) {
  await prisma.user.findFirstOrThrow({
    where: {
      id,
      isEmployer: true,
      employerVerified: false,
    },
  })

  await prisma.user.update({
    data: {
      employerVerified: true,
    },
    where: {
      id,
      isEmployer: true,
      employerVerified: false,
    },
  })
}

const authService = {
  signup,
  signin,
  signout,
  employerSignin,
  employerSignup,
  adminSignin,
  verifyEmployerByAdmin,
}

export default authService
