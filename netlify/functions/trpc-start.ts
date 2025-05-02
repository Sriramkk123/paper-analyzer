import { createClient } from '@supabase/supabase-js'
import { v4 as uuidv4 } from 'uuid'

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
)

export default async function handler(request: Request) {
  try {
    const input = await request.json()
    const jobId = uuidv4()
    // Insert initial job record
    await supabase.from('jobs').insert({
      job_id: jobId,
      status: 'processing',
      created_at: new Date().toISOString(),
    })
    // Trigger background function asynchronously
    fetch(`${process.env.URL}/.netlify/functions/trpc-background`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jobId, input }),
    })
    // Return jobId immediately
    return new Response(JSON.stringify({ jobId }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err: any) {
    console.error(err)
    console.log(err.message)
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
