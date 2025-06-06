import type { Story } from '@/payload-types'
import { Media } from '@/components/Media'
import Link from 'next/link'
import { format } from 'date-fns'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/ui'
import { useStoriesTextConverters } from '@/components/RichTextConverters/storiesTextConverters'

export const StoryComponent: React.FC<Story> = ({ ...props }) => {
  const { title, heroImage, slug, publishedAt, content, meta } = props
  const converters = useStoriesTextConverters()
  return (
    <div className={cn('relative w-full overflow-hidden my-8')} id={slug || undefined}>
      <div className="grid grid-cols-1 gap-8 lg:gap-16">
        {/* Image Section */}
        <div className="relative aspect-video">
          {heroImage && (
            <Link href={`/story/${slug}`} className="block w-full h-full">
              <Media
                imgClassName="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
                resource={heroImage}
                fill
                priority
              />
            </Link>
          )}
        </div>

        {/* Content Section */}
        <div className="relative flex flex-col justify-center">
          {publishedAt && (
            <p className="text-charcoal/70 mb-2 text-sm">
              {format(new Date(publishedAt), 'MMMM d, yyyy')}
            </p>
          )}
          <h3 className="text-3xl font-bold mb-4">
            <Link href={`/story/${slug}`} className="hover:underline">
              {title}
            </Link>
          </h3>

          {meta?.description && <p className="text-lg text-charcoal/80">{meta.description}</p>}

          <Link
            href={`/story/${slug}`}
            className="text-gold-darker font-bold mt-4 inline-block hover:underline"
          >
            Read The Full Story &rarr;
          </Link>

          <div className="flex flex-col gap-4 mt-4">
            {content && <RichText data={content} converters={converters} />}
          </div>
        </div>
      </div>
    </div>
  )
}
