import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import BlogPost from '@/models/BlogPost'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET(req, { params }) {
  try {
    await connectDB()
    // Support fetch by slug OR by _id
    const isId = /^[a-f\d]{24}$/i.test(params.slug)
    const post = isId
      ? await BlogPost.findById(params.slug).lean()
      : await BlogPost.findOneAndUpdate(
          { slug: params.slug, published: true },
          { $inc: { views: 1 } },
          { new: true }
        ).lean()

    if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(post)
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch blog' }, { status: 500 })
  }
}

export async function PUT(req, { params }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    await connectDB()
    const body = await req.json()
    const isId = /^[a-f\d]{24}$/i.test(params.slug)
    const post = isId
      ? await BlogPost.findByIdAndUpdate(params.slug, body, { new: true })
      : await BlogPost.findOneAndUpdate({ slug: params.slug }, body, { new: true })

    if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(post)
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function DELETE(req, { params }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    await connectDB()
    const isId = /^[a-f\d]{24}$/i.test(params.slug)
    if (isId) await BlogPost.findByIdAndDelete(params.slug)
    else await BlogPost.findOneAndDelete({ slug: params.slug })

    return NextResponse.json({ message: 'Deleted' })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
