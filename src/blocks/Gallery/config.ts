import type { Block } from 'payload'

export const GalleryBlock: Block = {
  slug: 'galleryBlock',
  interfaceName: 'GalleryBlock',
  fields: [
    {
      name: 'anchorId',
      type: 'text',
      label: 'Anchor ID',
      required: false,
      admin: {
        description: 'Optional ID for navigation links (e.g., "gallery-section")',
      },
    },
    {
      name: 'title',
      type: 'text',
      label: 'Gallery Title',
      required: false,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Gallery Description',
      required: false,
    },
    {
      name: 'images',
      type: 'array',
      label: 'Gallery Images',
      minRows: 1,
      required: true,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Image',
        },
        {
          name: 'caption',
          type: 'text',
          label: 'Image Caption',
          required: false,
        },
        {
          name: 'alt',
          type: 'text',
          label: 'Alt Text',
          required: false,
          admin: {
            description: 'Alternative text for accessibility',
          },
        },
      ],
    },
    {
      name: 'layout',
      type: 'select',
      options: [
        { label: '2 Columns', value: '2' },
        { label: '3 Columns', value: '3' },
        { label: '4 Columns', value: '4' },
        { label: '5 Columns', value: '5' },
      ],
      defaultValue: '4',
      required: false,
      label: 'Columns',
    },
    {
      name: 'aspectRatio',
      type: 'select',
      options: [
        { label: 'Square (1:1)', value: 'square' },
        { label: 'Landscape (4:3)', value: 'landscape' },
        { label: 'Portrait (3:4)', value: 'portrait' },
        { label: 'Wide (16:9)', value: 'wide' },
        { label: 'Auto (Original)', value: 'auto' },
      ],
      defaultValue: 'landscape',
      required: false,
      label: 'Image Aspect Ratio',
    },
    {
      name: 'spacing',
      type: 'select',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Small', value: 'small' },
        { label: 'Medium', value: 'medium' },
        { label: 'Large', value: 'large' },
      ],
      defaultValue: 'small',
      required: false,
      label: 'Image Spacing',
    },
    {
      name: 'enableLightbox',
      type: 'checkbox',
      label: 'Enable Lightbox',
      defaultValue: true,
      admin: {
        description: 'Allow images to open in full-screen lightbox on click',
      },
    },
    {
      name: 'showCaptions',
      type: 'checkbox',
      label: 'Show Captions',
      defaultValue: true,
      admin: {
        description: 'Display image captions below each image',
      },
    },
    {
      name: 'backgroundColor',
      type: 'select',
      options: ['white', 'lightGold', 'charcoal'],
      defaultValue: 'white',
      required: false,
      label: 'Background Color',
    },
  ],
}
