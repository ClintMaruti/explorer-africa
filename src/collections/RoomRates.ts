import { CollectionConfig } from 'payload'
import { processJSONUpload } from '../hooks/roomRates'

const rateSeasons = ['low', 'mid', 'high', 'peak'] as const

const seasonRateFields = rateSeasons.map((season) => ({
  name: season,
  type: 'number' as const,
  required: true,
  admin: {
    description: `${season.charAt(0).toUpperCase() + season.slice(1)} season rate`,
  },
}))

export const RoomRates: CollectionConfig = {
  slug: 'room-rates',
  admin: {
    useAsTitle: 'year',
    group: 'Content',
    description:
      'Manage room rates and seasonal information. You can either fill the form manually or upload a JSON file.',
  },
  hooks: {
    beforeChange: [processJSONUpload],
  },
  defaultPopulate: {
    seasons: true,
    rates: true,
  },
  fields: [
    {
      name: 'year',
      type: 'number',
      required: true,
      admin: {
        description: 'Year for these rates (e.g., 2025)',
      },
    },
    {
      name: 'jsonUpload',
      type: 'json',
      admin: {
        description:
          'Optional: Upload your rates data as a JSON object. This will override any manually entered data.',
        position: 'sidebar',
      },
    },
    {
      name: 'seasons',
      type: 'group',
      required: true,
      admin: {
        description: 'Define the date ranges for each season',
      },
      fields: [
        {
          name: 'peak',
          type: 'text',
          required: true,
          admin: {
            description: 'Peak season date range',
          },
        },
        {
          name: 'high',
          type: 'text',
          required: true,
          admin: {
            description: 'High season date range',
          },
        },
        {
          name: 'mid',
          type: 'text',
          required: true,
          admin: {
            description: 'Mid season date range',
          },
        },
        {
          name: 'low',
          type: 'text',
          required: true,
          admin: {
            description: 'Low season date range',
          },
        },
      ],
    },
    {
      name: 'rates',
      type: 'array',
      required: true,
      admin: {
        description: 'Configure different room types and their rates',
      },
      fields: [
        {
          name: 'room_type',
          type: 'text',
          required: true,
          admin: {
            description: 'Name of the room type (e.g., Savannah Room)',
          },
        },
        {
          name: 'total',
          type: 'number',
          required: true,
          admin: {
            description: 'Total number of rooms of this type',
          },
        },
        {
          name: 'size',
          type: 'text',
          required: true,
          admin: {
            description: 'Size of the room (e.g., 46 sq/m)',
          },
        },
        {
          name: 'bed_options',
          type: 'text',
          required: true,
          admin: {
            description: 'Available bed configurations',
          },
        },
        {
          name: 'features',
          type: 'textarea',
          required: true,
          admin: {
            description: 'Key features and amenities of the room',
          },
        },
        {
          name: 'additional',
          type: 'textarea',
          admin: {
            description:
              'Additional information about the room (e.g., interconnecting rooms, ADA accessibility)',
          },
        },
        {
          name: 'occupancy',
          type: 'text',
          required: true,
          admin: {
            description: 'Maximum room occupancy details',
          },
        },
        {
          name: 'rate_types',
          type: 'array',
          required: true,
          admin: {
            description: 'Different rate packages available for this room type',
          },
          fields: [
            {
              name: 'rate_type',
              type: 'select',
              required: true,
              options: [
                {
                  label: 'Full Board',
                  value: 'Full Board',
                },
                {
                  label: 'Game Package',
                  value: 'Game Package',
                },
              ],
            },
            {
              name: 'rooms',
              type: 'array',
              required: true,
              admin: {
                description: 'Rates for different room configurations',
              },
              fields: [
                {
                  name: 'room',
                  type: 'select',
                  required: true,
                  options: [
                    {
                      label: 'Single',
                      value: 'Single',
                    },
                    {
                      label: 'Double',
                      value: 'Double',
                    },
                    {
                      label: 'Triple',
                      value: 'Triple',
                    },
                    {
                      label: 'Per Room',
                      value: 'Per Room',
                    },
                  ],
                },
                ...seasonRateFields,
              ],
            },
          ],
        },
      ],
    },
  ],
}
