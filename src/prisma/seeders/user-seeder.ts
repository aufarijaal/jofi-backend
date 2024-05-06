import { Prisma } from '@prisma/client'
import bcrypt from 'bcryptjs'

const salt = bcrypt.genSaltSync(10)
const password = bcrypt.hashSync('rahasia', salt)

const jobExperiences = [
  {
    companyName: 'Tech Solutions Inc.',
    title: 'Software Engineer',
    startDate: new Date('2018-03-15'),
    endDate: new Date('2022-05-20'),
    isCurrent: false,
  },
  {
    companyName: 'Digital Marketing Agency',
    title: 'Web Developer',
    startDate: new Date('2016-09-01'),
    endDate: new Date('2018-01-15'),
    isCurrent: false,
  },
  {
    companyName: 'E-Commerce Innovations Ltd.',
    title: 'Senior Frontend Developer',
    startDate: new Date('2019-06-10'),
    endDate: new Date('2023-08-30'),
    isCurrent: false,
  },
  {
    companyName: 'Data Analytics Solutions',
    title: 'Data Scientist',
    startDate: new Date('2017-01-10'),
    endDate: new Date('2020-03-25'),
    isCurrent: false,
  },
  {
    companyName: 'ABC Consulting Group',
    title: 'Project Manager',
    startDate: new Date('2015-05-01'),
    endDate: new Date('2017-12-31'),
    isCurrent: false,
  },
  {
    companyName: 'XYZ Software Co.',
    title: 'Quality Assurance Analyst',
    startDate: new Date('2016-02-20'),
    endDate: new Date('2018-11-15'),
    isCurrent: false,
  },
  {
    companyName: 'Tech Start-Up Ventures',
    title: 'Product Manager',
    startDate: new Date('2019-10-01'),
    endDate: new Date('2023-02-28'),
    isCurrent: false,
  },
  {
    companyName: 'Financial Services Corporation',
    title: 'Financial Analyst',
    startDate: new Date('2014-08-15'),
    endDate: new Date('2016-06-30'),
    isCurrent: false,
  },
  {
    companyName: 'Healthcare Innovations Ltd.',
    title: 'Systems Administrator',
    startDate: new Date('2017-04-01'),
    endDate: new Date('2021-09-10'),
    isCurrent: false,
  },
]

const skillIds = [
  [34, 87, 55, 12, 76, 25, 43, 78, 19],
  [67, 8, 91, 30, 56, 23, 72, 41],
  [2, 84, 46, 69, 88, 15, 50, 10, 66, 35, 11],
  [89, 3, 38, 77, 62, 20, 31, 73, 48, 81, 64, 29, 13, 1, 52, 70, 60, 14],
]

const usersData: Prisma.UserCreateInput[] = [
  {
    profile: {
      create: {
        name: 'Alice',
      },
    },
    email: 'alice@prisma.io',
    password,
    educations: {
      createMany: {
        data: [
          {
            institution: 'University of XYZ',
            level: 'S1',
            major: 'Computer Science',
            startDate: new Date('2016-09-01'),
            endDate: new Date('2020-06-01'),
            isCurrent: false,
          },
        ],
      },
    },
    jobExperiences: {
      createMany: {
        data: [jobExperiences[0], jobExperiences[8], jobExperiences[7]],
      },
    },
    userSkills: {
      createMany: {
        data: skillIds[0].map((skillId) => ({ skillId })),
      },
    },
  },
  {
    profile: {
      create: {
        name: 'Ronaldo',
      },
    },
    email: 'ronaldo@prisma.io',
    password,
    educations: {
      createMany: {
        data: [
          {
            institution: 'ABC College',
            level: 'S1',
            major: 'Business Administration',
            startDate: new Date('2012-08-15'),
            endDate: new Date('2014-05-15'),
            isCurrent: false,
          },
        ],
      },
    },
    jobExperiences: {
      createMany: {
        data: [jobExperiences[3], jobExperiences[6]],
      },
    },
    userSkills: {
      createMany: {
        data: skillIds[1].map((skillId) => ({ skillId })),
      },
    },
  },
  {
    profile: {
      create: {
        name: 'Messi',
      },
    },
    email: 'messi@prisma.io',
    password,
    educations: {
      createMany: {
        data: [
          {
            institution: 'DEF University',
            level: 'S1',
            major: 'Electrical Engineering',
            startDate: new Date('2018-09-01'),
            endDate: new Date('2020-06-01'),
            isCurrent: false,
          },
        ],
      },
    },
    jobExperiences: {
      createMany: {
        data: [jobExperiences[2], jobExperiences[5]],
      },
    },
    userSkills: {
      createMany: {
        data: skillIds[2].map((skillId) => ({ skillId })),
      },
    },
  },
  {
    profile: {
      create: {
        name: 'Salah',
      },
    },
    email: 'salah@prisma.io',
    password,
    educations: {
      createMany: {
        data: [
          {
            institution: 'GHI Institute of Technology',
            level: 'S1',
            major: 'Physics',
            startDate: new Date('2015-09-01'),
            endDate: new Date('2020-12-15'),
            isCurrent: false,
          },
        ],
      },
    },
    jobExperiences: {
      createMany: {
        data: [jobExperiences[1], jobExperiences[4]],
      },
    },
    userSkills: {
      createMany: {
        data: skillIds[3].map((skillId) => ({ skillId })),
      },
    },
  },
]

export default usersData
