export interface ExperienceProject {
  company: string
  role: string
  industry: string
  period: string
  shortDescription: string
  technologies: string[]
  responsibilities: string[]
  achievements: string[]
}

export interface TimelineEvent {
  status: 'active' | 'completed'
  date: string
  company: string
  role: string
  industry: string
  description: string
  technologies: string[]
  projectData: ExperienceProject
  startYear: string
}
