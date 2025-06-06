import React from 'react'
import type { RoomRate } from '@/payload-types'
import { RoomRatesClientComponent } from './Component.client'

interface RoomRatesBlockProps {
  roomRates: number | RoomRate
  anchorId?: string
}

export const RoomRatesBlock = ({ roomRates }: RoomRatesBlockProps) => {
  if (typeof roomRates === 'number' || typeof roomRates === 'string') {
    return <div>No room rates data available.</div>
  }

  const { year, seasons, rates } = roomRates

  return <RoomRatesClientComponent year={year} seasons={seasons} rates={rates} />
}
