import { linkGroup } from '@/fields/linkGroup'
import { Block } from 'payload'

export const LiveCamBlock: Block = {
  slug: 'liveCam',
  interfaceName: 'LiveCamBlock',
  fields: [
    {
      name: 'anchorId',
      label: 'Anchor ID',
      type: 'text',
      required: false,
    },
    {
      name: 'liveCamGallery',
      label: 'Live Cam Gallery',
      type: 'array',
      fields: [
        {
          name: 'thumbnail',
          label: 'Thumbnail',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        linkGroup({
          overrides: {
            maxRows: 2,
            dbName: 'live_cam_gallery_links',
          },
        }),
        {
          name: 'title',
          label: 'Title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          label: 'Description',
          type: 'textarea',
          required: false,
        },
        {
          name: 'isActive',
          label: 'Is Active',
          type: 'checkbox',
          required: false,
        },
        {
          name: 'updatedAt',
          label: 'Updated At',
          type: 'date',
          required: false,
          admin: {
            readOnly: true,
          },
        },
      ],
      hooks: {
        beforeChange: [
          ({ value }) => {
            if (Array.isArray(value)) {
              return value.map((item) => ({
                ...item,
                updatedAt: new Date(),
              }))
            }
            return value
          },
        ],
      },
    },
  ],
}
