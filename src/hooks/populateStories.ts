import { CollectionBeforeReadHook } from 'payload'

export const populateStories: CollectionBeforeReadHook = async ({ doc, req, req: { payload } }) => {
  if (doc?.stories) {
    const stories = await payload.find({
      collection: 'stories',
      where: {
        _status: {
          equals: 'published',
        },
        _in: doc.stories,
      },
      depth: 2,
    })

    doc.stories = stories.docs
  }
}
