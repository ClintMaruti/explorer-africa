import React, { useMemo } from 'react'
import { cn } from '@/utilities/ui'
import RichText from '@/components/RichText'
import type { ColumnsBlock as ColumnsBlockProps } from '@/payload-types'
import { motion } from 'framer-motion'
import type { DefaultNodeTypes } from '@payloadcms/richtext-lexical'
import type { JSXConvertersFunction } from '@payloadcms/richtext-lexical/react'
import { Media } from '@/components/Media'

export const ColumnsBlock: React.FC<ColumnsBlockProps> = (props) => {
  const {
    anchorId,
    columns,
    columnCount = '2',
    backgroundColor = 'white',
    backgroundImage,
    spacing = 'medium',
  } = props

  const backgroundColorClass = {
    charcoal: 'bg-charcoal',
    lightGold: 'bg-pale-mint-white',
    white: 'bg-white',
  }[backgroundColor as 'charcoal' | 'lightGold' | 'white']

  const textColor = backgroundColor === 'charcoal' ? 'text-white' : 'text-charcoal'
  const headingColor = backgroundColor === 'charcoal' ? 'text-gold' : 'text-gold-dark'

  const spacingClass = {
    small: 'gap-4 md:gap-6',
    medium: 'gap-6 md:gap-8 lg:gap-12',
    large: 'gap-8 md:gap-12 lg:gap-16',
  }[spacing as 'small' | 'medium' | 'large']

  const gridCols = {
    '2': 'md:grid-cols-2',
    '3': 'md:grid-cols-3',
    '4': 'md:grid-cols-4',
  }[columnCount as '2' | '3' | '4']

  // Create custom converters for the column content
  const columnTextConverters: JSXConvertersFunction<DefaultNodeTypes> = useMemo(
    () =>
      ({ defaultConverters }) => ({
        ...defaultConverters,
        heading: ({ node, nodesToJSX, parent, converters }) => {
          const tag = node.tag as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
          const classNames = {
            h1: `font-ogg ${headingColor} text-3xl md:text-4xl lg:text-5xl mb-6 md:mb-8 tracking-wide`,
            h2: `font-poppins ${textColor} text-2xl md:text-3xl lg:text-4xl mb-5 md:mb-6 font-light tracking-wide`,
            h3: `font-poppins ${textColor} text-xl md:text-2xl lg:text-3xl mb-4 md:mb-5 font-medium tracking-wide`,
            h4: `font-poppins ${textColor} text-lg md:text-xl lg:text-2xl mb-3 md:mb-4 font-medium tracking-wide uppercase`,
            h5: `font-poppins ${textColor} text-base md:text-lg lg:text-xl mb-3 font-medium tracking-wide`,
            h6: `font-poppins ${textColor} text-sm md:text-base lg:text-lg mb-2 font-medium tracking-wide`,
          }

          const HeadingTag = tag
          return (
            <HeadingTag className={classNames[tag]}>
              {nodesToJSX({ nodes: node.children, parent: node, converters })}
            </HeadingTag>
          )
        },
        paragraph: ({ node, nodesToJSX, parent, converters }) => (
          <p
            className={cn(
              `font-poppins text-base md:text-lg mb-4 md:mb-6 leading-relaxed font-light`,
              backgroundColor === 'charcoal' ? 'text-white/90' : 'text-charcoal/80',
            )}
          >
            {nodesToJSX({ nodes: node.children, parent: node, converters })}
          </p>
        ),
        list: ({ node, nodesToJSX, parent, converters }) => {
          const ListTag = node.listType === 'number' ? 'ol' : 'ul'
          return (
            <ListTag
              className={cn(
                'mb-6 space-y-3',
                node.listType === 'number' ? 'list-decimal' : 'list-none',
                'pl-0',
              )}
            >
              {nodesToJSX({ nodes: node.children, parent: node, converters })}
            </ListTag>
          )
        },
        listitem: ({ node, nodesToJSX, parent, converters }) => (
          <li
            className={cn(
              'font-poppins text-base md:text-lg leading-relaxed font-light relative',
              backgroundColor === 'charcoal' ? 'text-white/90' : 'text-charcoal/80',
              'before:content-["•"] before:text-gold before:font-bold before:absolute before:-left-4 before:top-0',
            )}
          >
            <span className="block">
              {nodesToJSX({ nodes: node.children, parent: node, converters })}
            </span>
          </li>
        ),
        quote: ({ node, nodesToJSX, parent, converters }) => (
          <blockquote
            className={cn(
              'border-l-4 border-gold pl-6 italic font-light text-lg md:text-xl mb-6',
              textColor,
            )}
          >
            {nodesToJSX({ nodes: node.children, parent: node, converters })}
          </blockquote>
        ),
      }),
    [backgroundColor, textColor, headingColor],
  )

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.3,
      },
    },
  }

  const columnVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={cn('w-full py-16 md:py-20 lg:py-24 relative overflow-hidden')}
      id={anchorId || undefined}
    >
      {/* Background Image */}
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <Media
            imgClassName="w-full h-full object-cover"
            resource={backgroundImage}
            fill
            priority
          />
        </div>
      )}

      {/* Background Color Overlay */}
      <div
        className={cn(
          'absolute inset-0 z-10',
          backgroundImage ? 'bg-pale-mint-white/90' : backgroundColorClass,
        )}
      />

      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl relative z-20">
        <motion.div
          className={cn('grid grid-cols-1', gridCols, spacingClass, 'items-start')}
          variants={containerVariants}
        >
          {columns?.map((column: any, index: number) => (
            <motion.div
              key={column.id || index}
              variants={columnVariants}
              className="flex flex-col space-y-6"
            >
              {column.content && (
                <div className="h-full">
                  <RichText
                    data={column.content}
                    enableGutter={false}
                    converters={columnTextConverters}
                  />
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}
