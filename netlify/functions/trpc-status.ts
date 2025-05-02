import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
)

export default async function handler(request: Request) {
  try {
    const url = new URL(request.url)
    const jobId = url.searchParams.get('jobId')
    if (!jobId) throw new Error('Missing jobId')

    const { data, error } = await supabase
      .from('jobs')
      .select('status, result')
      .eq('job_id', jobId)
      .single()

    if (error) throw error

    return new Response(JSON.stringify({ status: data.status, result: data.result }), { status: 200, headers: { 'Content-Type': 'application/json' } })
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { 'Content-Type': 'application/json' } })
  }
}
