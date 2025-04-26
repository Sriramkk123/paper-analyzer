import type { PaperData, PaperBreakdown } from '../types/paper'
import { trpc } from '../utils/trpc'

/**
 * Calls server-side OpenAI to generate a structured PaperBreakdown from raw PaperData
 */
export async function generateBreakdown(data: PaperData): Promise<PaperBreakdown> {
  const breakdown = await trpc.generateBreakdown.mutate(data)
  return {
    title: data.title,
    publicationDate: data.publicationDate,
    authors: data.authors,
    abstract: data.abstract,
    backgroundRelatedWork: breakdown.backgroundRelatedWork,
    keyContributions: breakdown.keyContributions,
    evaluationMetrics: breakdown.evaluationMetrics,
    datasetSetup: breakdown.datasetSetup,
    discussionInsightsApplications: breakdown.discussionInsightsApplications,
    problemStatement: breakdown.problemStatement,
    proposedSolution: breakdown.proposedSolution,
    results: breakdown.results,
    futureWork: breakdown.futureWork
  }
}
