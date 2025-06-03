import React, { useLayoutEffect, useRef, useState } from 'react'
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
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

export const ImageContentBlock: React.FC<ImageContentBlockProps> = (props) => {
  const {
    anchorId,
    media,
    imagePosition = 'left',
    links,
    backgroundColor = 'auto',
    contentSections = [],
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
    }
    return colorMap[backgroundColor as 'lightGold' | 'charcoal' | 'white'] || 'bg-pale-mint-white'
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
    }
    return colorMap[textColor as 'dark' | 'light' | 'gold'] || 'text-charcoal'
  }

  // Get line color class
  const getLineColorClass = (lineColor: string) => {
    const colorMap = {
      gold: 'bg-gold',
      charcoal: 'bg-charcoal',
      white: 'bg-white',
      lightGold: 'bg-gold/70',
    }
    return colorMap[lineColor as 'gold' | 'charcoal' | 'white' | 'lightGold'] || 'bg-gold'
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

  const backgroundColorClass = getBackgroundColorClass()

  // Refs for animation
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const imageWrapperRef = useRef<HTMLDivElement>(null)
  const contentWrapperRef = useRef<HTMLDivElement>(null)
  const [isInitialized, setIsInitialized] = useState(false)

  // GSAP animation setup
  useGSAP(() => {
    if (!containerRef.current) return

    // Set initial states only after component is mounted
    setIsInitialized(true)

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 85%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
      },
    })

    // Initial states - only apply after component is mounted
    if (isInitialized) {
      gsap.set([imageRef.current, contentRef.current], {
        opacity: 1,
        x: 0,
      })
    }

    // Smoother, more subtle entrance animation
    tl.fromTo(
      [imageRef.current, contentRef.current],
      {
        opacity: 0,
        x: (index) =>
          index === 0
            ? imagePosition === 'left'
              ? '-50%'
              : '50%'
            : imagePosition === 'left'
              ? '50%'
              : '-50%',
      },
      {
        opacity: 1,
        x: 0,
        duration: 1.2,
        ease: 'power2.out',
        stagger: 0.2,
      },
    )

    // Mouse move handler for hover effects
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height

      // Reduced parallax effect for image
      if (imageWrapperRef.current) {
        gsap.to(imageWrapperRef.current, {
          rotateY: (x - 0.5) * 2,
          rotateX: (y - 0.5) * -2,
          scale: 1.02,
          duration: 0.7,
          ease: 'power1.out',
        })
      }

      // Subtler content hover effect
      if (contentWrapperRef.current) {
        const intensity = 5
        gsap.to(contentWrapperRef.current.querySelectorAll('p, h1, h2, h3, h4, h5, h6'), {
          y: (y - 0.5) * intensity,
          x: (x - 0.5) * intensity,
          stagger: {
            amount: 0.1,
            from: 'start',
          },
          duration: 0.7,
          ease: 'power1.out',
        })
      }

      // Subtler background pattern movement
      const bgPattern = contentRef.current?.querySelector('.absolute.inset-0 img')
      if (bgPattern) {
        gsap.to(bgPattern, {
          scale: 1.05,
          x: (x - 0.5) * 10,
          y: (y - 0.5) * 10,
          rotation: (x - 0.5) * 2,
          duration: 1.2,
          ease: 'power1.out',
        })
      }
    }

    // Mouse enter/leave handlers
    const handleMouseEnter = () => {
      if (imageWrapperRef.current) {
        gsap.to(imageWrapperRef.current, {
          scale: 1.01,
          duration: 0.4,
          ease: 'power1.out',
        })
      }
    }

    const handleMouseLeave = () => {
      // Reset all animations with gentler transition
      if (imageWrapperRef.current) {
        gsap.to(imageWrapperRef.current, {
          rotateY: 0,
          rotateX: 0,
          scale: 1,
          duration: 0.7,
          ease: 'power1.inOut',
        })
      }

      if (contentWrapperRef.current) {
        gsap.to(contentWrapperRef.current.querySelectorAll('p, h1, h2, h3, h4, h5, h6'), {
          y: 0,
          x: 0,
          duration: 0.7,
          ease: 'power1.inOut',
        })
      }

      const bgPattern = contentRef.current?.querySelector('.absolute.inset-0 img')
      if (bgPattern) {
        gsap.to(bgPattern, {
          scale: 1,
          x: 0,
          y: 0,
          rotation: 0,
          duration: 1,
          ease: 'power1.inOut',
        })
      }
    }

    // Add event listeners
    const container = containerRef.current
    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('mouseenter', handleMouseEnter)
    container.addEventListener('mouseleave', handleMouseLeave)

    // Cleanup
    return () => {
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mouseenter', handleMouseEnter)
      container.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [imagePosition, isInitialized])

  // Create custom converters for the content text
  const createContentTextConverters = (
    textColor: string = 'auto',
  ): JSXConvertersFunction<DefaultNodeTypes> =>
    useMemo(
      () =>
        ({ defaultConverters }) => ({
          ...defaultConverters,
          heading: (props) => {
            const { node, nodesToJSX, parent, converters } = props
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
          paragraph: ({ node, nodesToJSX, parent, converters }) => (
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
        }),
      [textColor],
    )

  return (
    <div
      ref={containerRef}
      className={cn('relative w-full overflow-hidden opacity-100', backgroundColorClass)}
      style={{ perspective: '1000px' }}
      id={anchorId || undefined}
    >
      <div className="grid md:grid-cols-2">
        {/* Image Section */}
        <div
          ref={imageRef}
          className={cn(
            'relative aspect-[4/3] md:aspect-auto md:h-full opacity-100',
            imagePosition === 'right' && 'md:order-last',
          )}
        >
          <div ref={imageWrapperRef} className="w-full h-full transform-gpu">
            {media && (
              <Media
                imgClassName="w-full h-full object-cover transition-transform"
                resource={media}
                fill
                priority
              />
            )}
          </div>
        </div>

        {/* Content Section */}
        <div ref={contentRef} className="relative opacity-100">
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

                if (section.sectionType === 'horizontalLine') {
                  const lineColorClass = getLineColorClass(section.lineColor || 'gold')
                  const lineWidthClass = getLineWidthClass(section.lineWidth || 'short')

                  return (
                    <div key={index} className={cn('flex', spacingClass)}>
                      <div className={cn('h-px', lineColorClass, lineWidthClass)} />
                    </div>
                  )
                }

                if (section.sectionType === 'richText' && section.richText) {
                  const textColor = section.textColor || 'auto'

                  return (
                    <div key={index} className={spacingClass}>
                      <RichText
                        data={section.richText}
                        enableGutter={false}
                        converters={createContentTextConverters(textColor)}
                      />
                    </div>
                  )
                }

                return null
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
                      'inline-flex text-xs px-8 py-4 transition-all duration-300 hover:scale-105',
                      getTextColorClass('auto'),
                    )}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
