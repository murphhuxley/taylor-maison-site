'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from 'react'
import { usePageTransition } from './PageTransition'

interface TransitionLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  children: ReactNode
  href: string
  prefetch?: boolean
}

function isModifiedEvent(event: MouseEvent<HTMLAnchorElement>) {
  return event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0
}

export default function TransitionLink({
  children,
  href,
  onClick,
  prefetch,
  target,
  ...props
}: TransitionLinkProps) {
  const pathname = usePathname()
  const { navigate } = usePageTransition()

  const isSamePageHash =
    href.startsWith('#') ||
    href.startsWith(`${pathname}#`) ||
    (pathname === '/' && href.startsWith('/#'))

  const isExternal =
    href.startsWith('http://') ||
    href.startsWith('https://') ||
    href.startsWith('mailto:') ||
    href.startsWith('tel:')

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event)

    if (
      event.defaultPrevented ||
      isModifiedEvent(event) ||
      target === '_blank' ||
      isExternal ||
      isSamePageHash
    ) {
      return
    }

    event.preventDefault()
    navigate(href)
  }

  return (
    <Link href={href} prefetch={prefetch} target={target} onClick={handleClick} {...props}>
      {children}
    </Link>
  )
}
