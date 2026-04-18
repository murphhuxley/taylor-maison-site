import Header from '@/components/Header'
import Hero from '@/components/Hero'
import WorkSection from '@/components/WorkSection'
import EngagementsSection from '@/components/EngagementsSection'
import AboutSection from '@/components/AboutSection'
import Footer from '@/components/Footer'
import SmoothScroll from '@/components/SmoothScroll'

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Header />
      <main>
        <Hero />
        <WorkSection />
        <EngagementsSection />
        <AboutSection />
      </main>
      <Footer />
    </>
  )
}
