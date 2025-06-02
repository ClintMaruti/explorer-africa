import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'
import type { MediaBlock as MediaBlockProps } from '@/payload-types'
import { Media } from '../../components/Media'
import { motion } from 'framer-motion'
import { CMSLink } from '@/components/Link'
import { useMemo } from 'react'
import type { DefaultNodeTypes } from '@payloadcms/richtext-lexical'
import type { JSXConvertersFunction } from '@payloadcms/richtext-lexical/react'

export const MediaBlock: React.FC<MediaBlockProps> = (props) => {
  const { media, richText, links } = props

  // Create custom converters for the content text
  const contentTextConverters: JSXConvertersFunction<DefaultNodeTypes> = useMemo(
    () =>
      ({ defaultConverters }) => ({
        ...defaultConverters,
        heading: ({ node, nodesToJSX, parent, converters }) => {
          const tag = node.tag as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
          const classNames = {
            h1: 'font-ogg text-gold text-4xl md:text-5xl lg:text-6xl mb-6 md:mb-8',
            h2: 'font-poppins text-white text-3xl md:text-4xl lg:text-5xl mb-5 md:mb-6',
            h3: 'font-poppins text-white text-2xl md:text-3xl lg:text-4xl mb-4 md:mb-5',
            h4: 'font-poppins text-white text-xl md:text-2xl lg:text-3xl mb-4',
            h5: 'font-poppins text-white text-lg md:text-xl lg:text-2xl mb-3',
            h6: 'font-poppins text-white text-base md:text-lg lg:text-xl mb-3',
          }

          const HeadingTag = tag
          return (
            <HeadingTag className={classNames[tag]}>
              {nodesToJSX({ nodes: node.children, parent: node, converters })}
            </HeadingTag>
          )
        },
        paragraph: ({ node, nodesToJSX, parent, converters }) => (
          <p className="font-poppins text-white/90 text-base md:text-lg mb-4 md:mb-6">
            {nodesToJSX({ nodes: node.children, parent: node, converters })}
          </p>
        ),
      }),
    [],
  )

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
      className={'relative w-full overflow-hidden'}
    >
      {/* Background Media */}
      {media && (
        <motion.div
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="absolute inset-0"
        >
          <Media imgClassName={cn('w-full h-full object-cover')} resource={media} fill priority />
        </motion.div>
      )}
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40 z-[1]" />
      {/* Content Overlay */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="container relative z-[2] px-4 max-w-6xl mx-auto py-16"
      >
        {richText && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <RichText data={richText} enableGutter={false} converters={contentTextConverters} />
          </motion.div>
        )}
        {links && links.length > 0 && (
          <div className="flex flex-wrap gap-4 justify-center mt-4">
            {links.map((link) => (
              <CMSLink key={link.id} {...link.link} className="text-xs px-8 py-4 text-white" />
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}
