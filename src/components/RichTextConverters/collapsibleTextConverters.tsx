'use client'
import { useMemo } from 'react'
import { JSXConvertersFunction } from '@payloadcms/richtext-lexical/react'
import { DefaultNodeTypes } from '@payloadcms/richtext-lexical'

export const useCollapsibleTextConverters = (): JSXConvertersFunction<DefaultNodeTypes> => {
  return useMemo(
    () =>
      ({ defaultConverters }) => ({
        ...defaultConverters,
        heading: ({ node, nodesToJSX, converters }) => {
          const tag = node.tag as 'h1' | 'h2' | 'h3' | 'h4'
          const classNames = {
            h1: 'font-ogg text-gold text-4xl md:text-5xl lg:text-6xl mb-6 md:mb-8',
            h2: 'font-poppins text-gold text-3xl md:text-4xl lg:text-5xl mb-5 md:mb-6',
            h3: 'font-poppins text-gold text-2xl md:text-3xl lg:text-4xl mb-4 md:mb-5',
            h4: 'uppercase text-gold-darker text-xs md:text-sm lg:text-base font-normal font-poppins tracking-[0.1em]',
          }

          const HeadingTag = tag
          return (
            <HeadingTag className={classNames[tag]}>
              {nodesToJSX({ nodes: node.children, parent: node, converters })}
            </HeadingTag>
          )
        },
        paragraph: ({ node, nodesToJSX, converters }) => (
          <p className="font-poppins text-gray-700 text-xs md:text-sm lg:text-base mb-4 md:mb-6">
            {nodesToJSX({ nodes: node.children, parent: node, converters })}
          </p>
        ),
      }),
    [],
  )
}
