import { Prisma } from '@prisma/client'

const jobsData: Prisma.JobCreateManyArgs = {
  data: [
    {
      title: 'Laravel Developer',
      description:
        'Ex ad veniam dolor minim pariatur. Qui adipisicing do esse consectetur. Ut officia labore velit est do ea. Cillum culpa elit et ex enim nulla magna laboris duis fugiat in. Nostrud duis ex enim aliquip nostrud. Qui occaecat nulla nostrud incididunt pariatur nostrud nisi ea velit quis pariatur culpa. Fugiat mollit elit cillum adipisicing fugiat exercitation adipisicing.',
      requirements:
        'Build Web Application (PHP, Laravel)~Experienced in making or integrating API~Experienced in using versioning control (git)~Good knowledge of relational databases~Participate in new product or new feature design~Create reusable, efficient, and performable codes~Work with own initiative to solve challenging problems and concepts~Able to debug code~Diploma / Associate’s Degree / Bachelor’s degree in Computer Science or related departments~Have minimum 1 year of experience~< 30 years old~Located / willing to be placed in Yogyakarta~Working days : Monday - Friday, 8 AM - 5 PM',
      location: 'Jakarta, Indonesia',
      salary: 3000000,
      createdAt: new Date(),
      companyId: 1,
      employerId: 1,
      jobCategoryId: 1,
    },
    {
      title: 'System Administrator',
      description:
        'Ex ad veniam dolor minim pariatur. Qui adipisicing do esse consectetur. Ut officia labore velit est do ea. Cillum culpa elit et ex enim nulla magna laboris duis fugiat in. Nostrud duis ex enim aliquip nostrud. Qui occaecat nulla nostrud incididunt pariatur nostrud nisi ea velit quis pariatur culpa. Fugiat mollit elit cillum adipisicing fugiat exercitation adipisicing.',
      requirements:
        "Bachelor's degree~2+ years of relevant experience~Strong communication skills~Team player~Analytical mindset~Problem-solving abilities~Adaptability~Attention to detail~Project management skills~Technical proficiency",
      location: 'Bogor, Indonesia',
      salary: 2_000_000,
      createdAt: new Date(),
      companyId: 3,
      employerId: 2,
      jobCategoryId: 1,
    },
    {
      title: 'Human Resource',
      description:
        'Ex ad veniam dolor minim pariatur. Qui adipisicing do esse consectetur. Ut officia labore velit est do ea. Cillum culpa elit et ex enim nulla magna laboris duis fugiat in. Nostrud duis ex enim aliquip nostrud. Qui occaecat nulla nostrud incididunt pariatur nostrud nisi ea velit quis pariatur culpa. Fugiat mollit elit cillum adipisicing fugiat exercitation adipisicing.',
      requirements:
        "Bachelor's degree~2+ years of relevant experience~Strong communication skills~Team player~Analytical mindset~Problem-solving abilities~Adaptability~Attention to detail~Project management skills~Technical proficiency",
      location: 'Jakarta, Indonesia',
      salary: 5_500_000,
      createdAt: new Date(),
      companyId: 1,
      employerId: 1,
      jobCategoryId: 1,
    },
    {
      title: 'Marketing Manager',
      description:
        'Ex ad veniam dolor minim pariatur. Qui adipisicing do esse consectetur. Ut officia labore velit est do ea. Cillum culpa elit et ex enim nulla magna laboris duis fugiat in. Nostrud duis ex enim aliquip nostrud. Qui occaecat nulla nostrud incididunt pariatur nostrud nisi ea velit quis pariatur culpa. Fugiat mollit elit cillum adipisicing fugiat exercitation adipisicing.',
      requirements:
        "Bachelor's degree~2+ years of relevant experience~Strong communication skills~Team player~Analytical mindset~Problem-solving abilities~Adaptability~Attention to detail~Project management skills~Technical proficiency",
      location: 'Bogor, Indonesia',
      salary: 2_500_000,
      createdAt: new Date(),
      companyId: 3,
      employerId: 2,
      jobCategoryId: 4,
    },
    {
      title: 'Graphic Designer',
      description:
        'Ex ad veniam dolor minim pariatur. Qui adipisicing do esse consectetur. Ut officia labore velit est do ea. Cillum culpa elit et ex enim nulla magna laboris duis fugiat in. Nostrud duis ex enim aliquip nostrud. Qui occaecat nulla nostrud incididunt pariatur nostrud nisi ea velit quis pariatur culpa. Fugiat mollit elit cillum adipisicing fugiat exercitation adipisicing.',
      requirements:
        "Bachelor's degree~2+ years of relevant experience~Strong communication skills~Team player~Analytical mindset~Problem-solving abilities~Adaptability~Attention to detail~Project management skills~Technical proficiency",
      location: 'Jakarta, Indonesia',
      salary: 3_500_000,
      createdAt: new Date(),
      companyId: 1,
      employerId: 1,
      jobCategoryId: 5,
    },
    {
      title: 'Electrician',
      description:
        'Ex ad veniam dolor minim pariatur. Qui adipisicing do esse consectetur. Ut officia labore velit est do ea. Cillum culpa elit et ex enim nulla magna laboris duis fugiat in. Nostrud duis ex enim aliquip nostrud. Qui occaecat nulla nostrud incididunt pariatur nostrud nisi ea velit quis pariatur culpa. Fugiat mollit elit cillum adipisicing fugiat exercitation adipisicing.',
      requirements:
        "Bachelor's degree~2+ years of relevant experience~Strong communication skills~Team player~Analytical mindset~Problem-solving abilities~Adaptability~Attention to detail~Project management skills~Technical proficiency",
      location: 'Bogor, Indonesia',
      salary: 2_700_000,
      createdAt: new Date(),
      companyId: 3,
      employerId: 2,
      jobCategoryId: 1,
    },
    {
      title: 'Data Scientist',
      description:
        'Ex ad veniam dolor minim pariatur. Qui adipisicing do esse consectetur. Ut officia labore velit est do ea. Cillum culpa elit et ex enim nulla magna laboris duis fugiat in. Nostrud duis ex enim aliquip nostrud. Qui occaecat nulla nostrud incididunt pariatur nostrud nisi ea velit quis pariatur culpa. Fugiat mollit elit cillum adipisicing fugiat exercitation adipisicing.',
      requirements:
        "Bachelor's degree~2+ years of relevant experience~Strong communication skills~Team player~Analytical mindset~Problem-solving abilities~Adaptability~Attention to detail~Project management skills~Technical proficiency",
      location: 'Jakarta, Indonesia',
      salary: 4_000_000,
      createdAt: new Date(),
      companyId: 1,
      employerId: 1,
      jobCategoryId: 1,
    },
    {
      title: 'Legal Assistant',
      description:
        'Ex ad veniam dolor minim pariatur. Qui adipisicing do esse consectetur. Ut officia labore velit est do ea. Cillum culpa elit et ex enim nulla magna laboris duis fugiat in. Nostrud duis ex enim aliquip nostrud. Qui occaecat nulla nostrud incididunt pariatur nostrud nisi ea velit quis pariatur culpa. Fugiat mollit elit cillum adipisicing fugiat exercitation adipisicing.',
      requirements:
        "Bachelor's degree~2+ years of relevant experience~Strong communication skills~Team player~Analytical mindset~Problem-solving abilities~Adaptability~Attention to detail~Project management skills~Technical proficiency",
      location: 'Bogor, Indonesia',
      salary: 3_100_000,
      createdAt: new Date(),
      companyId: 3,
      employerId: 2,
      jobCategoryId: 2,
    },
    {
      title: 'Network Administrator',
      description:
        'Ex ad veniam dolor minim pariatur. Qui adipisicing do esse consectetur. Ut officia labore velit est do ea. Cillum culpa elit et ex enim nulla magna laboris duis fugiat in. Nostrud duis ex enim aliquip nostrud. Qui occaecat nulla nostrud incididunt pariatur nostrud nisi ea velit quis pariatur culpa. Fugiat mollit elit cillum adipisicing fugiat exercitation adipisicing.',
      requirements:
        "Bachelor's degree~2+ years of relevant experience~Strong communication skills~Team player~Analytical mindset~Problem-solving abilities~Adaptability~Attention to detail~Project management skills~Technical proficiency",
      location: 'Jakarta, Indonesia',
      salary: 3_000_000,
      createdAt: new Date(),
      companyId: 1,
      employerId: 1,
      jobCategoryId: 1,
    },
    {
      title: 'Chef',
      description:
        'Ex ad veniam dolor minim pariatur. Qui adipisicing do esse consectetur. Ut officia labore velit est do ea. Cillum culpa elit et ex enim nulla magna laboris duis fugiat in. Nostrud duis ex enim aliquip nostrud. Qui occaecat nulla nostrud incididunt pariatur nostrud nisi ea velit quis pariatur culpa. Fugiat mollit elit cillum adipisicing fugiat exercitation adipisicing.',
      requirements:
        "Bachelor's degree~2+ years of relevant experience~Strong communication skills~Team player~Analytical mindset~Problem-solving abilities~Adaptability~Attention to detail~Project management skills~Technical proficiency",
      location: 'Bogor, Indonesia',
      salary: 2_100_000,
      createdAt: new Date(),
      companyId: 3,
      employerId: 2,
      jobCategoryId: 8,
    },
    {
      title: 'UX/UI Designer',
      description:
        'Ex ad veniam dolor minim pariatur. Qui adipisicing do esse consectetur. Ut officia labore velit est do ea. Cillum culpa elit et ex enim nulla magna laboris duis fugiat in. Nostrud duis ex enim aliquip nostrud. Qui occaecat nulla nostrud incididunt pariatur nostrud nisi ea velit quis pariatur culpa. Fugiat mollit elit cillum adipisicing fugiat exercitation adipisicing.',
      requirements:
        "Bachelor's degree~2+ years of relevant experience~Strong communication skills~Team player~Analytical mindset~Problem-solving abilities~Adaptability~Attention to detail~Project management skills~Technical proficiency",
      location: 'Jakarta, Indonesia',
      salary: 4_300_000,
      createdAt: new Date(),
      companyId: 1,
      employerId: 1,
      jobCategoryId: 4,
    },
    {
      title: 'Public Relation',
      description:
        'Ex ad veniam dolor minim pariatur. Qui adipisicing do esse consectetur. Ut officia labore velit est do ea. Cillum culpa elit et ex enim nulla magna laboris duis fugiat in. Nostrud duis ex enim aliquip nostrud. Qui occaecat nulla nostrud incididunt pariatur nostrud nisi ea velit quis pariatur culpa. Fugiat mollit elit cillum adipisicing fugiat exercitation adipisicing.',
      requirements:
        "Bachelor's degree~2+ years of relevant experience~Strong communication skills~Team player~Analytical mindset~Problem-solving abilities~Adaptability~Attention to detail~Project management skills~Technical proficiency",
      location: 'Bogor, Indonesia',
      salary: 3_600_000,
      createdAt: new Date(),
      companyId: 3,
      employerId: 2,
      jobCategoryId: 6,
    },
    {
      title: 'Security',
      description:
        'Ex ad veniam dolor minim pariatur. Qui adipisicing do esse consectetur. Ut officia labore velit est do ea. Cillum culpa elit et ex enim nulla magna laboris duis fugiat in. Nostrud duis ex enim aliquip nostrud. Qui occaecat nulla nostrud incididunt pariatur nostrud nisi ea velit quis pariatur culpa. Fugiat mollit elit cillum adipisicing fugiat exercitation adipisicing.',
      requirements:
        "Bachelor's degree~2+ years of relevant experience~Strong communication skills~Team player~Analytical mindset~Problem-solving abilities~Adaptability~Attention to detail~Project management skills~Technical proficiency",
      location: 'Jakarta, Indonesia',
      salary: 2_000_000,
      createdAt: new Date(),
      companyId: 1,
      employerId: 1,
      jobCategoryId: 10,
    },
    {
      title: 'Customer Service',
      description:
        'Ex ad veniam dolor minim pariatur. Qui adipisicing do esse consectetur. Ut officia labore velit est do ea. Cillum culpa elit et ex enim nulla magna laboris duis fugiat in. Nostrud duis ex enim aliquip nostrud. Qui occaecat nulla nostrud incididunt pariatur nostrud nisi ea velit quis pariatur culpa. Fugiat mollit elit cillum adipisicing fugiat exercitation adipisicing.',
      requirements:
        "Bachelor's degree~2+ years of relevant experience~Strong communication skills~Team player~Analytical mindset~Problem-solving abilities~Adaptability~Attention to detail~Project management skills~Technical proficiency",
      location: 'Bogor, Indonesia',
      salary: 3_600_000,
      createdAt: new Date(),
      companyId: 3,
      employerId: 2,
      jobCategoryId: 6,
    },
  ],
}
export default jobsData
