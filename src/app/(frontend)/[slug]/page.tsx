import { getPayload, RequiredDataFromCollectionSlug } from 'payload'
import configPromise from '@/payload.config'
import PageClient from './page.client'
import React, { cache } from 'react'
import { draftMode } from 'next/headers'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import { LivePreviewListener } from '@/components/LivePreviewListener'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const pages = await payload.find({ collection: 'pages', limit: 100 })
  const params = pages.docs?.filter((doc) => {
    return doc.slug !== 'home'
  })
  return params?.map((doc) => ({
    slug: doc.slug,
  }))
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = 'home' } = await paramsPromise
  const url = '/' + slug

  const page: RequiredDataFromCollectionSlug<'pages'> | null = await queryPageBySlug({
    slug,
  })

  if (!page) {
    return <PayloadRedirects url={url} />
  }

  return (
    <>
      <PayloadRedirects disableNotFound url={url} />
      {draft && <LivePreviewListener />}
      <PageClient page={page} />
    </>
  )
}

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    depth: 2,
    pagination: false,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  const page = result.docs?.[0] || null

  if (page && page.layout) {
    for (const block of page.layout) {
      if (block.blockType === 'room-rates-block' && block.roomRates) {
        if (typeof block.roomRates === 'number' || typeof block.roomRates === 'string') {
          const roomRatesData = await payload.findByID({
            collection: 'room-rates',
            id: block.roomRates,
            depth: 2,
          })
          block.roomRates = roomRatesData
        }
      }
    }
  }

  return page
})
