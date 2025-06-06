import { Block } from 'payload'

export const StoriesBlock: Block = {
  slug: 'storiesBlock',
  interfaceName: 'StoriesBlock',
  fields: [
    {
      name: 'stories',
      type: 'relationship',
      relationTo: 'stories',
      hasMany: true,
    },
  ],
}
