'use client'
import React from 'react'
import { useLayoutEffect } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import ScrollSmoother from 'gsap/ScrollSmoother'
import type { RequiredDataFromCollectionSlug } from 'payload'
import { RenderHero } from '@/heros/RenderHero'
import { RenderBlocks } from '@/blocks/RenderBlocks'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

interface PageClientProps {
  page: RequiredDataFromCollectionSlug<'pages'>
}

const PageClient: React.FC<PageClientProps> = ({ page }) => {
  useLayoutEffect(() => {
    // Create the smooth scroller
    const smoother = ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: 2,
      effects: true,
    })

    return () => {
      // Cleanup
      smoother.kill()
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return (
    <div id="smooth-wrapper" className="relative overflow-hidden">
      <div id="smooth-content">
        <section className="relative">
          <RenderHero {...page.hero} />
        </section>
        <section className="relative bg-charcoal">
          <RenderBlocks blocks={page.layout || []} />
        </section>
      </div>
    </div>
  )
}

export default PageClient
