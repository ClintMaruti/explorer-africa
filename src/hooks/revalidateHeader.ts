import type { GlobalAfterChangeHook } from 'payload'

export const revalidateHeader: GlobalAfterChangeHook = async ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating header`)

    // Only import and use revalidateTag in server environment
    if (typeof window === 'undefined') {
      try {
        const { revalidateTag } = await import('next/cache')
        revalidateTag('global_header')
      } catch (error) {
        payload.logger.error('Failed to revalidate header tag:', error)
      }
    }
  }

  return doc
}
