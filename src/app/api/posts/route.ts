import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import WeddingStory from '@/models/WeddingStory'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { createSlug } from '@/lib/utils'

export async function GET(req: NextRequest) {
  try {
    await connectDB()
    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const location = searchParams.get('location')
    const style = searchParams.get('style')
    const featured = searchParams.get('featured')

    const query: any = { published: true }
    if (location) query.location = new RegExp(location, 'i')
    if (style) query.style = style
    if (featured === 'true') query.featured = true

    const [stories, total] = await Promise.all([
      WeddingStory.find(query)
        .sort({ eventDate: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .select('-content')
        .lean(),
      WeddingStory.countDocuments(query),
    ])

    return NextResponse.json({ stories, total, page, pages: Math.ceil(total / limit) })
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch stories' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    await connectDB()
    const body = await req.json()
    const slug = createSlug(body.coupleNames + '-' + Date.now())

    const story = await WeddingStory.create({ ...body, slug })
    return NextResponse.json(story, { status: 201 })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
