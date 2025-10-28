// /components/recruitment/types.ts

export interface Position {
    id: string
    title: string
    division: string
    image: string
    shortDesc: string
    fullDescription: string
    requirements: string[]
    responsibilities: string[]
    benefits: string[]
    salary?: string
    type: string
  }