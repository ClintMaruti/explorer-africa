import type { Block } from 'payload'

export const RoomRatesBlock: Block = {
  slug: 'room-rates-block',
  interfaceName: 'RoomRatesBlock',
  fields: [
    {
      name: 'anchorId',
      type: 'text',
      label: 'Anchor ID',
      required: false,
      admin: {
        description: 'Optional ID for navigation links (e.g., "rates-section")',
      },
    },
    {
      name: 'roomRates',
      type: 'relationship',
      relationTo: 'room-rates',
      required: true,
      label: 'Room Rates Data',
      admin: {
        description: 'Select the room rates data to display',
      },
    },
  ],
}
