import mongoose, { Schema, Document } from 'mongoose'

export interface ITestimonial extends Document {
  clientName: string
  coupleNames?: string
  location?: string
  content: string
  rating: number
  image?: string
  eventDate?: Date
  published: boolean
  featured: boolean
  order: number
  createdAt: Date
}

const TestimonialSchema = new Schema<ITestimonial>({
  clientName: { type: String, required: true },
  coupleNames: String,
  location: String,
  content: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, default: 5 },
  image: String,
  eventDate: Date,
  published: { type: Boolean, default: true },
  featured: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
}, { timestamps: true })

export const Testimonial = mongoose.models.Testimonial || mongoose.model<ITestimonial>('Testimonial', TestimonialSchema)

// Contact Enquiry
export interface IContactEnquiry extends Document {
  name: string
  email: string
  phone: string
  eventDate?: string
  venue?: string
  message: string
  status: 'new' | 'read' | 'replied'
  createdAt: Date
}

const ContactEnquirySchema = new Schema<IContactEnquiry>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  eventDate: String,
  venue: String,
  message: { type: String, required: true },
  status: { type: String, enum: ['new', 'read', 'replied'], default: 'new' },
}, { timestamps: true })

export const ContactEnquiry = mongoose.models.ContactEnquiry || mongoose.model<IContactEnquiry>('ContactEnquiry', ContactEnquirySchema)
