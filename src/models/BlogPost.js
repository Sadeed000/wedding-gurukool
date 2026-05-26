import mongoose from 'mongoose'

const BlogPostSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true, index: true },
  title: { type: String, required: true },
  excerpt: { type: String, required: true, maxlength: 500 },
  content: { type: String, required: true },
  featuredImage: { type: String, default: '' },
  images: [{ url: String, alt: String, _id: false }],
  category: { type: String, required: true },
  tags: [String],
  author: { type: String, default: 'Wedding Gurukul' },
  published: { type: Boolean, default: false },
  featured: { type: Boolean, default: false },
  metaTitle: String,
  metaDescription: String,
  metaKeywords: String,
  views: { type: Number, default: 0 },
}, { timestamps: true })

BlogPostSchema.index({ category: 1, published: 1, createdAt: -1 })

export default mongoose.models.BlogPost || mongoose.model('BlogPost', BlogPostSchema)
