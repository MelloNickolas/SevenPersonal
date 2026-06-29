import { useEffect, useState } from 'react'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Marquee from '@/components/Marquee'
import Manifesto from '@/components/Manifesto'
import PlansSection from '@/components/PlansSection'
import MonthlyCarousel from '@/components/MonthlyCarousel'
import GallerySeven from '@/components/GallerySeven'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'
import { carouselApi, mediaApi, plansApi, settingsApi } from '@/lib/services'
import '@/styles/site.css'
import type { CarouselImage, MediaItem, Plan, SiteSettings } from '@/lib/types'

const CACHE_KEY = 'seven_site_cache'

interface SiteData {
  plans: Plan[]
  carousel: CarouselImage[]
  media: MediaItem[]
  settings: SiteSettings | null
}

const empty: SiteData = { plans: [], carousel: [], media: [], settings: null }

function readCache(): SiteData | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    return raw ? (JSON.parse(raw) as SiteData) : null
  } catch {
    return null
  }
}

export default function Home() {
  // Mostra o cache na hora (mitiga o cold start do Render) e revalida em background.
  const [data, setData] = useState<SiteData>(() => readCache() ?? empty)

  useEffect(() => {
    let active = true
    Promise.all([
      plansApi.getAll().catch(() => data.plans),
      carouselApi.getAll().catch(() => data.carousel),
      mediaApi.getAll().catch(() => data.media),
      settingsApi.get().catch(() => data.settings),
    ]).then(([plans, carousel, media, settings]) => {
      if (!active) return
      const fresh: SiteData = { plans, carousel, media, settings }
      setData(fresh)
      try {
        localStorage.setItem(CACHE_KEY, JSON.stringify(fresh))
      } catch {
        /* ignora limite de storage */
      }
    })
    return () => {
      active = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="site">
      <Navbar settings={data.settings} />
      <main>
        <Hero settings={data.settings} />
        <Marquee />
        <PlansSection plans={data.plans} settings={data.settings} />
        <Manifesto />
        <MonthlyCarousel images={data.carousel} />
        <GallerySeven items={data.media} />
        <ContactSection settings={data.settings} />
      </main>
      <Footer />
    </div>
  )
}
