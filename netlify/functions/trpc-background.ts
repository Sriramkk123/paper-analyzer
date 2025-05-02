import { createClient } from '@supabase/supabase-js';
import { appRouter } from '../../server/trpc.js';

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
)

// Background function to process AI job and update Supabase
export default async function handler(request: Request) {
  // Parse job identifier and input
  const { jobId, input } = await request.json()
  console.log("Input", input)
  console.log("Job ID", jobId)
  try {
    // Run AI breakdown via tRPC router
    const breakdown = await appRouter.createCaller({}).generateBreakdown(input)
    // Update job record with result
    await supabase
      .from('jobs')
      .update({ status: 'done', result: breakdown })
      .eq('job_id', jobId)
  } catch (err: any) {
    console.error('Background job failed:', err)
    // Mark job as failed
    await supabase
      .from('jobs')
      .update({ status: 'failed' })
      .eq('job_id', jobId)
  }
  // Acknowledge background processing
  return new Response(null, { status: 202 })
}
