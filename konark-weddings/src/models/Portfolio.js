import mongoose from 'mongoose'

const PortfolioSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, default: 'Portfolio Item' },
  description: { type: String, default: '' },
  content: { type: String, default: '' },
  featuredImage: { type: String, default: '' },
  images: { type: [{ url: String, alt: String, _id: false }], default: [] },
  venue: { type: String, default: '' },
  location: { type: String, default: '' },
  eventDate: Date,
  style: { type: [String], default: [] },
  venueType: { type: String, default: '' },
  eventType: { type: String, default: '' },
  published: { type: Boolean, default: false },
  featured: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
  metaTitle: String,
  metaDescription: String,
}, { timestamps: true })

PortfolioSchema.index({ location: 1, venueType: 1, style: 1, published: 1 })

export default mongoose.models.Portfolio || mongoose.model('Portfolio', PortfolioSchema)
