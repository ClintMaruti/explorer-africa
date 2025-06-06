'use client'
import React from 'react'
import type { Page } from '@/payload-types'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { useHeroTextConverters } from '@/components/RichTextConverters/heroTextConverters'

export const ImageHero: React.FC<Page['hero']> = ({ media, richText }) => {
  const heroTextConverters = useHeroTextConverters()

  return (
    <section className="relative h-[25vh] md:h-[50vh] w-full overflow-hidden">
      {media && typeof media === 'object' && (
        <div className="absolute inset-0 z-[1]">
          <Media fill resource={media} imgClassName="w-full h-full object-cover" />
        </div>
      )}
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 z-[2] bg-gradient-to-b from-black/10 via-black/40 to-black/70" />
      {/* Rich text overlay */}
      <div className="absolute bottom-0 left-0 right-0 z-20 p-8">
        {richText && (
          <RichText data={richText} enableGutter={false} converters={heroTextConverters} />
        )}
      </div>
    </section>
  )
}
