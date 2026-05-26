import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import { Testimonial } from '@/models/index'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET(req: NextRequest) {
  try {
    await connectDB()
    const { searchParams } = new URL(req.url)
    const featured = searchParams.get('featured')

    const query: any = { published: true }
    if (featured === 'true') query.featured = true

    const testimonials = await Testimonial.find(query).sort({ order: 1, createdAt: -1 }).lean()
    return NextResponse.json({ testimonials })
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch testimonials' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    await connectDB()
    const body = await req.json()
    const testimonial = await Testimonial.create(body)
    return NextResponse.json(testimonial, { status: 201 })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
