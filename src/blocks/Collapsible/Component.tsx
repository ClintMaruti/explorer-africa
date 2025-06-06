import React, { useState } from 'react'
import RichText from '@/components/RichText'
import type { CollapsibleBlock } from '../../payload-types'
import { useCollapsibleTextConverters } from '@/components/RichTextConverters/collapsibleTextConverters'

export const CollapsibleBlockComponent: React.FC<CollapsibleBlock> = ({
  heading,
  items,
  anchorId,
}) => {
  const [openItems, setOpenItems] = useState<string[]>([])
  const converters = useCollapsibleTextConverters()

  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((itemIndex) => itemIndex !== id) : [...prev, id],
    )
  }

  return (
    <div
      id={anchorId || undefined}
      className="w-full bg-pale-mint-white py-16 flex flex-col items-center justify-center"
    >
      <h2 className="mb-8 text-center text-2xl font-light uppercase tracking-[0.2em] text-gray-700">
        {heading}
      </h2>
      <div className="container max-w-6xl mx-auto p-6 bg-white rounded-md">
        {items?.map((item) => {
          if (!item.id) {
            return null
          }
          return (
            <div key={item.id} className="border-b border-gray-200">
              <button
                type="button"
                className="flex w-full items-center justify-between py-5 text-left text-gray-500"
                onClick={() => toggleItem(item.id!)}
                aria-expanded={openItems.includes(item.id)}
              >
                <span>{item.title}</span>
                <span className="text-2xl font-light">
                  {openItems.includes(item.id) ? '−' : '+'}
                </span>
              </button>
              {openItems.includes(item.id) && (
                <div className="prose prose-sm max-w-none pb-5 text-gray-600">
                  <RichText data={item.content} converters={converters} />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
