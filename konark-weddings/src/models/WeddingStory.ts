import mongoose, { Schema, Document } from 'mongoose'

export interface IGalleryImage {
  url: string
  alt: string
  caption?: string
}

export interface IWeddingStory extends Document {
  slug: string
  coupleNames: string
  title: string
  teaser: string
  content: string
  featuredImage: string
  gallery: IGalleryImage[]
  venue: string
  location: string
  eventDate: Date
  style: string[]
  published: boolean
  featured: boolean
  metaTitle?: string
  metaDescription?: string
  views: number
  createdAt: Date
  updatedAt: Date
}

const GalleryImageSchema = new Schema<IGalleryImage>({
  url: { type: String, required: true },
  alt: { type: String, required: true },
  caption: String,
}, { _id: false })

const WeddingStorySchema = new Schema<IWeddingStory>({
  slug: { type: String, required: true, unique: true, index: true },
  coupleNames: { type: String, required: true },
  title: { type: String, required: true },
  teaser: { type: String, required: true, maxlength: 300 },
  content: { type: String, required: true },
  featuredImage: { type: String, required: true },
  gallery: [GalleryImageSchema],
  venue: { type: String, required: true },
  location: { type: String, required: true },
  eventDate: { type: Date, required: true },
  style: [{ type: String }],
  published: { type: Boolean, default: false },
  featured: { type: Boolean, default: false },
  metaTitle: String,
  metaDescription: String,
  views: { type: Number, default: 0 },
}, { timestamps: true })

WeddingStorySchema.index({ location: 1, style: 1, published: 1 })

export default mongoose.models.WeddingStory || mongoose.model<IWeddingStory>('WeddingStory', WeddingStorySchema)
