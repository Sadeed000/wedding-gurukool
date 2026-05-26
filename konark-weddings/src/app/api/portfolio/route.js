import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Portfolio from '@/models/Portfolio'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

function createSlug(str) {
  return str.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-')
}

export async function GET(req) {
  try {
    await connectDB()
    const session = await getServerSession(authOptions)
    const isAdmin = Boolean(session)
    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const location = searchParams.get('location')
    const style = searchParams.get('style')
    const venueType = searchParams.get('venueType')
    const featured = searchParams.get('featured')

    const query = isAdmin ? {} : { published: true }
    if (location) query.location = new RegExp(location, 'i')
    if (style) query.style = style
    if (venueType) query.venueType = venueType
    if (featured === 'true') query.featured = true

    const [items, total] = await Promise.all([
      Portfolio.find(query).sort({ order: 1, createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean(),
      Portfolio.countDocuments(query),
    ])

    return NextResponse.json({ items, total, page, pages: Math.ceil(total / limit) })
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch portfolio' }, { status: 500 })
  }
}

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    await connectDB()
    const body = await req.json()
    const slug = body.slug || createSlug(body.title + '-' + Date.now())
    const item = await Portfolio.create({ ...body, slug })
    return NextResponse.json(item, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
