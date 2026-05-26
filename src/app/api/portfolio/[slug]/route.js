import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Portfolio from '@/models/Portfolio'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET(req, { params }) {
  try {
    await connectDB()
    const isId = /^[a-f\d]{24}$/i.test(params.slug)
    const item = isId
      ? await Portfolio.findById(params.slug).lean()
      : await Portfolio.findOne({ slug: params.slug, published: true }).lean()
    if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(item)
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
  const item = isId
    ? await Portfolio.findByIdAndUpdate(params.slug, body, { new: true })
    : await Portfolio.findOneAndUpdate({ slug: params.slug }, body, { new: true })
  if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(item)
}

export async function DELETE(req, { params }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  await connectDB()
  const isId = /^[a-f\d]{24}$/i.test(params.slug)
  if (isId) await Portfolio.findByIdAndDelete(params.slug)
  else await Portfolio.findOneAndDelete({ slug: params.slug })
  return NextResponse.json({ message: 'Deleted' })
}
