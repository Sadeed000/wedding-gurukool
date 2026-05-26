# Wedding Gurukuls — Full-Stack Next.js Website

A modern, luxury wedding & event management website built with **Next.js 14**, **MongoDB**, **TypeScript**, and **Tailwind CSS**.

---

## 🚀 Quick Start

### Prerequisites
- Node.js 11+
- MongoDB (local or [MongoDB Atlas](https://cloud.mongodb.com))

### 1. Install dependencies
```bash
cd konark-weddings
npm install
```

### 2. Configure environment variables
```bash
cp .env.local.example .env.local
```
Edit `.env.local` and fill in:
```
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/konark-weddings
NEXTAUTH_SECRET=your-random-secret-here
NEXTAUTH_URL=http://localhost:3000
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your@email.com
EMAIL_PASS=your-app-password
CONTACT_EMAIL=weddinggurukuljpr@gmail.com
```

### 3. Seed the database
```bash
node scripts/seed.js
```
This creates:
- Admin user: `admin@konarkweddings.com` / `admin123`
- Sample wedding stories, venues, portfolio items, blog posts, testimonials

### 4. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

---

## 🏗 Project Structure

```
konark-weddings/
├── src/
│   ├── app/
│   │   ├── (main)/           # Public-facing pages
│   │   │   ├── page.tsx      # Home
│   │   │   ├── about/        # Who We Are
│   │   │   ├── wedding-wall/ # Wedding Stories (blog)
│   │   │   ├── portfolio/    # Photo portfolio
│   │   │   ├── venues/       # Venue guide
│   │   │   ├── blog/         # Blog
│   │   │   └── contact/      # Contact / Lead capture
│   │   ├── admin/            # CMS admin panel
│   │   │   ├── login/
│   │   │   ├── dashboard/
│   │   │   ├── posts/        # Manage wedding stories
│   │   │   ├── venues/       # Manage venues
│   │   │   ├── portfolio/    # Manage portfolio
│   │   │   └── testimonials/
│   │   └── api/              # REST API routes
│   │       ├── auth/         # NextAuth
│   │       ├── posts/        # Wedding stories CRUD
│   │       ├── venues/       # Venues CRUD
│   │       ├── portfolio/    # Portfolio CRUD
│   │       ├── testimonials/ # Testimonials CRUD
│   │       └── contact/      # Contact form endpoint
│   ├── components/
│   │   ├── layout/           # Navbar, Footer
│   │   └── sections/         # Home page sections
│   ├── lib/                  # MongoDB, auth, email utils
│   ├── models/               # Mongoose schemas
│   ├── hooks/                # Custom React hooks
│   └── styles/               # Global CSS
├── scripts/
│   └── seed.js               # Database seeder
└── .env.local.example
```

---

## 📄 Pages

| Route | Description |
|-------|-------------|
| `/` | Home — hero, stats, services, gallery, stories, testimonials |
| `/about` | Company story, team, values |
| `/wedding-wall` | Wedding story listings |
| `/wedding-wall/[slug]` | Individual story detail |
| `/portfolio` | Filterable photo gallery with lightbox |
| `/venues` | Venue guide with search & filters |
| `/venues/[slug]` | Venue detail with enquiry form |
| `/blog` | Blog index with categories |
| `/blog/[slug]` | Individual blog post (SEO optimized) |
| `/contact` | Contact form + map |
| `/admin/login` | Admin authentication |
| `/admin/dashboard` | Admin overview |
| `/admin/posts` | CRUD for wedding stories |
| `/admin/venues` | CRUD for venues |
| `/admin/portfolio` | CRUD for portfolio items |
| `/admin/testimonials` | CRUD for testimonials |

---

## 🔌 API Endpoints

All endpoints follow REST conventions:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/posts` | List wedding stories (paginated, filterable) |
| POST | `/api/posts` | Create story (auth required) |
| GET | `/api/posts/[id]` | Get single story |
| PUT | `/api/posts/[id]` | Update story (auth required) |
| DELETE | `/api/posts/[id]` | Delete story (auth required) |
| GET | `/api/venues` | List venues (search, city, type, trending) |
| POST | `/api/venues` | Create venue (auth required) |
| GET | `/api/venues/[id]` | Get single venue |
| PUT | `/api/venues/[id]` | Update venue (auth required) |
| DELETE | `/api/venues/[id]` | Delete venue (auth required) |
| GET | `/api/portfolio` | List portfolio items |
| POST | `/api/portfolio` | Create item (auth required) |
| GET | `/api/portfolio/[id]` | Get single item |
| PUT | `/api/portfolio/[id]` | Update item (auth required) |
| DELETE | `/api/portfolio/[id]` | Delete item (auth required) |
| GET | `/api/testimonials` | List testimonials |
| POST | `/api/testimonials` | Create testimonial (auth required) |
| POST | `/api/contact` | Submit contact form |

---

## 🎨 Design System

| Token | Value |
|-------|-------|
| Primary (Gold) | `#c9922a` |
| Background (Cream) | `#fdf9f0` |
| Dark (Charcoal) | `#1a1612` |
| Accent (Blush) | `#f5e6e0` |
| Accent (Sage) | `#8fa68e` |
| Heading font | Cormorant Garamond |
| Body font | DM Sans |
| Accent font | Playfair Display |

---

## 🌐 Deployment (Vercel)

1. Push to GitHub
2. Import repo at [vercel.com/new](https://vercel.com/new)
3. Add environment variables in Vercel dashboard
4. Deploy — Vercel auto-detects Next.js

### Environment variables needed in production:
```
MONGODB_URI
NEXTAUTH_SECRET
NEXTAUTH_URL        (your production URL)
EMAIL_HOST
EMAIL_PORT
EMAIL_USER
EMAIL_PASS
CONTACT_EMAIL
```

---

## 🔒 Admin Access

After seeding, log in at `/admin/login`:
- **Email:** `admin@konarkweddings.com`
- **Password:** `admin123`

⚠️ Change the admin password before going to production.

---

## 📦 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Database:** MongoDB + Mongoose
- **Auth:** NextAuth.js (credentials)
- **Styling:** Tailwind CSS
- **Email:** Nodemailer
- **Icons:** Lucide React
- **Animations:** CSS transitions + Framer Motion ready
- **Images:** next/image with Unsplash/Cloudinary support
