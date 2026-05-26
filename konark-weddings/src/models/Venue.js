import mongoose from 'mongoose'

const VenueSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  description: { type: String, required: true },
  highlights: [String],
  whyChoose: [String],
  nearbyAttractions: [String],
  featuredImage: { type: String, default: '' },
  images: { type: [{ url: String, alt: String, _id: false }], default: [] },
  venueType: { type: String, required: true },
  capacity: { min: { type: Number, default: 50 }, max: { type: Number, default: 500 } },
  priceRange: String,
  amenities: [String],
  indoorAvailable: { type: Boolean, default: true },
  outdoorAvailable: { type: Boolean, default: false },
  trending: { type: Boolean, default: false },
  featured: { type: Boolean, default: false },
  published: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
  metaTitle: String,
  metaDescription: String,
}, { timestamps: true })

VenueSchema.index({ city: 1, venueType: 1, published: 1 })

export default mongoose.models.Venue || mongoose.model('Venue', VenueSchema)
