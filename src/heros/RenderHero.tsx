import React from 'react'
import { VideoHero } from './videoHero'
import { ImageHero } from './imageHero'
import { Page } from '@/payload-types'

const heroes = {
  videoHero: VideoHero,
  imageHero: ImageHero,
}

export const RenderHero: React.FC<Page['hero']> = (props) => {
  const { type } = props || {}

  const HeroToRender = heroes[type] || null

  if (!HeroToRender) return null

  return <HeroToRender {...props} />
}
