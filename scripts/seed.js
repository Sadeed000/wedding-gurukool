#!/usr/bin/env node
/**
 * Database seed script for Wedding Gurukuls
 * Run: node scripts/seed.js
 * Requires MONGODB_URI in .env.local
 */

require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/konark-weddings';

// ─── Schemas ─────────────────────────────────────────────────────────────────
const UserSchema = new mongoose.Schema({ name: String, email: { type: String, unique: true }, password: String, role: { type: String, default: 'admin' } });

// Add bcrypt hashing middleware
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const WeddingStorySchema = new mongoose.Schema({ slug: String, coupleNames: String, title: String, teaser: String, content: String, featuredImage: String, venue: String, location: String, eventDate: Date, style: [String], published: { type: Boolean, default: false }, featured: { type: Boolean, default: false }, views: { type: Number, default: 0 } }, { timestamps: true });
const PortfolioSchema = new mongoose.Schema({ slug: String, title: String, description: String, featuredImage: String, images: [String], venue: String, location: String, style: [String], venueType: String, published: { type: Boolean, default: true }, featured: { type: Boolean, default: false }, order: Number }, { timestamps: true });
const VenueSchema = new mongoose.Schema({ slug: String, name: String, city: String, state: String, description: String, highlights: [String], featuredImage: String, images: [String], venueType: String, capacity: { min: Number, max: Number }, amenities: [String], trending: Boolean, featured: Boolean, published: { type: Boolean, default: true } }, { timestamps: true });
const BlogPostSchema = new mongoose.Schema({ slug: String, title: String, excerpt: String, content: String, featuredImage: String, category: String, tags: [String], author: { name: String, avatar: String }, published: { type: Boolean, default: false }, featured: Boolean, metaTitle: String, metaDescription: String, views: { type: Number, default: 0 } }, { timestamps: true });
const TestimonialSchema = new mongoose.Schema({ name: String, location: String, rating: Number, text: String, eventType: String, published: { type: Boolean, default: true }, featured: Boolean }, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', UserSchema);
const WeddingStory = mongoose.models.WeddingStory || mongoose.model('WeddingStory', WeddingStorySchema);
const Portfolio = mongoose.models.Portfolio || mongoose.model('Portfolio', PortfolioSchema);
const Venue = mongoose.models.Venue || mongoose.model('Venue', VenueSchema);
const BlogPost = mongoose.models.BlogPost || mongoose.model('BlogPost', BlogPostSchema);
const Testimonial = mongoose.models.Testimonial || mongoose.model('Testimonial', TestimonialSchema);

async function seed() {
  await mongoose.connect(MONGODB_URI);
  console.log('✅ Connected to MongoDB');

  // Clear existing data
  await Promise.all([User.deleteMany(), WeddingStory.deleteMany(), Portfolio.deleteMany(), Venue.deleteMany(), BlogPost.deleteMany(), Testimonial.deleteMany()]);
  console.log('🗑  Cleared existing data');

  // Admin user
  await User.create({ name: 'Konark Admin', email: 'admin@konarkweddings.com', password: 'admin123', role: 'admin' });
  console.log('👤 Admin user created: admin@konarkweddings.com / admin123');

  // Wedding Stories
  await WeddingStory.insertMany([
    { slug: 'rashi-dhruv-udaipur', coupleNames: 'Rashi & Dhruv', title: 'A Royal Udaipur Affair — Rashi & Dhruv', teaser: 'Against the shimmering backdrop of Lake Pichola, Rashi and Dhruv exchanged vows in a ceremony that blended Rajput grandeur with modern elegance.', content: '<p>Their love story began in the corridors of IIM Ahmedabad...</p>', featuredImage: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800', venue: 'The Oberoi Udaivilas', location: 'Udaipur', eventDate: new Date('2025-12-15'), style: ['Royal', 'Traditional'], published: true, featured: true, views: 1240 },
    { slug: 'priya-arjun-goa', coupleNames: 'Priya & Arjun', title: 'Barefoot on the Beach — Priya & Arjun', teaser: 'A sunset ceremony on the golden sands of Goa, where the Arabian Sea bore witness to a love as boundless as the ocean itself.', content: '<p>Priya always dreamed of a beach wedding...</p>', featuredImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800', venue: 'The Leela Goa', location: 'Goa', eventDate: new Date('2025-11-20'), style: ['Beach', 'Boho'], published: true, featured: true, views: 876 },
    { slug: 'meera-kabir-jaipur', coupleNames: 'Meera & Kabir', title: 'Heritage and Heart — Meera & Kabir', teaser: 'Within the rose-hued walls of Jaipur, Meera and Kabir wove together two families in a celebration of colour, culture and love.', content: '<p>Jaipur was always their city...</p>', featuredImage: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800', venue: 'Samode Haveli', location: 'Jaipur', eventDate: new Date('2025-10-05'), style: ['Heritage', 'Royal'], published: true, featured: false, views: 542 },
  ]);
  console.log('💍 Wedding stories seeded');

  // Venues
  await Venue.insertMany([
    { slug: 'oberoi-udaivilas-udaipur', name: 'The Oberoi Udaivilas', city: 'Udaipur', state: 'Rajasthan', venueType: 'Palace Hotel', description: 'Set on the banks of Lake Pichola, an architectural masterpiece for royal weddings.', highlights: ['Lakeside setting', 'Royal architecture', 'Candlelit ceremonies'], capacity: { min: 50, max: 500 }, amenities: ['Swimming pool', 'Spa', 'Fine dining', 'Helipad'], featuredImage: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800', images: ['https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800'], trending: true, featured: true, published: true },
    { slug: 'taj-lake-palace-udaipur', name: 'Taj Lake Palace', city: 'Udaipur', state: 'Rajasthan', venueType: 'Heritage Hotel', description: 'Floating on Lake Pichola, this 18th century palace offers a fairy-tale wedding setting.', highlights: ['Island palace', '18th century heritage', 'Magical sunsets'], capacity: { min: 30, max: 300 }, amenities: ['Infinity pool', 'Heritage spa', 'Restaurants', 'Boat jetty'], featuredImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', images: [], trending: true, featured: true, published: true },
    { slug: 'leela-goa', name: 'The Leela Goa', city: 'Cavelossim', state: 'Goa', venueType: 'Beach Resort', description: 'Nestled between the Arabian Sea and Sal River for idyllic beach weddings.', highlights: ['Private beach', 'Riverside lawn', 'Stunning sunsets'], capacity: { min: 50, max: 600 }, amenities: ['Private beach', 'Multiple pools', 'Water sports', 'Golf'], featuredImage: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800', images: [], trending: false, featured: true, published: true },
  ]);
  console.log('🏰 Venues seeded');

  // Blog Posts
  await BlogPost.insertMany([
    { slug: 'spring-wedding-decor-trends-2025', title: 'Spring Blossoms & Golden Hours: Wedding Decor Trends 2025', excerpt: 'From dried botanicals to maximalist floral arches, discover the decor stories defining weddings this year.', content: '<p>Spring 2025 weddings are embracing...</p>', featuredImage: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800', category: 'Decor Trends', tags: ['decor', 'spring', 'trends', 'flowers'], author: { name: 'Konark Team' }, published: true, featured: true, metaTitle: 'Spring Wedding Decor Trends 2025', metaDescription: 'Discover the top wedding decor trends for spring 2025.' },
    { slug: 'destination-wedding-planning-guide', title: 'The Complete Guide to Planning a Destination Wedding in India', excerpt: 'From logistics to vendor selection, everything you need to know before saying "I do" in a dream location.', content: '<p>India offers some of the world\'s most spectacular...</p>', featuredImage: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800', category: 'Planning Tips', tags: ['destination wedding', 'planning', 'guide'], author: { name: 'Mandeep Agarwal' }, published: true, featured: false, metaTitle: 'Destination Wedding Planning Guide India', metaDescription: 'Complete guide to planning a destination wedding in India.' },
  ]);
  console.log('📝 Blog posts seeded');

  // Testimonials
  await Testimonial.insertMany([
    { name: 'Priya & Rahul Sharma', location: 'Delhi', rating: 5, text: 'Wedding Gurukuls turned our dream wedding into reality. Every detail was perfect and the team was incredibly supportive throughout.', eventType: 'Destination Wedding', published: true, featured: true },
    { name: 'Ananya & Vikram Mehta', location: 'Mumbai', rating: 5, text: 'Our Udaipur wedding was nothing short of magical. The creativity and professionalism of the Konark team is unmatched.', eventType: 'Palace Wedding', published: true, featured: true },
    { name: 'Riya & Arjun Kapoor', location: 'Jaipur', rating: 5, text: 'From the mehendi to the reception, every event was flawlessly executed. We couldn\'t have asked for a better team.', eventType: 'Heritage Wedding', published: true, featured: false },
  ]);
  console.log('⭐ Testimonials seeded');

  // Portfolio
  await Portfolio.insertMany([
    { slug: 'royal-rajput-udaipur', title: 'Royal Rajput Wedding – Udaipur', description: 'A grand palace wedding blending Rajput heritage with contemporary luxury.', featuredImage: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800', images: [], venue: 'Oberoi Udaivilas', location: 'Udaipur', style: ['Royal', 'Traditional'], venueType: 'Palace Hotel', published: true, featured: true, order: 1 },
    { slug: 'bohemian-beach-goa', title: 'Bohemian Beach Celebration – Goa', description: 'A free-spirited beachside wedding with barefoot elegance.', featuredImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800', images: [], venue: 'The Leela Goa', location: 'Goa', style: ['Boho', 'Beach'], venueType: 'Beach Resort', published: true, featured: true, order: 2 },
    { slug: 'heritage-haveli-jaipur', title: 'Heritage Haveli Affair – Jaipur', description: 'An intimate celebration within the rose city\'s historic walls.', featuredImage: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800', images: [], venue: 'Samode Haveli', location: 'Jaipur', style: ['Heritage', 'Royal'], venueType: 'Heritage Property', published: true, featured: false, order: 3 },
  ]);
  console.log('🖼  Portfolio seeded');

  console.log('\n✨ Database seeded successfully!\n');
  console.log('Admin login: admin@konarkweddings.com / admin123');
  process.exit(0);
}

seed().catch(err => { console.error('Seed error:', err); process.exit(1); });
