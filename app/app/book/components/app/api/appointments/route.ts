import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    if (!body.ownerName || !body.phone || !body.petName || !body.date || !body.time) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    const { data, error } = await supabase.from('appointments').insert({
      owner_name: body.ownerName,
      phone: body.phone,
      email: body.email,
      carrier: body.carrier || null,
      sms_opt_in: body.smsOptIn ?? true,
      pet_name: body.petName,
      breed: body.breed,
      weight: body.weight,
      service: body.service,
      notes: body.notes,
      date: body.date,
      time: body.time,
      status: 'requested'
    }).select().single()
    if (error) throw error
    return NextResponse.json({ ok: true, appointment: data })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

export async function GET() {
  const { data, error } = await supabase.from('appointments').select('*').order('created_at', { ascending: false }).limit(10)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ appointments: data })
}
