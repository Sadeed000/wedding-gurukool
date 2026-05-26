import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import WeddingStory from '@/models/WeddingStory';

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  const story = await WeddingStory.findById(params.id);
  if (!story) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(story);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  await connectDB();
  const body = await req.json();
  const story = await WeddingStory.findByIdAndUpdate(params.id, body, { new: true });
  if (!story) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(story);
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  await connectDB();
  await WeddingStory.findByIdAndDelete(params.id);
  return NextResponse.json({ message: 'Deleted' });
}
