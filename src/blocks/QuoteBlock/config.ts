import {
  InlineToolbarFeature,
  FixedToolbarFeature,
  HeadingFeature,
  lexicalEditor,
  AlignFeature,
} from '@payloadcms/richtext-lexical'
import { Block } from 'payload'

export const QuoteBlock: Block = {
  slug: 'quoteBlock',
  interfaceName: 'QuoteBlock',
  fields: [
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: false,
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
  ],
}
