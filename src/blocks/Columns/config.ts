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
      name: 'columnCount',
      type: 'select',
      options: [
        { label: '2 Columns', value: '2' },
        { label: '3 Columns', value: '3' },
        { label: '4 Columns', value: '4' },
      ],
      defaultValue: '2',
      required: true,
      label: 'Number of Columns',
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
      minRows: 2,
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
  ],
}
