import { Footer } from '@/blocks/Footer/config'
import { ImageContentBlock } from '@/blocks/ImageContent/config'
import { MediaBlock } from '@/blocks/MediaBlock/config'
import { QuoteBlock } from '@/blocks/QuoteBlock/config'
import { ColumnsBlock } from '@/blocks/Columns/config'
import { MapBlock } from '@/blocks/Map/config'
import { GalleryBlock } from '@/blocks/Gallery/config'
import { ParallaxBlock } from '@/blocks/Parallax/config'
import { RoomRatesBlock } from '@/blocks/RoomRates/config'
import { CollapsibleBlock } from '@/blocks/Collapsible/config'
import { slugField } from '@/fields/slug'
import { hero } from '@/heros/config'
import { populatePublishedAt } from '@/hooks/populatePublishedAt'
import { revalidatePage } from '@/hooks/revalidatePage'
import { revalidateDelete } from '@/hooks/revalidatePage'
import { generatePreviewPath } from '@/utilities/generatePreviewPath'
import { CollectionConfig } from 'payload'

export const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
  access: {
    read: () => true,
  },
  defaultPopulate: {
    title: true,
    layout: {
      'room-rates-block': true,
    },
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'pages',
          req,
        })

        return path
      },
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'pages',
        req,
      }),
    useAsTitle: 'title',
  },

  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [hero],
          label: 'Hero',
        },
        {
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [
                MediaBlock,
                QuoteBlock,
                ImageContentBlock,
                ColumnsBlock,
                MapBlock,
                GalleryBlock,
                ParallaxBlock,
                RoomRatesBlock,
                Footer,
                CollapsibleBlock,
              ],
              required: false,
              admin: {
                initCollapsed: true,
              },
            },
          ],
          label: 'Content',
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    ...slugField(),
  ],
  hooks: {
    afterChange: [revalidatePage],
    beforeChange: [populatePublishedAt],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
