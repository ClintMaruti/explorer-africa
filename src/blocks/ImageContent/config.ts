import { linkGroup } from '@/fields/linkGroup'
import {
  AlignFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
} from '@payloadcms/richtext-lexical'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import type { Block } from 'payload'

export const ImageContentBlock: Block = {
  slug: 'imageContentBlock',
  interfaceName: 'ImageContentBlock',
  fields: [
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'imagePosition',
      type: 'select',
      options: ['left', 'right'],
      defaultValue: 'left',
      required: true,
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
}
