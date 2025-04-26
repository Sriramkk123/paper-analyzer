import { initTRPC } from '@trpc/server'
import { z } from 'zod'
import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

const t = initTRPC.create()

// Zod schema for AI-generated breakdown fields
const AIBreakdownSchema = z.object({
  backgroundRelatedWork: z.array(z.string()),
  keyContributions: z.array(z.string()),
  evaluationMetrics: z.array(z.string()),
  datasetSetup: z.array(z.string()),
  discussionInsightsApplications: z.array(z.string()),
  problemStatement: z.object({
    challenges: z.array(z.string()),
    limitations: z.array(z.string())
  }),
  proposedSolution: z.object({
    methodologies: z.array(z.string()),
    approaches: z.array(z.string()),
    implementation: z.string()
  }),
  results: z.object({
    metrics: z.array(z.string()),
    comparison: z.array(z.string()),
    achievements: z.array(z.string())
  }),
  futureWork: z.array(z.string())
})

export const appRouter = t.router({
  generateBreakdown: t.procedure
    .input(z.object({
      id: z.string(),
      title: z.string(),
      publicationDate: z.string(),
      authors: z.array(z.object({ name: z.string(), affiliation: z.string() })),
      abstract: z.string(),
      fullText: z.string(),
      rawXml: z.string(),
    }))
    .output(AIBreakdownSchema)
    .mutation(async ({ input }) => {
      const apiKey = process.env.OPENAI_API_KEY
      if (!apiKey) {
        console.error('Missing OPENAI_API_KEY')
        throw new Error('Something went wrong! Please try again')
      }
      const systemPrompt = `You are a helpful assistant generating a structured breakdown for a research paper. You will receive the paper's metadata (id, title, publicationDate, authors, abstract, fullText) and the full raw XML content in the field rawXml. Use the XML to enrich and validate extracted details. Output must exactly match this JSON schema for the breakdown (no extra fields, no commentary):
{"type":"object","properties":{
  "backgroundRelatedWork":{"type":"array","items":{"type":"string"}},
  "keyContributions":{"type":"array","items":{"type":"string"}},
  "evaluationMetrics":{"type":"array","items":{"type":"string"}},
  "datasetSetup":{"type":"array","items":{"type":"string"}},
  "discussionInsightsApplications":{"type":"array","items":{"type":"string"}},
  "problemStatement":{"type":"object","properties":{"challenges":{"type":"array","items":{"type":"string"}},"limitations":{"type":"array","items":{"type":"string"}}},"required":["challenges","limitations"]},
  "proposedSolution":{"type":"object","properties":{"methodologies":{"type":"array","items":{"type":"string"}},"approaches":{"type":"array","items":{"type":"string"}},"implementation":{"type":"string"}},"required":["methodologies","approaches","implementation"]},
  "results":{"type":"object","properties":{"metrics":{"type":"array","items":{"type":"string"}},"comparison":{"type":"array","items":{"type":"string"}},"achievements":{"type":"array","items":{"type":"string"}}},"required":["metrics","comparison","achievements"]},
  "futureWork":{"type":"array","items":{"type":"string"}}},"required":["backgroundRelatedWork","keyContributions","evaluationMetrics","datasetSetup","discussionInsightsApplications","problemStatement","proposedSolution","results","futureWork"]}`
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-4',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: JSON.stringify(input) }
          ],
          temperature: 0.2
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`
          }
        }
      )
      const text = response.data.choices[0]?.message?.content
      if (!text) throw new Error('No content from OpenAI')
      let parsed: unknown
      try {
        parsed = JSON.parse(text)
      } catch {
        console.error('Failed to parse JSON:', text)
        throw new Error('Something went wrong! Please try again')
      }
      return AIBreakdownSchema.parse(parsed)
    })
})

export type AppRouter = typeof appRouter
