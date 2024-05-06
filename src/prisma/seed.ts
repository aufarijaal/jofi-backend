import { PrismaClient, Prisma } from '@prisma/client'
import usersData from './seeders/user-seeder'
import companiesData from './seeders/company-seeder'
import employersData from './seeders/employer-seeder'
import jobCategoryData from './seeders/job-category-seeder'
import jobsData from './seeders/job-seeder'
import skillData from './seeders/skill-seeder'

const prisma = new PrismaClient()

async function main() {
  // const {
  //   values: { seeder },
  // } = parseArgs({
  //   options: {
  //     seeder: {
  //       type: 'string',
  //     },
  //   },
  // })

  // await prisma.$transaction(async )
  console.log(`Start seeding ...`)

  // skills
  // const createdSkills = await prisma.skill.createMany({
  //   data: skillData as any,
  // })
  // console.log(`${createdSkills.count} skill data created successfully`)

  // console.log(`Seeding finished.`)

  // const createdAdmin = await prisma.admin.create({
  //   data: {
  //     username: 'aufarijal',
  //     password: 'rahasia',
  //   },
  // })
  // console.log(`Created user with id: ${createdAdmin.id}`)

  // // users
  // for (const user of usersData) {
  //   const createdUser = await prisma.user.create({
  //     data: user,
  //   })
  //   console.log(`Created user with id: ${createdUser.id}`)
  // }

  // // companies
  // for (const c of companiesData) {
  //   const createdCompany = await prisma.company.create({
  //     data: c,
  //   })
  //   console.log(`Created company with id: ${createdCompany.id}`)
  // }

  // // employers
  // const employerCreationPromises = employersData.map((employer) =>
  //   prisma.user.create({ data: employer })
  // )

  // Promise.all(employerCreationPromises).then((result) =>
  //   console.log(`${result.length} employer data created`)
  // )

  // // // job categories
  // for (const j of jobCategoryData) {
  //   const createdJobCategory = await prisma.jobCategory.create({
  //     data: j,
  //   })
  //   console.log(`Created job category with id: ${createdJobCategory.id}`)
  // }

  // // // jobs
  // const createdJobs = await prisma.job.createMany(jobsData)
  // console.log(`Created job category with id: ${createdJobs.count}`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
