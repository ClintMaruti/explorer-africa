'use server'

import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import type { Story } from '@/payload-types'

export const getStories = async (
  page: number = 1,
  limit: number = 10,
): Promise<{ docs: Story[]; hasNextPage: boolean; totalPages: number }> => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'stories',
    depth: 2,
    page,
    limit,
    sort: '-publishedAt',
  })

  return {
    docs: result.docs,
    hasNextPage: result.hasNextPage,
    totalPages: result.totalPages,
  }
}
