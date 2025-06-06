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
    stackOrder = 'normal',
    verticalAlignment = 'top',
    stackBreakpoint = 'md',
    showBorders = false,
    borderStyle = 'solid',
    borderColor = 'lightGray',
    borderPosition = 'vertical',
    headerContent,
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
    '1': 'grid-cols-1',
    '2':
      stackBreakpoint === 'sm'
        ? 'sm:grid-cols-2'
        : stackBreakpoint === 'lg'
          ? 'lg:grid-cols-2'
          : 'md:grid-cols-2',
    '3':
      stackBreakpoint === 'sm'
        ? 'sm:grid-cols-3'
        : stackBreakpoint === 'lg'
          ? 'lg:grid-cols-3'
          : 'md:grid-cols-3',
    '4':
      stackBreakpoint === 'sm'
        ? 'sm:grid-cols-4'
        : stackBreakpoint === 'lg'
          ? 'lg:grid-cols-4'
          : 'md:grid-cols-4',
  }[columnCount as '1' | '2' | '3' | '4']

  const alignmentClass = {
    top: 'items-start',
    center: 'items-center',
    bottom: 'items-end',
    stretch: 'items-stretch',
  }[verticalAlignment as 'top' | 'center' | 'bottom' | 'stretch']

  // Create custom converters for the column content
  const columnTextConverters: JSXConvertersFunction<DefaultNodeTypes> = useMemo(
    () =>
      ({ defaultConverters }) => ({
        ...defaultConverters,
        heading: ({ node, nodesToJSX, converters }) => {
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
        paragraph: ({ node, nodesToJSX, converters }) => (
          <p
            className={cn(
              `font-poppins text-base md:text-lg mb-4 md:mb-6 leading-relaxed font-light`,
              backgroundColor === 'charcoal' ? 'text-white/90' : 'text-charcoal/80',
            )}
          >
            {nodesToJSX({ nodes: node.children, parent: node, converters })}
          </p>
        ),
        list: ({ node, nodesToJSX, converters }) => {
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
        listitem: ({ node, nodesToJSX, converters }) => (
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
        quote: ({ node, nodesToJSX, converters }) => (
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

  // Create custom converters for the header content
  const headerTextConverters: JSXConvertersFunction<DefaultNodeTypes> = useMemo(
    () =>
      ({ defaultConverters }) => ({
        ...defaultConverters,
        heading: ({ node, nodesToJSX, parent, converters }) => {
          const tag = node.tag as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
          const classNames = {
            h1: `font-ogg ${headingColor} text-4xl md:text-5xl lg:text-6xl mb-8 md:mb-10 tracking-wide text-center`,
            h2: `font-poppins ${textColor} text-3xl md:text-4xl lg:text-5xl mb-6 md:mb-8 font-light tracking-wide text-center`,
            h3: `font-poppins ${textColor} text-2xl md:text-3xl lg:text-4xl mb-5 md:mb-6 font-medium tracking-wide text-center`,
            h4: `font-poppins ${textColor} text-xl md:text-2xl lg:text-3xl mb-4 md:mb-5 font-medium tracking-wide uppercase text-center`,
            h5: `font-poppins ${textColor} text-lg md:text-xl lg:text-2xl mb-3 font-medium tracking-wide text-center`,
            h6: `font-poppins ${textColor} text-base md:text-lg lg:text-xl mb-2 font-medium tracking-wide text-center`,
          }

          const HeadingTag = tag
          return (
            <HeadingTag className={classNames[tag]}>
              {nodesToJSX({ nodes: node.children, parent: node, converters })}
            </HeadingTag>
          )
        },
        paragraph: ({ node, nodesToJSX, converters }) => (
          <p
            className={cn(
              `font-poppins text-lg md:text-xl mb-6 md:mb-8 leading-relaxed font-light text-center max-w-4xl mx-auto`,
              backgroundColor === 'charcoal' ? 'text-white/90' : 'text-charcoal/80',
            )}
          >
            {nodesToJSX({ nodes: node.children, parent: node, converters })}
          </p>
        ),
        list: ({ node, nodesToJSX, converters }) => {
          const ListTag = node.listType === 'number' ? 'ol' : 'ul'
          return (
            <ListTag
              className={cn(
                'mb-6 space-y-3 max-w-2xl mx-auto',
                node.listType === 'number' ? 'list-decimal' : 'list-none',
                'pl-0',
              )}
            >
              {nodesToJSX({ nodes: node.children, parent: node, converters })}
            </ListTag>
          )
        },
        listitem: ({ node, nodesToJSX, converters }) => (
          <li
            className={cn(
              'font-poppins text-lg md:text-xl leading-relaxed font-light relative text-center',
              backgroundColor === 'charcoal' ? 'text-white/90' : 'text-charcoal/80',
              'before:content-["•"] before:text-gold before:font-bold before:absolute before:-left-4 before:top-0',
            )}
          >
            <span className="block">
              {nodesToJSX({ nodes: node.children, parent: node, converters })}
            </span>
          </li>
        ),
        quote: ({ node, nodesToJSX, converters }) => (
          <blockquote
            className={cn(
              'border-l-4 border-gold pl-6 italic font-light text-xl md:text-2xl mb-8 max-w-3xl mx-auto',
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

  // Function to get reordered columns based on stack order
  const getOrderedColumns = () => {
    if (!columns) return []

    const columnArray = [...columns]

    switch (stackOrder) {
      case 'reverse':
        return columnArray.reverse()
      case 'alternate':
        const reordered = []
        // First pass: odd indices (1st, 3rd, etc.)
        for (let i = 0; i < columnArray.length; i += 2) {
          reordered.push(columnArray[i])
        }
        // Second pass: even indices (2nd, 4th, etc.)
        for (let i = 1; i < columnArray.length; i += 2) {
          reordered.push(columnArray[i])
        }
        return reordered
      default:
        return columnArray
    }
  }

  const orderedColumns = getOrderedColumns()

  // Border styling functions
  const getBorderColorClass = () => {
    const colorMap = {
      gold: 'border-gold',
      lightGray: 'border-gray-300',
      darkGray: 'border-gray-600',
      charcoal: 'border-charcoal',
      white: 'border-white',
    }
    return colorMap[borderColor as keyof typeof colorMap] || 'border-gray-300'
  }

  const getBorderStyleClass = () => {
    const styleMap = {
      solid: 'border-solid',
      dashed: 'border-dashed',
      dotted: 'border-dotted',
    }
    return styleMap[borderStyle as keyof typeof styleMap] || 'border-solid'
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
        {/* Header Content - Only show for 2+ columns */}
        {headerContent && (columnCount === '2' || columnCount === '3' || columnCount === '4') && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12 md:mb-16 lg:mb-20"
          >
            <RichText data={headerContent} enableGutter={false} converters={headerTextConverters} />
          </motion.div>
        )}

        <motion.div
          className={cn(
            'grid grid-cols-1',
            gridCols,
            spacingClass,
            alignmentClass,
            // Center single column content
            columnCount === '1' && 'max-w-4xl mx-auto',
          )}
          variants={containerVariants}
        >
          {orderedColumns?.map((column: any, index: number) => {
            const isLastColumn = index === orderedColumns.length - 1
            const showVerticalBorder =
              showBorders &&
              (borderPosition === 'vertical' || borderPosition === 'both') &&
              !isLastColumn
            const showHorizontalBorder =
              showBorders && (borderPosition === 'horizontal' || borderPosition === 'both')

            return (
              <motion.div
                key={column.id || index}
                variants={columnVariants}
                className={cn(
                  'flex flex-col space-y-6 relative',
                  verticalAlignment === 'stretch' && 'h-full',
                )}
              >
                {/* Vertical Border - Right side of column */}
                {showVerticalBorder && (
                  <div
                    className={cn(
                      'absolute right-0 top-0 h-full w-0',
                      'border-r',
                      getBorderColorClass(),
                      getBorderStyleClass(),
                      // Hide on mobile when columns stack
                      stackBreakpoint === 'sm'
                        ? 'sm:block'
                        : stackBreakpoint === 'lg'
                          ? 'lg:block'
                          : 'md:block',
                      'hidden',
                    )}
                    style={{
                      right: `calc(-${spacing === 'small' ? '12px' : spacing === 'medium' ? '24px' : '32px'} / 2)`,
                    }}
                  />
                )}

                {column.content && (
                  <div
                    className={cn(
                      verticalAlignment === 'stretch' ? 'flex-1 flex flex-col' : 'h-full',
                      showHorizontalBorder && !isLastColumn && 'pb-6',
                    )}
                  >
                    <RichText
                      data={column.content}
                      enableGutter={false}
                      converters={columnTextConverters}
                    />
                  </div>
                )}

                {/* Horizontal Border - Bottom of column */}
                {showHorizontalBorder && !isLastColumn && (
                  <div
                    className={cn(
                      'w-full border-b mt-6',
                      getBorderColorClass(),
                      getBorderStyleClass(),
                      // Only show when columns are stacked
                      stackBreakpoint === 'sm'
                        ? 'block sm:hidden'
                        : stackBreakpoint === 'lg'
                          ? 'block lg:hidden'
                          : 'block md:hidden',
                    )}
                  />
                )}
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </motion.div>
  )
}
