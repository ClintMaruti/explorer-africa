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

export const ParallaxBlock: Block = {
  slug: 'parallaxBlock',
  interfaceName: 'ParallaxBlock',
  fields: [
    {
      name: 'anchorId',
      type: 'text',
      label: 'Anchor ID',
      required: false,
      admin: {
        description: 'Optional ID for navigation links (e.g., "parallax-section")',
      },
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Background Image',
      admin: {
        description: 'High resolution image for best parallax effect',
      },
    },
    {
      name: 'height',
      type: 'select',
      options: [
        { label: 'Small (400px)', value: 'small' },
        { label: 'Medium (600px)', value: 'medium' },
        { label: 'Large (800px)', value: 'large' },
        { label: 'Extra Large (100vh)', value: 'xl' },
      ],
      defaultValue: 'large',
      required: false,
      label: 'Section Height',
    },
    {
      name: 'parallaxSpeed',
      type: 'select',
      options: [
        { label: 'Slow (0.3)', value: 'slow' },
        { label: 'Medium (0.5)', value: 'medium' },
        { label: 'Fast (0.7)', value: 'fast' },
        { label: 'None (Static)', value: 'none' },
      ],
      defaultValue: 'medium',
      required: false,
      label: 'Parallax Speed',
      admin: {
        description: 'How fast the background moves relative to scroll',
      },
    },
    {
      name: 'overlay',
      type: 'select',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Light (30%)', value: 'light' },
        { label: 'Medium (50%)', value: 'medium' },
        { label: 'Dark (70%)', value: 'dark' },
      ],
      defaultValue: 'medium',
      required: false,
      label: 'Overlay Darkness',
      admin: {
        description: 'Dark overlay to improve text readability',
      },
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Content',
      required: false,
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
        description: 'Optional text content displayed over the parallax background',
      },
    },
    {
      name: 'textAlignment',
      type: 'select',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
      ],
      defaultValue: 'center',
      required: false,
      label: 'Text Alignment',
    },
    {
      name: 'textColor',
      type: 'select',
      options: [
        { label: 'White', value: 'white' },
        { label: 'Black', value: 'black' },
        { label: 'Gold', value: 'gold' },
      ],
      defaultValue: 'white',
      required: false,
      label: 'Text Color',
    },
  ],
}
