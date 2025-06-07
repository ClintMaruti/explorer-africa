'use client'
import React, { useState, useEffect } from 'react'
import type { StoriesBlock as StoriesBlockProps, Story } from '@/payload-types'
import { StoryComponent } from './StoryComponent'
import { getStories } from '@/app/actions/get-stories'

const INITIAL_LIMIT = 5

export const StoriesBlock: React.FC<StoriesBlockProps> = (props) => {
  const [stories, setStories] = useState<Story[]>([])
  const [page, setPage] = useState(1)
  const [hasNextPage, setHasNextPage] = useState(true)

  useEffect(() => {
    const fetchInitialStories = async () => {
      const initialStories =
        props.stories && Array.isArray(props.stories)
          ? props.stories.map((story) => (typeof story === 'number' ? null : story)).filter(Boolean)
          : []

      if (initialStories.length < INITIAL_LIMIT) {
        const result = await getStories(1, INITIAL_LIMIT)
        setStories(result.docs)
        setHasNextPage(result.hasNextPage)
        setPage(2)
      } else {
        // @ts-ignore
        setStories(initialStories)
        setPage(2)
        // We assume there is a next page if the initial stories match the limit
        setHasNextPage(true)
      }
    }
    fetchInitialStories()
  }, [props.stories])

  const loadMore = async () => {
    const result = await getStories(page, INITIAL_LIMIT)
    // @ts-ignore
    setStories((prev) => [...prev, ...result.docs])
    setHasNextPage(result.hasNextPage)
    setPage((prev) => prev + 1)
  }

  return (
    <div className="w-full bg-white py-12">
      <div className="container mx-auto p-6">
        {stories && stories.map((story) => story && <StoryComponent key={story.id} {...story} />)}
        {hasNextPage && (
          <div className="text-center mt-8">
            <button
              onClick={loadMore}
              className="bg-gold hover:bg-gold-dark text-white font-bold py-2 px-4 rounded"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
