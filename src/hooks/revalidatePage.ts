import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import type { Page } from '@/payload-types'

export const revalidatePage: CollectionAfterChangeHook<Page> = async ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    // Only import and use revalidation functions in server environment
    if (typeof window === 'undefined') {
      try {
        const { revalidatePath, revalidateTag } = await import('next/cache')

        if (doc._status === 'published') {
          const path = doc.slug === 'home' ? '/' : `/${doc.slug}`

          payload.logger.info(`Revalidating page at path: ${path}`)

          revalidatePath(path)
          revalidateTag('pages-sitemap')
        }

        // If the page was previously published, we need to revalidate the old path
        if (previousDoc?._status === 'published' && doc._status !== 'published') {
          const oldPath = previousDoc.slug === 'home' ? '/' : `/${previousDoc.slug}`

          payload.logger.info(`Revalidating old page at path: ${oldPath}`)

          revalidatePath(oldPath)
          revalidateTag('pages-sitemap')
        }
      } catch (error) {
        payload.logger.error('Failed to revalidate page:', error)
      }
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Page> = async ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    // Only import and use revalidation functions in server environment
    if (typeof window === 'undefined') {
      try {
        const { revalidatePath, revalidateTag } = await import('next/cache')
        const path = doc?.slug === 'home' ? '/' : `/${doc?.slug}`
        revalidatePath(path)
        revalidateTag('pages-sitemap')
      } catch (error) {
        console.error('Failed to revalidate page on delete:', error)
      }
    }
  }

  return doc
}
