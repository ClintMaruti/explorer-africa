import React, { useRef } from 'react'
import { ImageContentBlock as ImageContentBlockProps } from '@/payload-types'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'
import { useMemo } from 'react'
import type { DefaultNodeTypes } from '@payloadcms/richtext-lexical'
import type { JSXConvertersFunction } from '@payloadcms/richtext-lexical/react'
import Image from 'next/image'
import { CMSLink } from '@/components/Link'
import gsap from 'gsap'
import { motion } from 'framer-motion'
import { useGSAP } from '@gsap/react'

// Register plugins
// gsap.registerPlugin(ScrollTrigger) - Removed to prevent conflicts

export const ImageContentBlock: React.FC<ImageContentBlockProps> = (props) => {
  const {
    anchorId,
    media,
    imagePosition = 'left',
    links,
    backgroundColor = 'auto',
    contentSections = [],
    showSeparatorLines = false,
    separatorStyle = 'solid',
    separatorColor = 'auto',
    separatorWidth = 'medium',
  } = props

  // Background color logic
  const getBackgroundColorClass = () => {
    if (backgroundColor === 'auto') {
      return imagePosition === 'left' ? 'bg-pale-mint-white' : 'bg-charcoal'
    }

    const colorMap = {
      lightGold: 'bg-pale-mint-white',
      charcoal: 'bg-charcoal',
      white: 'bg-white',
      'gold-dark': 'bg-gold-dark',
      'gold-darker': 'bg-gold-darker',
      'gold-darkest': 'bg-gold-darkest',
    }
    return colorMap[backgroundColor as keyof typeof colorMap] || 'bg-pale-mint-white'
  }

  // Get text color class for a section
  const getTextColorClass = (textColor: string) => {
    if (textColor === 'auto') {
      return imagePosition === 'left' ? 'text-charcoal' : 'text-white/90'
    }

    const colorMap = {
      dark: 'text-charcoal',
      light: 'text-white/90',
      gold: 'text-gold-dark',
      'gold-dark': 'text-gold-dark',
      'gold-darker': 'text-gold-darker',
      'gold-darkest': 'text-gold-darkest',
    }
    return colorMap[textColor as keyof typeof colorMap] || 'text-charcoal'
  }

  // Get line color class
  const getLineColorClass = (lineColor: string) => {
    const colorMap = {
      gold: 'bg-gold',
      'gold-dark': 'bg-gold-dark',
      'gold-darker': 'bg-gold-darker',
      'gold-darkest': 'bg-gold-darkest',
      charcoal: 'bg-charcoal',
      white: 'bg-white',
      lightGold: 'bg-gold/70',
    }
    return colorMap[lineColor as keyof typeof colorMap] || 'bg-gold'
  }

  // Get line width class
  const getLineWidthClass = (lineWidth: string) => {
    const widthMap = {
      short: 'w-20',
      medium: 'w-30',
      long: 'w-40',
      full: 'w-full',
    }
    return widthMap[lineWidth as 'short' | 'medium' | 'long' | 'full'] || 'w-20'
  }

  // Get spacing class
  const getSpacingClass = (spacing: string) => {
    const spacingMap = {
      small: 'my-2',
      medium: 'my-4',
      large: 'my-6',
    }
    return spacingMap[spacing as 'small' | 'medium' | 'large'] || 'my-4'
  }

  // Get separator line styles
  const getSeparatorLineStyles = () => {
    const colorClass = (() => {
      if (separatorColor === 'auto') {
        return imagePosition === 'left' ? 'border-charcoal/20' : 'border-white/30'
      }
      const colorMap = {
        gold: 'border-gold',
        'gold-dark': 'border-gold-dark',
        'gold-darker': 'border-gold-darker',
        'gold-darkest': 'border-gold-darkest',
        lightGray: 'border-gray-300',
        darkGray: 'border-gray-600',
        charcoal: 'border-charcoal',
        white: 'border-white',
      }
      return colorMap[separatorColor as keyof typeof colorMap] || 'border-gray-300'
    })()

    const styleClass = (() => {
      const styleMap = {
        solid: 'border-solid',
        dashed: 'border-dashed',
        dotted: 'border-dotted',
      }
      return styleMap[separatorStyle as keyof typeof styleMap] || 'border-solid'
    })()

    const widthClass = (() => {
      const widthMap = {
        short: 'w-20',
        medium: 'w-30',
        long: 'w-40',
        full: 'w-full',
      }
      return widthMap[separatorWidth as keyof typeof widthMap] || 'w-30'
    })()

    return { colorClass, styleClass, widthClass }
  }

  const {
    colorClass: separatorColorClass,
    styleClass: separatorStyleClass,
    widthClass: separatorWidthClass,
  } = getSeparatorLineStyles()

  const backgroundColorClass = getBackgroundColorClass()

  // Refs for hover animation only
  const containerRef = useRef<HTMLDivElement>(null)
  const imageWrapperRef = useRef<HTMLDivElement>(null)
  const contentWrapperRef = useRef<HTMLDivElement>(null)

  // Simple hover effects with GSAP (no ScrollTrigger)
  useGSAP(() => {
    if (!containerRef.current) return

    const handleMouseEnter = () => {
      if (imageWrapperRef.current) {
        gsap.to(imageWrapperRef.current, {
          scale: 1.05,
          duration: 0.6,
          ease: 'power2.out',
        })
      }
    }

    const handleMouseLeave = () => {
      if (imageWrapperRef.current) {
        gsap.to(imageWrapperRef.current, {
          scale: 1,
          duration: 0.6,
          ease: 'power2.out',
        })
      }
    }

    const container = containerRef.current
    container.addEventListener('mouseenter', handleMouseEnter)
    container.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      container.removeEventListener('mouseenter', handleMouseEnter)
      container.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  // Create custom converters for the content text
  const createContentTextConverters =
    (textColor: string = 'auto'): JSXConvertersFunction<DefaultNodeTypes> =>
    ({ defaultConverters }) => ({
      ...defaultConverters,
      heading: (props) => {
        const { node, nodesToJSX, converters } = props
        const textColorClass = getTextColorClass(textColor)

        // Only apply custom styling to h4
        if (node.tag === 'h4') {
          return (
            <h4
              className={cn(
                'font-light text-lg leading-relaxed mb-4',
                {
                  'text-center': node.format === 'center',
                  'text-right': node.format === 'right',
                  'text-justify': node.format === 'justify',
                  'ml-4': node.indent === 1,
                  'ml-8': node.indent === 2,
                  'ml-12': node.indent === 3,
                  'ml-16': node.indent === 4,
                },
                textColorClass,
              )}
            >
              {nodesToJSX({ nodes: node.children, parent: node, converters })}
            </h4>
          )
        }
        // For all other heading tags, create the element directly
        const tag = node.tag
        return React.createElement(
          tag,
          {
            className: cn(
              {
                'text-center': node.format === 'center',
                'text-right': node.format === 'right',
                'text-justify': node.format === 'justify',
                'ml-4': node.indent === 1,
                'ml-8': node.indent === 2,
                'ml-12': node.indent === 3,
                'ml-16': node.indent === 4,
              },
              textColorClass,
            ),
          },
          nodesToJSX({ nodes: node.children, parent: node, converters }),
        )
      },
      paragraph: ({ node, nodesToJSX, converters }) => (
        <p
          className={cn(
            'font-light text-lg leading-relaxed mb-4',
            {
              'text-center': node.format === 'center',
              'text-right': node.format === 'right',
              'text-justify': node.format === 'justify',
              'ml-4': node.indent === 1,
              'ml-8': node.indent === 2,
              'ml-12': node.indent === 3,
              'ml-16': node.indent === 4,
            },
            getTextColorClass(textColor),
          )}
        >
          {nodesToJSX({ nodes: node.children, parent: node, converters })}
        </p>
      ),
    })

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      ref={containerRef}
      className={cn('relative w-full overflow-hidden', backgroundColorClass)}
      style={{ perspective: '1000px' }}
      id={anchorId || undefined}
    >
      <div className="grid md:grid-cols-2">
        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, x: imagePosition === 'left' ? -50 : 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={cn(
            'relative aspect-[4/3] md:aspect-auto md:h-full',
            imagePosition === 'right' && 'md:order-last',
          )}
        >
          <div ref={imageWrapperRef} className="w-full h-full transform-gpu overflow-hidden">
            {media && (
              <Media
                imgClassName="w-full h-full object-cover transition-transform"
                resource={media}
                fill
                priority
              />
            )}
          </div>
        </motion.div>

        {/* Content Section */}
        <motion.div
          initial={{ opacity: 0, x: imagePosition === 'left' ? 50 : -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative"
        >
          {/* Background Pattern */}
          <div className={cn('absolute inset-0 overflow-hidden')}>
            <Image
              src="/media/contours.png"
              alt="Background pattern"
              fill
              className="object-cover transform-gpu"
              priority
            />
          </div>

          <div
            ref={contentWrapperRef}
            className="relative flex flex-col py-12 md:py-24 px-4 md:px-16"
          >
            {/* Render Content Sections */}
            {contentSections && contentSections.length > 0 ? (
              contentSections.map((section: any, index: number) => {
                const spacingClass = getSpacingClass(section.spacing || 'medium')
                const isLastSection = index === contentSections.length - 1

                return (
                  <React.Fragment key={index}>
                    {section.sectionType === 'horizontalLine' ? (
                      <div className={cn('flex', spacingClass)}>
                        <div
                          className={cn(
                            'h-px',
                            getLineColorClass(section.lineColor || 'gold'),
                            getLineWidthClass(section.lineWidth || 'short'),
                          )}
                        />
                      </div>
                    ) : section.sectionType === 'richText' && section.richText ? (
                      <div className={spacingClass}>
                        <RichText
                          data={section.richText}
                          enableGutter={false}
                          converters={createContentTextConverters(section.textColor || 'auto')}
                        />
                      </div>
                    ) : null}

                    {/* Automatic Separator Line Between Sections */}
                    {showSeparatorLines && !isLastSection && (
                      <div className="flex justify-start my-6">
                        <div
                          className={cn(
                            'border-t',
                            separatorColorClass,
                            separatorStyleClass,
                            separatorWidthClass,
                          )}
                        />
                      </div>
                    )}
                  </React.Fragment>
                )
              })
            ) : (
              <div className="text-center text-gray-500">
                <p>No content sections configured</p>
              </div>
            )}

            {/* Links Section */}
            {links && links.length > 0 && (
              <div
                className={cn('flex flex-wrap gap-4 mt-8', {
                  'justify-start': links.length === 1,
                  'justify-between': links.length > 1,
                })}
              >
                {links.map((linkItem: any) => (
                  <CMSLink
                    key={linkItem.id}
                    {...linkItem.link}
                    className={cn(
                      'inline-flex text-xs px-8 py-4 transition-all duration-300 hover:scale-105  outline-1 outline-gold-darker',
                      getTextColorClass('auto'),
                    )}
                  />
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
