import Header from '@/components/Header'
import Hero from '@/components/Hero'
import AiAdvantageSection from '@/components/AiAdvantageSection'
import WorkSection from '@/components/WorkSection'
import SignalGallerySection from '@/components/SignalGallerySection'
import EngagementsSection from '@/components/EngagementsSection'
import SmoothScroll from '@/components/SmoothScroll'
import GlassPill from '@/components/GlassPill'

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Header />
      <main>
        <Hero />
        <AiAdvantageSection />
        <WorkSection />
        <EngagementsSection />
        <SignalGallerySection />
        <div className="page-tail" aria-hidden="true" />
      </main>
      <GlassPill autoOpenOnBottom />
    </>
  )
}
