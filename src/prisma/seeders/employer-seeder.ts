import { Prisma } from '@prisma/client'
import bcrypt from 'bcryptjs'

const salt = bcrypt.genSaltSync(10)
const password = bcrypt.hashSync('rahasia', salt)

const employersData: Prisma.UserCreateInput[] = [
  {
    profile: {
      create: {
        name: 'Sarah Johnson',
      },
    },
    email: 'bluejay@company.com',
    password,
    isEmployer: true,
    employerVerified: true,
    company: {
      connect: {
        id: 8,
      },
    },
  },
  {
    profile: {
      create: {
        name: 'Michael Smith',
      },
    },
    email: 'mountainlover@company.com',
    password,
    isEmployer: true,
    employerVerified: false,
    company: {
      connect: {
        id: 16,
      },
    },
  },
  {
    profile: {
      create: {
        name: 'Emily Brown',
      },
    },
    email: 'happyhiker@company.com',
    password,
    isEmployer: true,
    employerVerified: false,
    company: {
      connect: {
        id: 10,
      },
    },
  },
  {
    profile: {
      create: {
        name: 'Daniel Davis',
      },
    },
    email: 'sunnybeach@company.com',
    password,
    isEmployer: true,
    employerVerified: false,
    company: {
      connect: {
        id: 3,
      },
    },
  },
  {
    profile: {
      create: {
        name: 'Jessica Wilson',
      },
    },
    email: 'coolcat@company.com',
    password,
    isEmployer: true,
    employerVerified: true,
    company: {
      connect: {
        id: 14,
      },
    },
  },
  {
    profile: {
      create: {
        name: 'Matthew Taylor',
      },
    },
    email: 'gigglygopher@company.com',
    password,
    isEmployer: true,
    employerVerified: false,
    company: {
      connect: {
        id: 5,
      },
    },
  },
  {
    profile: {
      create: {
        name: 'Ashley Anderson',
      },
    },
    email: 'clevercanary@company.com',
    password,
    isEmployer: true,
    employerVerified: false,
    company: {
      connect: {
        id: 2,
      },
    },
  },
  {
    profile: {
      create: {
        name: 'Christopher Martinez',
      },
    },
    email: 'speedycheetah@company.com',
    password,
    isEmployer: true,
    employerVerified: true,
    company: {
      connect: {
        id: 11,
      },
    },
  },
  {
    profile: {
      create: {
        name: 'Amanda Thompson',
      },
    },
    email: 'daisyduck@company.com',
    password,
    isEmployer: true,
    employerVerified: true,
    company: {
      connect: {
        id: 4,
      },
    },
  },
  {
    profile: {
      create: {
        name: 'Joshua Thomas',
      },
    },
    email: 'gigglygiraffe@company.com',
    password,
    isEmployer: true,
    employerVerified: false,
    company: {
      connect: {
        id: 13,
      },
    },
  },
  {
    profile: {
      create: {
        name: 'Elizabeth Garcia',
      },
    },
    email: 'smartypanda@company.com',
    password,
    isEmployer: true,
    employerVerified: true,
    company: {
      connect: {
        id: 6,
      },
    },
  },
  {
    profile: {
      create: {
        name: 'David Hernandez',
      },
    },
    email: 'happypenguin@company.com',
    password,
    isEmployer: true,
    employerVerified: true,
    company: {
      connect: {
        id: 15,
      },
    },
  },
  {
    profile: {
      create: {
        name: 'Jennifer Lopez',
      },
    },
    email: 'smilingstarfish@company.com',
    password,
    isEmployer: true,
    employerVerified: false,
    company: {
      connect: {
        id: 18,
      },
    },
  },
  {
    profile: {
      create: {
        name: 'James Lee',
      },
    },
    email: 'bubblybunny@company.com',
    password,
    isEmployer: true,
    employerVerified: false,
    company: {
      connect: {
        id: 7,
      },
    },
  },
  {
    profile: {
      create: {
        name: 'Samantha Rodriguez',
      },
    },
    email: 'craftycaterpillar@company.com',
    password,
    isEmployer: true,
    employerVerified: false,
    company: {
      connect: {
        id: 1,
      },
    },
  },
  {
    profile: {
      create: {
        name: 'Kevin Nguyen',
      },
    },
    email: 'adventurousantelope@company.com',
    password,
    isEmployer: true,
    employerVerified: true,
    company: {
      connect: {
        id: 9,
      },
    },
  },
  {
    profile: {
      create: {
        name: 'Lauren Adams',
      },
    },
    email: 'playfulplatypus@company.com',
    password,
    isEmployer: true,
    employerVerified: false,
    company: {
      connect: {
        id: 12,
      },
    },
  },
  {
    profile: {
      create: {
        name: 'Ryan Moore',
      },
    },
    email: 'dashingdolphin@company.com',
    password,
    isEmployer: true,
    employerVerified: true,
    company: {
      connect: {
        id: 17,
      },
    },
  },
]

export default employersData
