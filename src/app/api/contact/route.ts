import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import { ContactEnquiry } from '@/models/index'

export async function GET(req: NextRequest) {
  try {
    const limit = req.nextUrl.searchParams.get('limit') || '5'
    const limitNum = Math.min(parseInt(limit), 100)

    await connectDB()
    const enquiries = await ContactEnquiry.find()
      .sort({ createdAt: -1 })
      .limit(limitNum)
      .lean()

    return NextResponse.json({ success: true, data: enquiries }, { status: 200 })
  } catch (err) {
    console.error('Get enquiries API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone, eventDate, venue, message } = body

    // Basic validation
    if (!name || !email || !phone || !message) {
      return NextResponse.json({ error: 'Required fields missing' }, { status: 400 })
    }

    // Sanitize
    const sanitize = (s: string) => s?.trim().slice(0, 2000) || ''

    await connectDB()

    const enquiry = await ContactEnquiry.create({
      name: sanitize(name),
      email: sanitize(email).toLowerCase(),
      phone: sanitize(phone),
      eventDate: sanitize(eventDate),
      venue: sanitize(venue),
      message: sanitize(message),
    })

    // Try sending email (non-blocking)
    try {
      const { sendContactEmail } = await import('@/lib/email')
      await sendContactEmail({ name, email, phone, eventDate, venue, message })
    } catch (emailErr) {
      console.error('Email send failed:', emailErr)
    }

    return NextResponse.json({ success: true, id: enquiry._id }, { status: 201 })
  } catch (err) {
    console.error('Contact API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
