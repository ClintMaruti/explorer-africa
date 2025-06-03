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
    {
      name: 'menuItems',
      type: 'array',
      label: 'Menu Icons',
      maxRows: 8,
      required: false,
      admin: {
        description: 'Add menu icons that link to sections on the page',
      },
      fields: [
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Menu Icon',
          admin: {
            description: 'Upload an icon (SVG, PNG, or JPEG recommended)',
          },
        },
        {
          name: 'name',
          type: 'text',
          required: true,
          label: 'Menu Name',
          admin: {
            description: 'Display name for the menu item',
          },
        },
        {
          name: 'anchorId',
          type: 'text',
          required: true,
          label: 'Anchor ID',
          admin: {
            description: 'ID of the section to scroll to (e.g., "restaurant-section")',
          },
        },
      ],
    },
    linkGroup({
      overrides: {
        maxRows: 2,
      },
    }),
  ],
}
