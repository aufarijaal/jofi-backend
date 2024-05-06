import { Prisma } from '@prisma/client'

const jobCategoryData: Prisma.JobCategoryCreateInput[] = [
  {
    name: 'Technology',
    slug: 'technology',
  },
  {
    name: 'Finance & Accounting',
    slug: 'finance-and-accounting',
  },
  {
    name: 'Health & Science',
    slug: 'health-and-science',
  },
  {
    name: 'Marketing & Social Media',
    slug: 'marketing-and-social-media',
  },
  {
    name: 'Design & Creative',
    slug: 'design-and-creative',
  },
  {
    name: 'Admin & Ops',
    slug: 'admin-and-ops',
  },
  {
    name: 'Recruiting & People',
    slug: 'recruiting-and-people',
  },
  {
    name: 'Food & Culinary',
    slug: 'food-and-culinary',
  },
  {
    name: 'Legal Services',
    slug: 'legal-services',
  },
  {
    name: 'Security and Protective Services',
    slug: 'security-and-protective-services',
  },
]

export default jobCategoryData
