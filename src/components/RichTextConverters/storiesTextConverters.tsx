import { useMemo } from 'react'
import { JSXConvertersFunction } from '@payloadcms/richtext-lexical/react'
import { DefaultNodeTypes } from '@payloadcms/richtext-lexical'

export const useStoriesTextConverters = (): JSXConvertersFunction<DefaultNodeTypes> => {
  return useMemo(
    () =>
      ({ defaultConverters }) => ({
        ...defaultConverters,
        heading: ({ node, nodesToJSX, converters }) => {
          const tag = node.tag as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
          const classNames = {
            h1: 'font-ogg text-gold text-4xl md:text-5xl lg:text-6xl mb-6 md:mb-8',
            h2: 'font-poppins text-charcoal text-3xl tracking-[0.8em] md:text-4xl lg:text-5xl mb-5 md:mb-6',
            h3: 'font-poppins text-charcoal text-2xl tracking-[0.8em] md:text-3xl lg:text-4xl mb-4 md:mb-5',
            h4: 'font-poppins text-charcoal text-sm md:text-base tracking-[0.4em] md:tracking-[0.8em] md:text-2xl lg:text-3xl mb-4 ',
            h5: 'font-poppins text-charcoal text-sm md:text-base tracking-[0.4em] md:tracking-[0.8em] md:text-xl lg:text-2xl mb-3',
            h6: 'font-poppins text-charcoal text-sm md:text-base tracking-[0.4em] md:tracking-[0.8em] md:text-lg lg:text-xl mb-3',
          }

          const HeadingTag = tag
          return (
            <HeadingTag className={classNames[tag]}>
              {nodesToJSX({ nodes: node.children, parent: node, converters })}
            </HeadingTag>
          )
        },
        paragraph: ({ node, nodesToJSX, converters }) => (
          <p className="font-poppins text-charcoal text-base md:text-lg mb-4 md:mb-6">
            {nodesToJSX({ nodes: node.children, parent: node, converters })}
          </p>
        ),
      }),
    [],
  )
}
