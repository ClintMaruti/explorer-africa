import React, { Fragment } from 'react'
import type { Page } from '@/payload-types'

import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { QuoteBlock } from '@/blocks/QuoteBlock/Component'
import { ImageContentBlock } from '@/blocks/ImageContent/Component'
import { ColumnsBlock } from '@/blocks/Columns/Component'
import { MapBlock } from '@/blocks/Map/Component'
import { GalleryBlock } from '@/blocks/Gallery/Component'
import { ParallaxBlock } from '@/blocks/Parallax/Component'
import { Footer } from './Footer/Component'
import { RoomRatesBlock } from './RoomRates/Component'
import { CollapsibleBlockComponent } from './Collapsible/Component'
import { StoriesBlock } from './Stories/Component'

const blockComponents = {
  mediaBlock: MediaBlock,
  quoteBlock: QuoteBlock,
  imageContentBlock: ImageContentBlock,
  columnsBlock: ColumnsBlock,
  mapBlock: MapBlock,
  galleryBlock: GalleryBlock,
  parallaxBlock: ParallaxBlock,
  footer: Footer,
  'room-rates-block': RoomRatesBlock,
  collapsibleBlock: CollapsibleBlockComponent,
  storiesBlock: StoriesBlock,
} as const

type BlocksMap = typeof blockComponents
type BlockType = keyof BlocksMap

export const RenderBlocks: React.FC<{
  blocks: NonNullable<Page['layout']>
}> = (props) => {
  const { blocks } = props
  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const blockData = block as unknown as { blockType: BlockType }
          const { blockType } = blockData

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div key={index}>
                  <Block {...(block as any)} disableInnerContainer />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
