export type Note = {
  slug: string
  eyebrow: string
  title: string
  dek: string
}

export const notes: Note[] = [
  {
    slug: 'content-strategy',
    eyebrow: 'Field note',
    title: 'What is the value of content strategy?',
    dek:
      'A working note on why better content is rarely about posting more. It is about deciding what the business needs people to understand before they inquire.',
  },
  {
    slug: 'digital-strategy',
    eyebrow: 'Field note',
    title: 'Digital strategy before design',
    dek:
      'A working note on the difference between making a site look better and making the digital presence support how the business actually wins.',
  },
  {
    slug: 'ai-without-the-panic',
    eyebrow: 'Field note',
    title: 'AI without the panic',
    dek:
      'A working note on adopting practical AI without turning the business into a gimmick or overwhelming the team.',
  },
]

export function getNote(slug: string) {
  return notes.find((note) => note.slug === slug)
}
