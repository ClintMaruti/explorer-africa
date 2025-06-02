import { HeadingFeature } from '@payloadcms/richtext-lexical'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { Block } from 'payload'

export const Footer: Block = {
  slug: 'footer',
  interfaceName: 'Footer',
  fields: [
    {
      name: 'mainLogo',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Main Logo',
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      required: false,
      label: 'Background Image',
    },
    {
      name: 'phoneNumbers',
      type: 'array',
      required: true,
      label: 'Phone Numbers',
      fields: [
        {
          name: 'phoneNumber',
          type: 'text',
        },
      ],
    },
    {
      name: 'email',
      type: 'text',
      required: true,
      label: 'Email',
    },
    {
      name: 'otherLogos',
      type: 'array',
      fields: [
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
          ]
        },
      }),
    },
  ],
}
