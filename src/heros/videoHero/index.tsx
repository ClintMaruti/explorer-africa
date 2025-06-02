'use client'

import { useLayoutEffect, useRef, useMemo } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import ScrollSmoother from 'gsap/ScrollSmoother'
import { Media } from '@/components/Media'
import type { Page } from '@/payload-types'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/ui'
import { DefaultNodeTypes } from '@payloadcms/richtext-lexical'
import { JSXConvertersFunction } from '@payloadcms/richtext-lexical/react'
import { useHeroTextConverters } from '@/components/RichTextConverters/heroTextConverters'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

const VIDEO_STRIPS = 6

export const VideoHero: React.FC<Page['hero']> = ({ type = 'videoHero', media, richText }) => {
  const videoRef = useRef<HTMLDivElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)
  const heroTextConverters = useHeroTextConverters()

  useLayoutEffect(() => {
    // Create the smooth scroller
    const smoother = ScrollSmoother.create({
      wrapper: '#wrapper',
      content: '#content',
      smooth: 2,
      speed: 3,
      effects: true,
    })

    // Add varying speeds to each video container
    smoother.effects('.video-strip', {
      speed: () => gsap.utils.random(0.55, 0.85, 0.05),
    })

    // Create the reveal animation with a timeline
    const tl = gsap.timeline()

    // Set initial state
    gsap.set('.anim-swipe', {
      yPercent: 0,
      opacity: 1,
      backgroundColor: '#000000',
    })

    // Animate the swipe effect
    tl.to('.anim-swipe', {
      yPercent: 100,
      opacity: 0,
      duration: 1.2,
      stagger: {
        amount: 0.8,
        from: 'random',
      },
      ease: 'power2.inOut',
    })

    // Animate scroll indicator
    gsap.to(scrollIndicatorRef.current, {
      y: 20,
      opacity: 0.5,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    })

    // Create the scroll-triggered scale animation
    gsap.to('.video-strip', {
      scale: 1.5,
      xPercent: 20,
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: '+=3000px',
        scrub: true,
        onEnter: () => {
          gsap.to(scrollIndicatorRef.current, {
            opacity: 0,
            duration: 0.3,
          })
        },
      },
    })

    return () => {
      // Cleanup
      tl.kill()
      smoother.kill()
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return (
    <div id="wrapper" className="relative">
      <div id="content">
        <section className="hero h-screen relative overflow-hidden">
          {/* Single video element positioned absolutely */}
          {media && typeof media === 'object' && (
            <div ref={videoRef} className="absolute inset-0 z-[1]">
              <Media fill resource={media} videoClassName="w-full h-full object-cover" />
            </div>
          )}
          {/* Strips that mask the video */}
          <div className="hero__inner grid grid-cols-6 h-full relative z-10">
            {Array.from({ length: VIDEO_STRIPS }).map((_, index) => (
              <div
                key={index}
                className={cn(
                  'video-strip relative overflow-hidden backdrop-brightness-90 transition-[backdrop-filter] duration-300 ease-in-out hover:backdrop-brightness-100',
                  // Add divider line for all strips except the last one
                  index < VIDEO_STRIPS - 1 &&
                    'after:absolute after:right-0 after:top-0 after:h-full after:w-[2.5px] after:bg-black/30 after:z-[999]',
                )}
              >
                <div className="anim-swipe absolute inset-0 transform-gpu will-change-transform" />
              </div>
            ))}
          </div>
          {/* Rich text overlay */}
          <div className="absolute bottom-0 left-0 right-0 z-20 p-8">
            {richText && (
              <RichText data={richText} enableGutter={false} converters={heroTextConverters} />
            )}
          </div>
          {/* Scroll indicator */}
          <div
            ref={scrollIndicatorRef}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 text-white flex flex-col items-center opacity-0"
          >
            <span className="font-poppins text-sm tracking-wider mb-2">Scroll Down</span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </div>
        </section>
      </div>
    </div>
  )
}
