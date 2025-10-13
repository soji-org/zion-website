import { NextResponse } from 'next/server'
import { z } from 'zod'
import { getDB } from '@/lib/db'

const Schema = z.object({
  email: z.string().email(),
  reason: z.enum(['no_longer_needed', 'privacy_concern', 'duplicate_account', 'other']),
  message: z.string().max(1000).optional().default(''),
  consent: z.boolean().refine(v => v === true, { message: 'Consent is required.' })
})

export async function POST(req: Request){
  try{
    const json = await req.json()
    const parsed = Schema.parse(json)

    const db = getDB()
    const stmt = db.prepare('INSERT INTO deletion_requests (email, reason, message) VALUES (@email, @reason, @message)')
    const info = stmt.run(parsed)

    return NextResponse.json({ ok: true, id: info.lastInsertRowid, message: "Your request has been received. We'll email you shortly." })
  }catch(err: any){
    if (err?.issues) return NextResponse.json({ ok: false, error: 'Invalid input', details: err.issues }, { status: 400 })
    console.error(err)
    return NextResponse.json({ ok: false, error: 'Server error' }, { status: 500 })
  }
}
