export interface Author {
  name: string
  affiliation: string
}

export interface PaperData {
  id: string
  title: string
  publicationDate: string
  authors: Author[]
  abstract: string
  fullText: string
  rawXml: string
}

export interface PaperBreakdown {
  title: string
  publicationDate: string
  authors: Author[]
  abstract: string
  backgroundRelatedWork: string[]
  keyContributions: string[]
  evaluationMetrics: string[]
  datasetSetup: string[]
  discussionInsightsApplications: string[]
  problemStatement: {
    challenges: string[]
    limitations: string[]
  }
  proposedSolution: {
    methodologies: string[]
    approaches: string[]
    implementation: string
  }
  results: {
    metrics: string[]
    comparison: string[]
    achievements: string[]
  }
  futureWork: string[]
}

export interface ChatMessage {
  text: string
  isUser: boolean
  timestamp: Date
}