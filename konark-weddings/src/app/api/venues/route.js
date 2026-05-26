import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Venue from '@/models/Venue'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

function createSlug(str) {
  return str.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-')
}

export async function GET(req) {
  try {
    await connectDB()
    const { searchParams } = new URL(req.url)
    const city = searchParams.get('city')
    const venueType = searchParams.get('venueType')
    const trending = searchParams.get('trending')
    const search = searchParams.get('search')
    const featured = searchParams.get('featured')

    const query = { published: true }
    if (city) query.city = new RegExp(city, 'i')
    if (venueType) query.venueType = venueType
    if (trending === 'true') query.trending = true
    if (featured === 'true') query.featured = true
    if (search) query.$or = [
      { name: new RegExp(search, 'i') },
      { city: new RegExp(search, 'i') },
      { state: new RegExp(search, 'i') },
    ]

    const venues = await Venue.find(query).sort({ order: 1, createdAt: -1 }).lean()
    return NextResponse.json({ venues })
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch venues' }, { status: 500 })
  }
}

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    await connectDB()
    const body = await req.json()
    const slug = body.slug || createSlug(body.name + '-' + body.city)
    const venue = await Venue.create({ ...body, slug })
    return NextResponse.json(venue, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
