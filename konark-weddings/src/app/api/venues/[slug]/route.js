import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Venue from '@/models/Venue'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET(req, { params }) {
  try {
    await connectDB()
    const isId = /^[a-f\d]{24}$/i.test(params.slug)
    const venue = isId
      ? await Venue.findById(params.slug).lean()
      : await Venue.findOne({ slug: params.slug, published: true }).lean()
    if (!venue) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(venue)
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function PUT(req, { params }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  await connectDB()
  const body = await req.json()
  const isId = /^[a-f\d]{24}$/i.test(params.slug)
  const venue = isId
    ? await Venue.findByIdAndUpdate(params.slug, body, { new: true })
    : await Venue.findOneAndUpdate({ slug: params.slug }, body, { new: true })
  if (!venue) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(venue)
}

export async function DELETE(req, { params }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  await connectDB()
  const isId = /^[a-f\d]{24}$/i.test(params.slug)
  if (isId) await Venue.findByIdAndDelete(params.slug)
  else await Venue.findOneAndDelete({ slug: params.slug })
  return NextResponse.json({ message: 'Deleted' })
}
