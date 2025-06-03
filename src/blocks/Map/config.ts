import type { Block } from 'payload'

export const MapBlock: Block = {
  slug: 'mapBlock',
  interfaceName: 'MapBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Map Title',
      required: false,
    },
    {
      name: 'mapType',
      type: 'select',
      options: [
        { label: 'Google Maps', value: 'google' },
        { label: 'Custom Embed', value: 'embed' },
      ],
      defaultValue: 'google',
      required: true,
      label: 'Map Type',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'latitude',
          type: 'number',
          required: false,
          label: 'Latitude',
          admin: {
            width: '50%',
          },
        },
        {
          name: 'longitude',
          type: 'number',
          required: false,
          label: 'Longitude',
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      name: 'address',
      type: 'text',
      label: 'Address or Location Name',
      required: false,
      admin: {
        description: 'Used for Google Maps search if coordinates are not provided',
      },
    },
    {
      name: 'embedUrl',
      type: 'text',
      label: 'Embed URL',
      required: false,
      admin: {
        condition: (data) => data.mapType === 'embed',
        description: 'Full embed URL for custom maps (Google Maps, OpenStreetMap, etc.)',
      },
    },
    {
      name: 'zoomLevel',
      type: 'number',
      label: 'Zoom Level',
      defaultValue: 15,
      min: 1,
      max: 20,
      required: false,
      admin: {
        condition: (data) => data.mapType === 'google',
        description: 'Zoom level (1-20, higher = more zoomed in)',
      },
    },
    {
      name: 'mapMode',
      type: 'select',
      options: [
        { label: 'Roadmap', value: 'roadmap' },
        { label: 'Satellite', value: 'satellite' },
        { label: 'Hybrid', value: 'hybrid' },
        { label: 'Terrain', value: 'terrain' },
      ],
      defaultValue: 'roadmap',
      required: false,
      label: 'Map Mode',
      admin: {
        condition: (data) => data.mapType === 'google',
      },
    },
    {
      name: 'height',
      type: 'select',
      options: [
        { label: 'Small (300px)', value: 'small' },
        { label: 'Medium (400px)', value: 'medium' },
        { label: 'Large (500px)', value: 'large' },
        { label: 'Extra Large (600px)', value: 'xl' },
      ],
      defaultValue: 'medium',
      required: false,
      label: 'Map Height',
    },
    {
      name: 'showControls',
      type: 'checkbox',
      label: 'Show Map Controls',
      defaultValue: true,
      admin: {
        condition: (data) => data.mapType === 'google',
      },
    },
    {
      name: 'allowFullscreen',
      type: 'checkbox',
      label: 'Allow Fullscreen',
      defaultValue: true,
    },
    {
      name: 'borderRadius',
      type: 'select',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Small', value: 'small' },
        { label: 'Medium', value: 'medium' },
        { label: 'Large', value: 'large' },
      ],
      defaultValue: 'medium',
      required: false,
      label: 'Border Radius',
    },
  ],
}
