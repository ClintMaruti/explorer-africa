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

export const ColumnsBlock: Block = {
  slug: 'columnsBlock',
  interfaceName: 'ColumnsBlock',
  fields: [
    {
      name: 'anchorId',
      type: 'text',
      label: 'Anchor ID',
      required: false,
      admin: {
        description: 'Optional ID for navigation links (e.g., "location-section")',
      },
    },
    {
      name: 'columnCount',
      type: 'select',
      options: [
        { label: '1 Column', value: '1' },
        { label: '2 Columns', value: '2' },
        { label: '3 Columns', value: '3' },
        { label: '4 Columns', value: '4' },
      ],
      defaultValue: '2',
      required: true,
      label: 'Number of Columns',
    },
    {
      name: 'headerContent',
      type: 'richText',
      label: 'Header Content',
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
      required: false,
      admin: {
        condition: (data, siblingData) => {
          const count = siblingData?.columnCount
          return count === '2' || count === '3' || count === '4'
        },
        description: 'Optional title or introductory text displayed above the columns',
      },
    },
    {
      name: 'backgroundColor',
      type: 'select',
      options: ['lightGold', 'charcoal', 'white'],
      defaultValue: 'white',
      required: false,
      label: 'Background Color',
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      required: false,
      label: 'Background Image',
    },
    {
      name: 'columns',
      type: 'array',
      label: 'Columns',
      minRows: 1,
      maxRows: 4,
      required: true,
      fields: [
        {
          name: 'content',
          type: 'richText',
          label: 'Column Content',
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
      ],
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
      label: 'Column Spacing',
    },
    {
      name: 'stackOrder',
      type: 'select',
      options: [
        { label: 'Normal (First to Last)', value: 'normal' },
        { label: 'Reverse (Last to First)', value: 'reverse' },
        { label: 'Alternate (First, Third, Second, Fourth)', value: 'alternate' },
      ],
      defaultValue: 'normal',
      required: false,
      label: 'Stacking Order on Mobile',
      admin: {
        description: 'How columns should be ordered when stacked vertically on mobile devices',
      },
    },
    {
      name: 'verticalAlignment',
      type: 'select',
      options: [
        { label: 'Top', value: 'top' },
        { label: 'Center', value: 'center' },
        { label: 'Bottom', value: 'bottom' },
        { label: 'Stretch (Equal Height)', value: 'stretch' },
      ],
      defaultValue: 'top',
      required: false,
      label: 'Vertical Alignment',
      admin: {
        description: 'How columns should be aligned vertically on desktop',
      },
    },
    {
      name: 'stackBreakpoint',
      type: 'select',
      options: [
        { label: 'Small (640px)', value: 'sm' },
        { label: 'Medium (768px)', value: 'md' },
        { label: 'Large (1024px)', value: 'lg' },
      ],
      defaultValue: 'md',
      required: false,
      label: 'Stack Breakpoint',
      admin: {
        description: 'Screen size below which columns will stack vertically',
      },
    },
    {
      name: 'showBorders',
      type: 'checkbox',
      defaultValue: false,
      required: false,
      label: 'Show Border Lines Between Columns',
      admin: {
        description: 'Display separator lines between columns',
      },
    },
    {
      name: 'borderStyle',
      type: 'select',
      options: [
        { label: 'Solid Line', value: 'solid' },
        { label: 'Dashed Line', value: 'dashed' },
        { label: 'Dotted Line', value: 'dotted' },
      ],
      defaultValue: 'solid',
      required: false,
      label: 'Border Style',
      admin: {
        condition: (data, siblingData) => siblingData?.showBorders,
        description: 'Style of the border lines between columns',
      },
    },
    {
      name: 'borderColor',
      type: 'select',
      options: [
        { label: 'Gold', value: 'gold' },
        { label: 'Light Gray', value: 'lightGray' },
        { label: 'Dark Gray', value: 'darkGray' },
        { label: 'Charcoal', value: 'charcoal' },
        { label: 'White', value: 'white' },
      ],
      defaultValue: 'lightGray',
      required: false,
      label: 'Border Color',
      admin: {
        condition: (data, siblingData) => siblingData?.showBorders,
        description: 'Color of the border lines between columns',
      },
    },
    {
      name: 'borderPosition',
      type: 'select',
      options: [
        { label: 'Vertical (Between Columns)', value: 'vertical' },
        { label: 'Horizontal (Below Each Column)', value: 'horizontal' },
        { label: 'Both Vertical and Horizontal', value: 'both' },
      ],
      defaultValue: 'vertical',
      required: false,
      label: 'Border Position',
      admin: {
        condition: (data, siblingData) => siblingData?.showBorders,
        description: 'Where to display the border lines',
      },
    },
  ],
}
