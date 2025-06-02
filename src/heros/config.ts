import type { Field } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
  AlignFeature,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '@/fields/linkGroup'

type HeroData = {
  type: 'imageHero' | 'videoHero'
}

type MediaType = {
  mimeType?: string
}

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      label: 'Type',
      options: [
        {
          label: 'Image Hero',
          value: 'imageHero',
        },
        {
          label: 'Video Hero',
          value: 'videoHero',
        },
      ],
      required: true,
    },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
      validate: (value: unknown) => {
        if (!value) return true // Let required handle this

        const media = value as MediaType
        const parentData = (value as any)?.doc as HeroData

        if (parentData?.type === 'videoHero') {
          // For video hero, ensure it's a video file
          if (!media.mimeType?.startsWith('video/')) {
            return 'Please upload a video file for Video Hero'
          }
        } else if (parentData?.type === 'imageHero') {
          // For image hero, ensure it's an image file
          if (!media.mimeType?.startsWith('image/')) {
            return 'Please upload an image file for Image Hero'
          }
        }
        return true
      },
    },
    {
      name: 'richText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
            AlignFeature(),
          ]
        },
      }),
    },
    linkGroup({
      overrides: {
        maxRows: 2,
      },
    }),
  ],
  label: false,
}
