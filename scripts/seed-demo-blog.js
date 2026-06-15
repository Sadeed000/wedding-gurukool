#!/usr/bin/env node
/**
 * Adds ONE rich, fully-featured demo blog post that showcases every
 * capability of the new blog editor (headings/TOC, highlights, interlinks,
 * backlinks, tables, callouts, captioned images, lists, quotes, dividers).
 *
 * SAFE: it does NOT wipe anything. It upserts a single post by slug, so you
 * can re-run it any time without creating duplicates.
 *
 * Run:  node scripts/seed-demo-blog.js
 * Needs MONGODB_URI in .env (or .env.local)
 */

require('dotenv').config({ path: '.env.local' });
require('dotenv').config({ path: '.env' });
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/konark-weddings';

// Match the real app model (src/models/BlogPost.js) — author is a String.
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
}, { timestamps: true });

const BlogPost = mongoose.models.BlogPost || mongoose.model('BlogPost', BlogPostSchema);

// ─── The demo content ────────────────────────────────────────────────────────
// This is exactly the kind of HTML the new editor produces. Open this post in
// Admin → Blog Posts → Edit → Content to see how each block is structured.
const content = `
<p>Planning a destination wedding in India is equal parts dream and logistics. In this guide we break the whole journey into clear, bite-sized steps — from picking the right season to locking your vendors — so you can plan with confidence and <mark>actually enjoy the process</mark>.</p>

<div class="callout"><p>💡 <strong>Tip:</strong> Bookmark this page. Each section below is linked in the Table of Contents on the right — click any heading to jump straight to it.</p></div>

<h2>Why choose a destination wedding?</h2>
<p>A destination wedding turns a single day into a multi-day experience for you and your guests. Beyond the visuals, it gives you a <mark>built-in venue, stay, and celebration space</mark> all in one place — which often simplifies planning rather than complicating it.</p>
<ul>
  <li>A memorable shared getaway for close family and friends</li>
  <li>Stunning, ready-made backdrops for your photos</li>
  <li>Curated guest lists that keep celebrations intimate</li>
</ul>

<h2>Choosing the right season</h2>
<p>Timing changes everything — from pricing to weather to vendor availability. Here is a quick season-by-season comparison for the most popular Indian wedding destinations.</p>

<table>
  <thead>
    <tr>
      <th>Season</th>
      <th>Best For</th>
      <th>Weather</th>
      <th>Cost</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>Oct – Mar</td><td>Rajasthan, Goa palaces</td><td>Cool &amp; pleasant</td><td>Premium (peak)</td></tr>
    <tr><td>Apr – Jun</td><td>Hill stations, Kerala</td><td>Warm</td><td>Moderate</td></tr>
    <tr><td>Jul – Sep</td><td>Monsoon resorts</td><td>Rainy, lush</td><td>Best value</td></tr>
  </tbody>
</table>

<h3>Booking ahead of peak season</h3>
<p>Top venues for the <strong>October–March</strong> window get reserved 9–12 months in advance. If your heart is set on a palace, start early.</p>

<h2>Picking your venue</h2>
<figure>
  <img src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80" alt="A palace venue lit up at dusk for a wedding" />
  <figcaption>A lakeside palace at dusk — the kind of backdrop that needs no extra decor.</figcaption>
</figure>
<p>Match the venue to your guest count and the mood you want. Browse real celebrations on our <a href="/portfolio">portfolio</a> and explore handpicked properties in our <a href="/venues">venues collection</a> for inspiration.</p>

<blockquote>The right venue does half the storytelling for you — choose the place, and the day designs itself.</blockquote>

<h2>Building your vendor team</h2>
<p>Once the venue is set, lock these vendors in order of priority:</p>
<ol>
  <li><strong>Planner</strong> — your single point of coordination</li>
  <li><strong>Photographer &amp; videographer</strong> — they book out fastest</li>
  <li><strong>Decor &amp; florals</strong> — tie this to your venue's style</li>
  <li><strong>Catering &amp; entertainment</strong> — taste test before signing</li>
</ol>

<div class="callout"><p>💡 Always read reviews and verify portfolios. A good reference is the <a href="https://www.weddingwire.in" target="_blank" rel="noopener noreferrer">WeddingWire vendor directory</a> for cross-checking ratings before you commit.</p></div>

<hr/>

<h2>Your next step</h2>
<p>Feeling inspired? Read more ideas on the <a href="/blog">Wedding Gurukul blog</a>, or skip ahead and <a href="/contact">book a free consultation</a> — our team will help you turn this checklist into your real wedding day.</p>
`.trim();

async function run() {
  await mongoose.connect(MONGODB_URI);
  console.log('✅ Connected to MongoDB');

  const slug = 'destination-wedding-india-complete-guide';

  const doc = {
    slug,
    title: 'How to Plan a Destination Wedding in India: The Complete Guide',
    excerpt:
      'A step-by-step guide to planning your dream destination wedding in India — from choosing the right season and venue to building the perfect vendor team.',
    content,
    featuredImage:
      'https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&q=80',
    images: [],
    category: 'Planning Tips',
    tags: ['destination wedding', 'planning', 'guide', 'venues', 'india'],
    author: 'Wedding Gurukul',
    published: true,
    featured: false,
    metaTitle: 'Destination Wedding Planning Guide India | Wedding Gurukul',
    metaDescription:
      'The complete step-by-step guide to planning a destination wedding in India: seasons, venues, vendors, budgets and more.',
    metaKeywords: 'destination wedding india, wedding planning, indian wedding venues',
  };

  const result = await BlogPost.findOneAndUpdate(
    { slug },
    { $set: doc },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  console.log('📝 Demo blog post ready:');
  console.log('   Title :', result.title);
  console.log('   Slug  :', result.slug);
  console.log('   View  : /blog/' + result.slug);
  console.log('\n✨ Done. Open it on the site, or in Admin → Blog Posts → Edit → Content.\n');
  process.exit(0);
}

run().catch((err) => {
  console.error('❌ Seed error:', err.message);
  process.exit(1);
});
