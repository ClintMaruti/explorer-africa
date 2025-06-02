'use client'
import React from 'react'
import Image from 'next/image'
import type { Page } from '@/payload-types'

export const ImageHero: React.FC<Page['hero']> = ({ media }) => {
  const url = media && typeof media === 'object' && 'url' in media ? media.url : null

  return (
    <div className="relative h-screen w-full">
      {url && <Image src={url} alt="" fill className="object-cover" priority />}
    </div>
  )
}
