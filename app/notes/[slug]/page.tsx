import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import GlassPill from '@/components/GlassPill'
import SmoothScroll from '@/components/SmoothScroll'
import TransitionLink from '@/components/TransitionLink'
import { getNote, notes } from '@/lib/notes'

export function generateStaticParams() {
  return notes.map((note) => ({ slug: note.slug }))
}

export default async function NotePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const note = getNote(slug)

  if (!note) {
    notFound()
  }

  return (
    <>
      <SmoothScroll />
      <Header />
      <main>
        <article className="note-page">
          <div className="note-page__inner">
            <span className="note-page__eyebrow">{note.eyebrow}</span>
            <h1 className="note-page__title">{note.title}</h1>
            <p className="note-page__dek">{note.dek}</p>
            <div className="note-page__placeholder">
              <span>Draft placeholder</span>
              <p>
                This note is intentionally staged as a doorway for now. The gallery
                can behave like the final site while the editorial pieces are written.
              </p>
            </div>
            <TransitionLink href="/" className="note-page__back">
              Back home
              <span aria-hidden="true">→</span>
            </TransitionLink>
          </div>
        </article>
      </main>
      <GlassPill />
    </>
  )
}
