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

export const CollapsibleBlock: Block = {
  slug: 'collapsibleBlock',
  interfaceName: 'CollapsibleBlock',
  fields: [
    {
      name: 'anchorId',
      type: 'text',
      label: 'Anchor ID',
      required: false,
      admin: {
        description: 'Optional ID for navigation links (e.g., "rates-section")',
      },
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      required: true,
      admin: {
        description: 'Heading of the collapsible block',
      },
    },
    {
      type: 'collapsible',
      label: 'Collapsible Blocks',
      fields: [
        {
          name: 'items',
          type: 'array',
          label: 'Items',
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Title',
              required: true,
              admin: {
                description: 'Title of the collapsible block',
              },
            },
            {
              name: 'content',
              type: 'richText',
              label: 'Content',
              required: true,
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
              admin: {
                description: 'Content of the collapsible block',
              },
            },
          ],
        },
      ],
    },
  ],
}
