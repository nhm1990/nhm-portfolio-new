export interface Client {
  name: string
  logo: string
  url?: string
}

export interface Project {
  id: number
  title: string
  client: string
  category: string
  description: string
  image: string
  technologies: string[]
  highlights: string[]
  link?: string
}

export interface PortfolioContent {
  locale: string
  hero: {
    greeting: string
    title: string
    description: string
  }
  clients: {
    title: string
    subtitle: string
    cta: string
    list: Client[]
  }
  portfolio: {
    title: string
    subtitle: string
    projects: Project[]
  }
  contact: {
    title: string
    subtitle: string
    email: string
    linkedin: string
    github: string
  }
}
