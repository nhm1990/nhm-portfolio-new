export type SkillLevel = 'expert' | 'advanced' | 'intermediate'

export interface Skill {
  name: string
  level: SkillLevel
  url?: string
}

export interface SkillCategory {
  name: string
  skills: Skill[]
}

export interface Certification {
  name: string
  issuer: string
  date: string
}

export interface Language {
  name: string
  level: string
}

export interface SkillsContent {
  title: string
  categories: SkillCategory[]
  certifications: Certification[]
  languages: Language[]
}
