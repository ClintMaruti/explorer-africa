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
      name: 'anchorId',
      type: 'text',
      label: 'Anchor ID',
      required: false,
      admin: {
        description: 'Optional ID for navigation links (e.g., "accommodation-section")',
      },
    },
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
      name: 'backgroundColor',
      type: 'select',
      options: [
        { label: 'Light Gold', value: 'lightGold' },
        { label: 'Charcoal', value: 'charcoal' },
        { label: 'White', value: 'white' },
        { label: 'Gold Dark', value: 'gold-dark' },
        { label: 'Gold Darker', value: 'gold-darker' },
        { label: 'Gold Darkest', value: 'gold-darkest' },
        { label: 'Auto (Based on Position)', value: 'auto' },
      ],
      defaultValue: 'auto',
      required: false,
      label: 'Background Color',
    },
    {
      name: 'contentSections',
      type: 'array',
      label: 'Content Sections',
      minRows: 1,
      required: true,
      admin: {
        description: 'Add multiple content sections with individual styling',
      },
      dbName: 'sections',
      fields: [
        {
          name: 'sectionType',
          type: 'select',
          options: [
            { label: 'Rich Text', value: 'richText' },
            { label: 'Horizontal Line', value: 'horizontalLine' },
          ],
          defaultValue: 'richText',
          required: true,
          label: 'Section Type',
          dbName: 'type',
        },
        {
          name: 'richText',
          type: 'richText',
          label: 'Content',
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
          admin: {
            condition: (data, siblingData) => siblingData?.sectionType === 'richText',
          },
        },
        {
          name: 'textColor',
          type: 'select',
          options: [
            { label: 'Dark (Charcoal)', value: 'dark' },
            { label: 'Light (White)', value: 'light' },
            { label: 'Gold', value: 'gold' },
            { label: 'Gold Dark', value: 'gold-dark' },
            { label: 'Gold Darker', value: 'gold-darker' },
            { label: 'Gold Darkest', value: 'gold-darkest' },
            { label: 'Auto (Based on Position)', value: 'auto' },
          ],
          defaultValue: 'auto',
          required: false,
          label: 'Text Color',
          admin: {
            condition: (data, siblingData) => siblingData?.sectionType === 'richText',
            description: 'Color for this text section',
          },
          dbName: 'txtColor',
        },
        {
          name: 'lineColor',
          type: 'select',
          options: [
            { label: 'Gold', value: 'gold' },
            { label: 'Gold Dark', value: 'gold-dark' },
            { label: 'Gold Darker', value: 'gold-darker' },
            { label: 'Gold Darkest', value: 'gold-darkest' },
            { label: 'Charcoal', value: 'charcoal' },
            { label: 'White', value: 'white' },
            { label: 'Light Gold', value: 'lightGold' },
          ],
          defaultValue: 'gold',
          required: false,
          label: 'Line Color',
          admin: {
            condition: (data, siblingData) => siblingData?.sectionType === 'horizontalLine',
          },
          dbName: 'lnColor',
        },
        {
          name: 'lineWidth',
          type: 'select',
          options: [
            { label: 'Short (80px)', value: 'short' },
            { label: 'Medium (120px)', value: 'medium' },
            { label: 'Long (160px)', value: 'long' },
            { label: 'Full Width', value: 'full' },
          ],
          defaultValue: 'short',
          required: false,
          label: 'Line Width',
          admin: {
            condition: (data, siblingData) => siblingData?.sectionType === 'horizontalLine',
          },
          dbName: 'lnWidth',
        },
        {
          name: 'spacing',
          type: 'select',
          options: [
            { label: 'Small', value: 'small' },
            { label: 'Medium', value: 'medium' },
            { label: 'Large', value: 'large' },
          ],
          defaultValue: 'medium',
          required: false,
          label: 'Section Spacing',
          admin: {
            description: 'Vertical spacing around this section',
          },
          dbName: 'space',
        },
      ],
    },
    {
      name: 'showSeparatorLines',
      type: 'checkbox',
      defaultValue: false,
      required: false,
      label: 'Show Separator Lines Between Sections',
      admin: {
        description: 'Automatically add horizontal lines between content sections',
      },
    },
    {
      name: 'separatorStyle',
      type: 'select',
      options: [
        { label: 'Solid Line', value: 'solid' },
        { label: 'Dashed Line', value: 'dashed' },
        { label: 'Dotted Line', value: 'dotted' },
      ],
      defaultValue: 'solid',
      required: false,
      label: 'Separator Line Style',
      admin: {
        condition: (data, siblingData) => siblingData?.showSeparatorLines,
        description: 'Style of the separator lines between sections',
      },
    },
    {
      name: 'separatorColor',
      type: 'select',
      options: [
        { label: 'Gold', value: 'gold' },
        { label: 'Gold Dark', value: 'gold-dark' },
        { label: 'Gold Darker', value: 'gold-darker' },
        { label: 'Gold Darkest', value: 'gold-darkest' },
        { label: 'Light Gray', value: 'lightGray' },
        { label: 'Dark Gray', value: 'darkGray' },
        { label: 'Charcoal', value: 'charcoal' },
        { label: 'White', value: 'white' },
        { label: 'Auto (Based on Background)', value: 'auto' },
      ],
      defaultValue: 'auto',
      required: false,
      label: 'Separator Line Color',
      admin: {
        condition: (data, siblingData) => siblingData?.showSeparatorLines,
        description: 'Color of the separator lines between sections',
      },
    },
    {
      name: 'separatorWidth',
      type: 'select',
      options: [
        { label: 'Short (80px)', value: 'short' },
        { label: 'Medium (120px)', value: 'medium' },
        { label: 'Long (160px)', value: 'long' },
        { label: 'Full Width', value: 'full' },
      ],
      defaultValue: 'medium',
      required: false,
      label: 'Separator Line Width',
      admin: {
        condition: (data, siblingData) => siblingData?.showSeparatorLines,
        description: 'Width of the separator lines between sections',
      },
    },
    linkGroup({
      overrides: {
        maxRows: 2,
      },
    }),
  ],
}
