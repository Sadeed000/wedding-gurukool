import HeroSection from '@/components/sections/HeroSection'
import StatsSection from '@/components/sections/StatsSection'
import AboutStrip from '@/components/sections/AboutStrip'
import WhyChooseUs from '@/components/sections/WhyChooseUs'
import ServicesGrid from '@/components/sections/ServicesGrid'
import ServicesProcess from '@/components/sections/ServicesProcess'
import FeaturedGallery from '@/components/sections/FeaturedGallery'
import VideoSection from '@/components/sections/VideoSection'
import DestinationsSection from '@/components/sections/DestinationsSection'
import FeaturedStories from '@/components/sections/FeaturedStories'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import AwardsSection from '@/components/sections/AwardsSection'
import LeadershipSection from '@/components/sections/LeadershipSection'

import BlogPreview from '@/components/sections/BlogPreview'
import InstagramFeed from '@/components/sections/InstagramFeed'
import CTASection from '@/components/sections/CTASection'

export const metadata = {
  title: 'Wedding Gurukul – Luxury Wedding Decor & Event Management',
  description: 'With 11+ years of expertise, Wedding Gurukul has delivered 300+ spectacular celebrations across India. Luxury wedding decor, planning, and event management in Rajasthan & beyond.',
  keywords: ['wedding planner', 'wedding gurukul', 'luxury wedding india', 'rajasthan wedding', 'destination wedding'],
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <AboutStrip />
      <LeadershipSection />
      
      <WhyChooseUs />
      <ServicesGrid />
      <ServicesProcess />
      <FeaturedGallery />
   
    
      <FeaturedStories />
      <TestimonialsSection />
      <AwardsSection />
      {/* <BlogPreview /> */}
      {/* <InstagramFeed /> */}
      <CTASection />
    </>
  )
}
