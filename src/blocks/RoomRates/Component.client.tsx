'use client'

import React from 'react'
import { cn } from '@/utilities/ui'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

interface RoomRatesProps {
  year: number
  seasons: {
    peak: string
    high: string
    mid: string
    low: string
  }
  rates: {
    room_type: string
    total: number
    size: string
    bed_options: string
    features: string
    additional?: string | null
    occupancy: string
    rate_types: {
      rate_type: 'Full Board' | 'Game Package'
      rooms: {
        room: 'Single' | 'Double' | 'Triple' | 'Per Room'
        low: number
        mid: number
        high: number
        peak: number
        id?: string | null
      }[]
      id?: string | null
    }[]
    id?: string | null
  }[]
}

export const RoomRatesClientComponent: React.FC<RoomRatesProps> = ({ year, seasons, rates }) => {
  return (
    <div className="w-full bg-pale-mint-white py-16 flex flex-col items-center justify-center">
      <h1 className="text-gold-darker text-center text-4xl font-bold py-4">Room Rates {year}</h1>
      <div className="container max-w-6xl mx-auto p-6 bg-white rounded-md">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gold-dark text-white">
            <tr>
              <th rowSpan={2} className="p-2 border border-white text-left font-bold">
                ROOM TYPE
              </th>
              <th rowSpan={2} className="p-2 border border-white text-left font-bold">
                RATE TYPE
              </th>
              <th rowSpan={2} className="p-2 border border-white text-left font-bold">
                ROOM
              </th>
              <th colSpan={4} className="p-2 border border-white text-center font-bold">
                SEASONS
              </th>
            </tr>
            <tr>
              {Object.entries(seasons).map(([key, value]) => (
                <th key={key} className="p-2 border border-white text-left font-bold capitalize">
                  <div className="flex items-center gap-1">
                    {key.toUpperCase()}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button className="text-white text-xs cursor-pointer font-bold">?</button>
                      </TooltipTrigger>
                      <TooltipContent className="bg-white text-gold text-xs p-2">
                        {value}
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-sm text-gray-800">
            {rates.map((rate, rateIndex) => {
              const roomTypeRowSpan = rate.rate_types.reduce((acc, rt) => acc + rt.rooms.length, 0)
              if (roomTypeRowSpan === 0) {
                return null
              }

              let isFirstRowInRoomType = true

              return (
                <React.Fragment key={rate.id || rateIndex}>
                  {rate.rate_types.flatMap((rateType, rateTypeIndex) => {
                    const rateTypeRowSpan = rateType.rooms.length
                    if (rateTypeRowSpan === 0) {
                      return []
                    }

                    let isFirstRowInRateType = true
                    const isLastRateType = rateTypeIndex === rate.rate_types.length - 1

                    return rateType.rooms.map((room, roomIndex) => {
                      const isLastRoomInRateType = roomIndex === rateType.rooms.length - 1
                      const isLastRowOfGroup = isLastRateType && isLastRoomInRateType
                      const isLastGroup = rateIndex === rates.length - 1
                      const isLastRowOfTable = isLastRowOfGroup && isLastGroup

                      const row = (
                        <tr
                          key={room.id || `${rateIndex}-${rateTypeIndex}-${roomIndex}`}
                          className={cn({
                            'border-b-2 border-gold-darker': isLastRowOfGroup && !isLastGroup,
                            'border-b border-gray-200': !isLastRowOfGroup && !isLastRowOfTable,
                          })}
                        >
                          {isFirstRowInRoomType && (
                            <td
                              rowSpan={roomTypeRowSpan}
                              className="p-2 align-top font-semibold text-gold-darker"
                            >
                              <div className="flex items-center gap-1">
                                <span>
                                  {rate.room_type} ({rate.total} total)
                                </span>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <button className="text-gold-dark text-base cursor-pointer">
                                      ⓘ
                                    </button>
                                  </TooltipTrigger>
                                  <TooltipContent className="bg-white text-gold text-xs p-2 max-w-xs text-left">
                                    <div className="space-y-2">
                                      <div className="flex items-start gap-2">
                                        <p className="w-28 shrink-0 text-sm font-bold text-gold-dark">
                                          Size:
                                        </p>
                                        <p className="text-sm text-black/80">{rate.size}</p>
                                      </div>
                                      <div className="flex items-start gap-2">
                                        <p className="w-28 shrink-0 text-sm font-bold text-gold-dark">
                                          Bed Options:
                                        </p>
                                        <p className="text-sm text-black/80">{rate.bed_options}</p>
                                      </div>
                                      <div className="flex items-start gap-2">
                                        <p className="w-28 shrink-0 text-sm font-bold text-gold-dark">
                                          Features:
                                        </p>
                                        <p className="text-sm text-black/80">{rate.features}</p>
                                      </div>
                                      {rate.additional && (
                                        <div className="flex items-start gap-2">
                                          <p className="w-28 shrink-0 text-sm font-bold text-gold-dark">
                                            Additional:
                                          </p>
                                          <p className="text-sm text-black/80">{rate.additional}</p>
                                        </div>
                                      )}
                                      <div className="flex items-start gap-2">
                                        <p className="w-28 shrink-0 text-sm font-bold text-gold-dark">
                                          Occupancy:
                                        </p>
                                        <p className="text-sm text-black/80">{rate.occupancy}</p>
                                      </div>
                                    </div>
                                  </TooltipContent>
                                </Tooltip>
                              </div>
                            </td>
                          )}
                          {isFirstRowInRateType && (
                            <td rowSpan={rateTypeRowSpan} className="p-2 align-top">
                              {rateType.rate_type}
                            </td>
                          )}
                          <td className="p-2">{room.room}</td>
                          <td className="p-2 text-right">{room.peak.toLocaleString()}</td>
                          <td className="p-2 text-right">{room.high.toLocaleString()}</td>
                          <td className="p-2 text-right">{room.mid.toLocaleString()}</td>
                          <td className="p-2 text-right">{room.low.toLocaleString()}</td>
                        </tr>
                      )

                      isFirstRowInRoomType = false
                      isFirstRowInRateType = false
                      return row
                    })
                  })}
                </React.Fragment>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
