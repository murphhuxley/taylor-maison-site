import Header from '@/components/Header'
import AboutSection from '@/components/AboutSection'
import GlassPill from '@/components/GlassPill'
import SmoothScroll from '@/components/SmoothScroll'

export default function AboutPage() {
  return (
    <>
      <SmoothScroll />
      <Header />
      <main className="about-route">
        <AboutSection />
      </main>
      <GlassPill />
    </>
  )
}
