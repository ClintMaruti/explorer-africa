import { linkGroup } from '../../fields/linkGroup'
import {
  AlignFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  ParagraphFeature,
  UnorderedListFeature,
  OrderedListFeature,
  BlockquoteFeature,
} from '@payloadcms/richtext-lexical'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import type { Block } from 'payload'

export const MediaBlock: Block = {
  slug: 'mediaBlock',
  interfaceName: 'MediaBlock',
  fields: [
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'backgroundColor',
      type: 'select',
      options: ['lightGold', 'charcoal'],
      defaultValue: 'charcoal',
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
            ParagraphFeature(),
            UnorderedListFeature(),
            OrderedListFeature(),
            BlockquoteFeature(),
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
