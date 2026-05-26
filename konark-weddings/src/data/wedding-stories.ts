export interface WeddingGalleryImage {
  url: string
  alt: string
}

export interface WeddingStory {
  slug: string
  coupleNames: string
  title: string
  teaser: string
  content: string
  coverImage: string
  heroImage: string
  gallery: WeddingGalleryImage[]
  venue: string
  location: string
  eventDate?: string
  credits?: string
}

const K = 'https://konarkweddings.com'

export const weddingWallBanner = `${K}/uploads/pages/thumb//TLRCwmXOU9mIh4lXgidtBbD9T8LhgLNvFilyLnGo.png`

function galleryFromUrls(urls: string[], coupleNames: string): WeddingGalleryImage[] {
  return urls.map((url, i) => ({
    url,
    alt: `${coupleNames} wedding photo ${i + 1}`,
  }))
}

export const weddingStories: WeddingStory[] = [
  {
    slug: 'nupur-and-mayank',
    coupleNames: 'Nupur & Mayank',
    title: 'How This Couple Found Love in the Bustle of The City of Dreams',
    teaser:
      'What began as weekends spent together soon evolved into something deeper, catching the attention of their families. With both sides eager to know more, parents met in Nasik and Delhi, sealing their mutual agreement over a memorable family dinner.',
    content: `
      <p>What began as weekends spent together soon evolved into something deeper, catching the attention of their families. With both sides eager to know more, parents met in Nasik and Delhi, sealing their mutual agreement over a memorable family dinner. From there, their future became a shared path with no looking back.</p>
      <p>Their wedding celebrations unfolded at the iconic <strong>Leela Palace, Jaipur</strong> — a setting where royal grandeur met contemporary elegance. Wedding Gurukuls designed every function with intention: from intimate family rituals to grand receptions, each moment reflected Nupur and Mayank's journey from Mumbai's bustling streets to a palace built for forever.</p>
      <h2>The Celebrations</h2>
      <p>The festivities opened with vibrant pre-wedding events drenched in colour and music, followed by a ceremony that balanced tradition with modern aesthetics. Floral installations, bespoke lighting, and thoughtful guest experiences made their Leela Palace wedding a true celebration of two families becoming one.</p>
      <p>As they stepped into married life, Nupur and Mayank carried with them the warmth of their families, the beauty of Jaipur, and memories crafted with care by the Wedding Gurukuls team.</p>
    `,
    coverImage: `${K}/uploads/event//qhMbr3F0TJzZMLNZHrpNEM8YaSHo3naaznrAPxmS.png`,
    heroImage: `${K}/uploads/event//Xs2gnkYIOGCtj63Qud6gAZpuWldpGkrdhczFTIsw.jpg`,
    gallery: galleryFromUrls(
      [
        `${K}/uploads/event//Xs2gnkYIOGCtj63Qud6gAZpuWldpGkrdhczFTIsw.jpg`,
        `${K}/uploads/event//twqHZHO7wNrBF7jcJ9MTl9pSuUT22U9rJLrugepJ.jpg`,
        `${K}/uploads/event//cpV3TVre1wmubPiqUlwecjhb45nAfFY07H1hXxtO.jpg`,
        `${K}/uploads/event//ARGOONLRkzP1NCyinUxMAy8dS8fLQGrt6GKp4THp.jpg`,
        `${K}/uploads/event//kpKHoBLS4jT7rdBcAAwd2MRJrnf3bMuBZCKRVJUs.jpg`,
        `${K}/uploads/event//wx09G0aViVw3pYRswZ56NLECK7NR99sohHyyP1fm.jpg`,
        `${K}/uploads/event//atjJN7T3hZqq5Nmxwda0UUJgGCCDrpMXkvthiykV.jpg`,
        `${K}/uploads/event//F2cJfYyVAFHrNjLifw3JC2u37RbvnQIqx8ZgzSOn.jpg`,
        `${K}/uploads/event//AQL2TQeWL7lscVp0tElPxUwMmVZaYHojzIfrTELv.jpg`,
        `${K}/uploads/event//Mjlu64TsC2UkYBUykQebQQaw8aN48hJOP7fXEd0P.jpg`,
        `${K}/uploads/event//2kUfdvUJToBb6wi70DxXWDzIJFLymIB7OWDGUb8w.jpg`,
        `${K}/uploads/event//bOjdbhIhu67L0jZhSNOoewpgw85vn3rWxgVrtlUK.jpg`,
        `${K}/uploads/event//R6kanYrMtA0HbPnJ8cIQPnATktSvobGv8iFawVnD.jpg`,
        `${K}/uploads/event//BlocBk3W9RiHjtbfjupGKaNDrIr6uQyEclxeyUSy.jpg`,
        `${K}/uploads/event//mgaemEMZrjoqiwbGe6wzR6Y1Y6HhakciogFgmAwP.jpg`,
        `${K}/uploads/event//X3aDDKdn5Lye2zEwHsVoSRHnI4UA6emKEkqRvexa.jpg`,
        `${K}/uploads/event//t1MJwyXNkVfu2wgBRrtAggTvn90YPIRNLOUkD6Cj.jpg`,
        `${K}/uploads/event//Bkc93V67EEPV14yrklvxO6iqRZFmHkwoIChCB527.jpg`,
        `${K}/uploads/event//Uicpvgw6XJLuxujK1p9jO6Nx14FBhq4jGcKvNdQ9.jpg`,
      ],
      'Nupur & Mayank'
    ),
    venue: 'Leela Palace, Jaipur',
    location: 'Jaipur, Rajasthan',
    credits: '<p><strong>Planning &amp; Design:</strong> Wedding Gurukuls</p>',
  },
  {
    slug: 'rhea-and-konik',
    coupleNames: 'Rhea & Konik',
    title: '#RhealKonnection — A Celebration of Opposites Coming Together',
    teaser:
      '#RhealKonnection: A celebration of opposites coming together at Leela Palace, Jaipur — a two-day luxury wedding curated by Wedding Gurukuls.',
    content: `
      <p>They say opposites attract, and Rhea and Konik are the perfect example. Rhea, with her spontaneous nature, love for form and function, and minimalist packing, contrasts beautifully with Konik, who is always punctual, values function over form, and believes in living in the moment—even if it means packing his entire closet. Their differences create a balance that makes their bond even stronger.</p>
      <p>Their luxury wedding at <strong>Leela Palace, Jaipur</strong>, was a two-day extravaganza, meticulously curated by Wedding Gurukuls, blending their unique personalities into every element of the celebration.</p>
      <h2>Day 1: Tropical Paradise Welcome Lunch</h2>
      <p>The festivities kicked off with a tropical paradise-themed welcome lunch (Haldi event) by the poolside. The décor featured powder blue and yellow hues, with tropical prints adorning cushions, linens, rugs, and throws. As if the heavens were in sync with the theme, an hour before the event, it started to rain—enhancing the tropical vibe even more.</p>
      <h2>The Rooftop Mayra: A Vibrant Rajasthani Affair</h2>
      <p>Later in the day, the Mayra ceremony took place on the stunning rooftop of Leela Palace. Being a significant event for the Jain community, the couple wanted a Rajasthani touch infused into the décor. Rani pink, orange, and yellow hues dominated the setting, creating an elegant yet culturally rich atmosphere.</p>
      <h2>Casino Night: A Masked Masquerade</h2>
      <p>As the sun set, the celebrations took on a different tone with a Masquerade-themed Casino Night. The décor was a striking combination of greens and black, with chess players and reflective mirrors adding an air of mystery. Guests were greeted with masks as souvenirs, and the evening was filled with interactive games like poker and musical contests.</p>
      <h2>Day 2: The Wedding Day</h2>
      <p>The next morning was the main event—the wedding. Rhea had envisioned an elegant yet aesthetic décor, brought to life with soft shades of pink accented with silver elements. The highlight was a grand 60×60 dome structure serving as the mandap, seating up to 80 guests. The varmala ceremony took place on ramps connecting the mandap, adding a modern twist to traditional rituals.</p>
      <h2>The Celestial Sangeet: A Starry Finale</h2>
      <p>The two-day celebration concluded with a Sangeet night in celestial, dark-themed décor. Paparazzi-style entrances and high-energy dance performances closed out the festivities on a high note—from start to finish, an unforgettable celebration of their #RhealKonnection.</p>
    `,
    coverImage: `${K}/uploads/event//mwJ6goMTo2kDkJzzZFiluQhhQBds9Qx7SnuxoXSF.png`,
    heroImage: `${K}/uploads/event//RPAbKy4XPwYtJE6tLywkdQuk7TeScL2zMwfY0Ko5.jpg`,
    gallery: galleryFromUrls(
      [
        `${K}/uploads/event//RPAbKy4XPwYtJE6tLywkdQuk7TeScL2zMwfY0Ko5.jpg`,
        `${K}/uploads/event//6SLAcjmXfjSoWtWQeSY0R9AG2gEgIw6AWtWzibiu.jpg`,
        `${K}/uploads/event//9btJ1fryZ25b45encCdjF9kV7Xskxwy9DoVY5Kur.jpg`,
        `${K}/uploads/event//1NMXxfcoL3ZNQpBXx0EvyegVPCJcvFgCRbhAbfAF.jpg`,
        `${K}/uploads/event//XI3MEEnZs497BsEpFhQzBqYe0MceS1EMOeIsQPWO.jpg`,
        `${K}/uploads/event//A370Oyy1d3dZ021k4ekh7fZNYI1czkh5O9yriiRL.jpg`,
        `${K}/uploads/event//16xvNmT2TbYzw3qGUGAvLJXvQGFsWtKCUyXj4hoR.jpg`,
        `${K}/uploads/event//ASAsSblHA3UKjpfyHCQvYfNav3fXCS5zxgy5oC6Y.jpg`,
        `${K}/uploads/event//2BS59bxJZj8k59KlDdBYrshf0x1yfpOpWDHAxb6V.jpg`,
        `${K}/uploads/event//tbLfM9FUYSYRCEcIpDGPc8fOCvU19388al7IWBZw.jpg`,
        `${K}/uploads/event//l06CsOdo1JQEy3Agt7qhloJ4oO7aWu4jzNQKIcGw.jpg`,
        `${K}/uploads/event//5oADbwyDiyaegPS2cFp8QcmL2T5PKiJwf9CM9uQ1.jpg`,
        `${K}/uploads/event//Hy0vw9jPOGphz2u3ABB7RfvMBGk5yAlgMYiw0txN.jpg`,
        `${K}/uploads/event//LPbxPVeeRSVH8cbuwiHtmF2YzCK3Zd9GJ1O4mvuQ.jpg`,
        `${K}/uploads/event//qOEVPt68dpv4HCKo1J9AmvtzkskDsdNgCr0RLolK.jpg`,
        `${K}/uploads/event//v89x14uTqKyIVWo3LXf0gBedFRtTEx9AC6aqIsoZ.jpg`,
        `${K}/uploads/event//FTLPV30r6zHF06D6OcwARkXYd3nba5yKP93J7WeE.jpg`,
        `${K}/uploads/event//5HLdr8a8YylZThLnSM5KGUmiExFdYaSZtolxMpuC.jpg`,
        `${K}/uploads/event//FvrUxWO6Sy9RbE6yOztIzQ7jIQialRJOvAHogs5Q.jpg`,
      ],
      'Rhea & Konik'
    ),
    venue: 'Leela Palace, Jaipur',
    location: 'Jaipur, Rajasthan',
    credits: `
      <p><strong>Planning:</strong> Twinflame Events &nbsp;|&nbsp; <strong>Decor &amp; Design:</strong> Wedding Gurukuls</p>
      <p><strong>Venue:</strong> The Leela Palace, Jaipur &nbsp;|&nbsp; <strong>Photographer:</strong> Raabta Studios</p>
    `,
  },
  {
    slug: 'sangeeta-and-michael',
    coupleNames: 'Sangeeta & Micheal',
    title: 'This British Meets Bengali Wedding in Jaipur is a Tale of Love and Unity',
    teaser:
      'This british meets bengali wedding in Jaipur is a tale of love and unity at Alila Fort, Bishangarh.',
    content: `
      <p>In a beautiful intercultural celebration, Michael, a British groom, and Sangeeta, an Indian-Bengali bride, tied the knot in a grand wedding at <strong>Alila Fort, Bishangarh</strong>. Their three-day celebration, from the 20th to the 22nd of September 2023, featured a unique floating mandap, with Wedding Gurukuls designing and executing every detail of this spectacular event.</p>
      <p>Their love story began at work, blossoming into a strong bond during the pandemic when they found comfort and strength in each other. Shared passions for cooking, technology, and similar values brought them even closer. A secret trip to Mykonos and an adventurous journey in Cyprus further deepened their connection, setting the stage for a lifetime together.</p>
      <p>This luxury wedding at Alila Fort was a true reflection of their journey—blending cultures, traditions, and love into an unforgettable celebration that symbolized unity and joy.</p>
    `,
    coverImage: `${K}/uploads/event//jpHoD2i0D1gekAK0vl4eYiVdS2AlBOsvBjpGlrhN.png`,
    heroImage: `${K}/uploads/event//aJL0fLelmOmIn84TmAeF2hrzULGcOq4uCF8RTpE2.jpg`,
    gallery: galleryFromUrls(
      [
        `${K}/uploads/event//aJL0fLelmOmIn84TmAeF2hrzULGcOq4uCF8RTpE2.jpg`,
        `${K}/uploads/event//cIrpNjlStviUjZbD0GsAv6fDN77rYxHJxC9LNa0K.jpg`,
        `${K}/uploads/event//K83vRfxOprWJVHMVTbH4wNz9XWTI1CUcBmtrrYdf.jpg`,
        `${K}/uploads/event//qVxL3sDQo01swArAYaQJvP0YXFG3JcsFeSX6eKPx.jpg`,
        `${K}/uploads/event//zDgNUQue3we6DsWVvQ1yAKcVfBU3gUkfzKwU9GpG.jpg`,
        `${K}/uploads/event//opnWuAzE8dwAYF1LV78FtgvtaqgSff5wfsyHEt2s.jpg`,
        `${K}/uploads/event//X3IHGUKkkbZDLJm6apVC8OTkAixIobCqrFtlF3lJ.jpg`,
        `${K}/uploads/event//7n0KFervxLrJObmKeDNk0vuIwkw7nMitVEmyhFMf.jpg`,
        `${K}/uploads/event//w9Yj853ysKgKFlK56m6vuqTW0yFNmS2LGx6vJNku.jpg`,
        `${K}/uploads/event//G9lJkHW2ZZB8VGPQVF8zpYGSsBehYy1AVAjYtyHU.jpg`,
        `${K}/uploads/event//6SOPXqaWPgXHi1MMQZOLgHTJrrAF7WrRi0SgcqsV.jpg`,
        `${K}/uploads/event//UvRzSq0Nwvzfp7FPfvZCZ8WSVJCqe1CDnTUzcMhG.jpg`,
        `${K}/uploads/event//NUG9jrq2vDDA9FJp0hYZkwUQvorBwDLLe3MlcZSE.jpg`,
        `${K}/uploads/event//zw5MDKJUjlrCcMhPQbjcnoVzuVeHGBnM1m7MyvcK.jpg`,
      ],
      'Sangeeta & Micheal'
    ),
    venue: 'Alila Fort, Bishangarh',
    location: 'Jaipur, Rajasthan',
    eventDate: '2023-09-20',
    credits: `
      <p><strong>Venue:</strong> Alila Fort, Bishangarh &nbsp;|&nbsp; <strong>Wedding Planning &amp; Decor:</strong> Wedding Gurukuls</p>
      <p><strong>Photography:</strong> Soulmate Moviemakers &nbsp;|&nbsp; <strong>Makeup:</strong> Pooja Khurana Beauty</p>
    `,
  },
  {
    slug: 'mahima-and-kshitij',
    coupleNames: 'Mahima & Kshitij',
    title: 'How This Couple Found Love in the Bustle of the City of Dreams',
    teaser:
      'How this couple found love in the bustle of the city of dreams — a luxury celebration at Devi Ratn, Jaipur.',
    content: `
      <p>What began as weekends spent together soon blossomed into something deeper, drawing their families closer. With parents meeting in Nasik and Delhi over a memorable dinner, their journey as one officially began.</p>
      <p>Their wedding celebrations took place on the 10th and 11th of December 2023 at the stunning <strong>Devi Ratn, Jaipur</strong>, a heritage property that added grandeur and charm to their big day. This luxury wedding started with a vibrant Mehendi ceremony filled with dhol beats, colorful Rajasthani bangles, and pastel lilac décor. Every detail was beautifully executed by Wedding Gurukuls, turning tradition into a picture-perfect celebration.</p>
      <p>The festivities continued with an elegant Ring Ceremony, where the couple exchanged rings in chic Indo-Western attire, surrounded by their loved ones. The Haldi ceremony glowed in shades of yellow and floral décor, symbolizing prosperity and joy.</p>
      <p>Finally, the wedding day arrived. Mahima walked down the aisle in a stunning pastel lehenga, her presence lighting up the grand setting. The celebrations concluded with a glamorous Reception filled with music, laughter, and décor that reflected the magic of their journey.</p>
      <p>Mahima and Kshitij's story is proof that love thrives in moments big and small—as they step into the future, they carry the warmth of their families and the beauty of their wedding at Devi Ratn Jaipur.</p>
    `,
    coverImage: `${K}/uploads/event//wDlsmHZVBSc518j3bsm3OPWbOWNMqJ3A7TOVLuRJ.png`,
    heroImage: `${K}/uploads/event//5Se5f11AZtDxOaHqaI5BTKJEMdELrPNuSf9Ozlbx.jpg`,
    gallery: galleryFromUrls(
      [
        `${K}/uploads/event//5Se5f11AZtDxOaHqaI5BTKJEMdELrPNuSf9Ozlbx.jpg`,
        `${K}/uploads/event//Gy8bXnEd2cscqQT6D28JT90UntrIo3LiA3ov8BAg.jpg`,
        `${K}/uploads/event//6dqE9GdwdWpAEksjeVSG17ZyaSTUsaKJTquNgebj.jpg`,
        `${K}/uploads/event//BWe28H9mxcAfGTka6lRW9DT8PY2CqUo0LR8jhUPE.jpg`,
        `${K}/uploads/event//LJvSVVylTy4RAuFhxRUS8KAnUsIfX5FZTA24pcWG.jpg`,
        `${K}/uploads/event//wLZLY3l0AatpvqlubfssIV7yrZrIpy9b1EpQ6oMj.jpg`,
        `${K}/uploads/event//NK7kXs1ODkZL9yGku8IKZosHbfy3cyUfVyZ9AZhe.jpg`,
        `${K}/uploads/event//Tgmyw3vs7UK9cxOQZOv4rf3FIOjF6ZlD9LaJZwwf.jpg`,
        `${K}/uploads/event//bMEJG4yluB5lL2nPuwEdRG0m2s4u66cywv37TYCP.jpg`,
        `${K}/uploads/event//AxaygZLo9oKIbJYCvoY0mEpahZpogHbPUQkABn41.jpg`,
        `${K}/uploads/event//ExKEcSZF8yFCWtAwEvB12xVB8KthJpalLWUJzR0s.jpg`,
        `${K}/uploads/event//nK6RdwrxgGTn5YsJmjaKr2OyDMx8DoCGXTpBmfnE.jpg`,
        `${K}/uploads/event//Bm91GfWyrelpMxv5tqZfBotVXznqllcxJ87FxgUy.jpg`,
        `${K}/uploads/event//0mCjp6HFyXKsVVGwbSBGpFClgAAfpPCImLyPKqlj.jpg`,
      ],
      'Mahima & Kshitij'
    ),
    venue: 'Devi Ratn, Jaipur',
    location: 'Jaipur, Rajasthan',
    eventDate: '2023-12-10',
    credits: `
      <p><strong>Planning and Designing:</strong> Wedding Gurukuls</p>
      <p><strong>Photographer:</strong> Fotovision India &nbsp;|&nbsp; <strong>Makeup Artist:</strong> Wamika Bajaj Makeovers</p>
    `,
  },
]

const storiesBySlug = Object.fromEntries(weddingStories.map((s) => [s.slug, s])) as Record<
  string,
  WeddingStory
>

export function getWeddingStory(slug: string): WeddingStory | undefined {
  return storiesBySlug[slug]
}

export function getStoryCoverImage(slug: string): string {
  return storiesBySlug[slug]?.coverImage ?? ''
}

export function getStoryHeroImage(slug: string): string {
  return storiesBySlug[slug]?.heroImage ?? ''
}

export function getAllWeddingSlugs(): string[] {
  return weddingStories.map((s) => s.slug)
}
