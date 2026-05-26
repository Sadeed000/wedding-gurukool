import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import BlogPost from '@/models/BlogPost'
import Portfolio from '@/models/Portfolio'
import Venue from '@/models/Venue'
import { ContactEnquiry } from '@/models/index'

export async function GET() {
  try {
    await connectDB()

    const [blogs, portfolios, venues, enquiries] = await Promise.all([
      BlogPost.countDocuments(),
      Portfolio.countDocuments(),
      Venue.countDocuments(),
      ContactEnquiry.countDocuments(),
    ])

    return NextResponse.json({ blogs, portfolios, venues, enquiries })
  } catch (err) {
    console.error('Admin stats error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
