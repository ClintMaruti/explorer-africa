import type { QuoteBlock as QuoteBlockProps } from '@/payload-types'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'
import { useMemo } from 'react'
import type { DefaultNodeTypes } from '@payloadcms/richtext-lexical'
import type { JSXConvertersFunction } from '@payloadcms/richtext-lexical/react'

export const QuoteBlock: React.FC<QuoteBlockProps> = (props) => {
  const { media, richText } = props

  // Create custom converters for the quote text
  const quoteTextConverters: JSXConvertersFunction<DefaultNodeTypes> = useMemo(
    () =>
      ({ defaultConverters }) => ({
        ...defaultConverters,
        paragraph: ({ node, nodesToJSX, converters }) => (
          <p className="font-light text-2xl leading-[1.6em] tracking-wide font-playfair">
            {nodesToJSX({ nodes: node.children, parent: node, converters })}
          </p>
        ),
      }),
    [],
  )

  return (
    <div className="min-h-[50vh] relative w-full overflow-hidden">
      {/* Background Media */}
      {media && (
        <div className="absolute inset-0">
          <Media imgClassName={cn('w-full h-full object-cover')} resource={media} fill priority />
        </div>
      )}
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40 z-[5]" />
      {/* Content Overlay */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div className="container px-4 max-w-3xl mx-auto">
          {richText && (
            <div className="text-center">
              <RichText data={richText} enableGutter={false} converters={quoteTextConverters} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
