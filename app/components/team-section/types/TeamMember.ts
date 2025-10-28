export interface TeamMember {
  id: number
  name: string
  role: string
  division: string
  bio: string
  image: string
  social: {
    linkedin?: string
    twitter?: string
    instagram?: string
  }
}
