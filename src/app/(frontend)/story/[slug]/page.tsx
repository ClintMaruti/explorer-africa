import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import React, { cache } from 'react'
import { draftMode } from 'next/headers'
import type { Story } from '@/payload-types'
import { Media } from '@/components/Media'
import { format } from 'date-fns'
import RichText from '@/components/RichText'
import { storiesTextServerConverters } from '@/components/RichTextConverters/storiesTextServerConverters'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const stories = await payload.find({ collection: 'stories', limit: 100 })
  return stories.docs?.map((doc) => ({
    slug: doc.slug,
  }))
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function StoryPage({ params: paramsPromise }: Args) {
  const { slug } = await paramsPromise
  if (!slug) {
    return notFound()
  }

  const story: Story | null = await queryStoryBySlug({ slug })

  if (!story) {
    return notFound()
  }

  const { title, heroImage, publishedAt, content, meta } = story

  return (
    <div className="w-full bg-white py-12 mt-20">
      <div className="container mx-auto">
        <div className="relative aspect-video">
          {heroImage && (
            <Media imgClassName="w-full h-full object-cover" resource={heroImage} fill priority />
          )}
        </div>
        <div className="flex flex-col justify-center mt-8 px-4 md:px-0">
          {publishedAt && (
            <p className="text-charcoal/70 mb-2 text-sm">
              {format(new Date(publishedAt), 'MMMM d, yyyy')}
            </p>
          )}
          <h1 className="text-5xl font-bold mb-4">{title}</h1>
          {meta?.description && <p className="text-lg text-charcoal/80 mb-8">{meta.description}</p>}

          <div className="flex flex-col gap-4 mt-4">
            {content && <RichText data={content} converters={storiesTextServerConverters} />}
          </div>
        </div>
      </div>
    </div>
  )
}

const queryStoryBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'stories',
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

  return result.docs?.[0] || null
})
