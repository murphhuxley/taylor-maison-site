import Header from '@/components/Header'
import Hero from '@/components/Hero'
import WorkSection from '@/components/WorkSection'
import VoiceMoment from '@/components/VoiceMoment'
import ServicesSection from '@/components/ServicesSection'
import AboutSection from '@/components/AboutSection'
import ContactSection from '@/components/ContactSection'
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
        <VoiceMoment />
        <ServicesSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
