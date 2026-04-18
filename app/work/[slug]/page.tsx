import { projects } from '@/lib/projects'
import { notFound } from 'next/navigation'
import CaseStudy from '@/components/CaseStudy'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SmoothScroll from '@/components/SmoothScroll'

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)
  if (!project) return {}

  return {
    title: `${project.title} - Taylor Maison`,
    description: project.description,
  }
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)
  if (!project) return notFound()

  const idx = projects.findIndex((p) => p.slug === slug)
  const nextProject = projects[(idx + 1) % projects.length]

  return (
    <>
      <SmoothScroll />
      <Header />
      <main id="top">
        <CaseStudy
          project={project}
          nextProject={nextProject}
          index={idx}
          total={projects.length}
        />
      </main>
      <Footer />
    </>
  )
}
