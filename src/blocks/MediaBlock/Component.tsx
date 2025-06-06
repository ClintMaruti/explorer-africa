import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'
import type { MediaBlock as MediaBlockProps } from '@/payload-types'
import { Media } from '../../components/Media'
import { motion } from 'framer-motion'
import { CMSLink } from '@/components/Link'
import { useMemo, useCallback } from 'react'
import type { DefaultNodeTypes } from '@payloadcms/richtext-lexical'
import type { JSXConvertersFunction } from '@payloadcms/richtext-lexical/react'

export const MediaBlock: React.FC<MediaBlockProps> = (props) => {
  const { media, richText, links, backgroundColor = 'charcoal', menuItems } = props
  const backgroundColorClass =
    backgroundColor === 'charcoal' ? 'bg-charcoal/40' : 'bg-pale-mint-white/80'

  // Get text color class for a section
  const getTextColorClass = (backgroundColor: string) => {
    if (backgroundColor === 'charcoal') {
      return 'text-white/90'
    }
    return 'text-charcoal/90'
  }

  // Smooth scroll handler for menu items
  const handleMenuItemClick = useCallback((anchorId: string) => {
    // Small delay to ensure any animations have completed
    setTimeout(() => {
      const element = document.getElementById(anchorId)
      if (element) {
        // Get the current MediaBlock position
        const currentScrollY = window.pageYOffset
        const viewportHeight = window.innerHeight
        const elementRect = element.getBoundingClientRect()
        const elementTop = elementRect.top + currentScrollY

        // Try to find the MediaBlock container to preserve its visibility
        const mediaBlock =
          document.querySelector('[data-block-type="mediaBlock"]') ||
          document.querySelector('.media-block') ||
          element.closest('.media-block')

        let offset = Math.min(viewportHeight * 0.3, 200) // Default offset

        // If we can find the MediaBlock, calculate a smarter offset
        if (mediaBlock) {
          const mediaBlockRect = mediaBlock.getBoundingClientRect()
          const mediaBlockTop = mediaBlockRect.top + currentScrollY
          const mediaBlockHeight = mediaBlockRect.height

          // If scrolling would hide the entire MediaBlock, adjust the offset
          if (elementTop - offset < mediaBlockTop + mediaBlockHeight) {
            offset = Math.max(offset, mediaBlockHeight * 0.4) // Keep at least 40% of MediaBlock visible
          }
        }

        const scrollToPosition = Math.max(0, elementTop - offset)

        window.scrollTo({
          top: scrollToPosition,
          behavior: 'smooth',
        })

        /* Alternative simpler approach (replace the above code with this if needed):
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'center' // This keeps the element in the center, preserving context
        })
        */
      } else {
        console.warn(`Element with anchor ID "${anchorId}" not found`)
      }
    }, 100)
  }, [])

  // Create custom converters for the content text
  const contentTextConverters: JSXConvertersFunction<DefaultNodeTypes> = useMemo(
    () =>
      ({ defaultConverters }) => ({
        ...defaultConverters,
        heading: ({ node, nodesToJSX, converters }) => {
          const tag = node.tag as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
          const classNames = {
            h1: `font-ogg ${backgroundColor === 'charcoal' ? 'text-gold' : 'text-gold-dark'} text-4xl md:text-5xl lg:text-6xl mb-6 md:mb-8`,
            h2: `font-poppins ${backgroundColor === 'charcoal' ? 'text-white' : 'text-charcoal'} text-3xl md:text-4xl lg:text-5xl mb-5 md:mb-6`,
            h3: `font-poppins ${backgroundColor === 'charcoal' ? 'text-white' : 'text-charcoal'} text-2xl md:text-3xl lg:text-4xl mb-4 md:mb-5`,
            h4: `font-poppins ${backgroundColor === 'charcoal' ? 'text-white' : 'text-charcoal'} text-xl md:text-2xl lg:text-3xl mb-4`,
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
        paragraph: ({ node, nodesToJSX, converters }) => (
          <p
            className={cn(
              `font-poppins text-base md:text-lg mb-4 md:mb-6`,
              backgroundColor === 'charcoal' ? 'text-white/90' : 'text-charcoal/90',
            )}
          >
            {nodesToJSX({ nodes: node.children, parent: node, converters })}
          </p>
        ),
      }),
    [backgroundColor],
  )

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className={'relative w-full overflow-hidden'}
      data-block-type="mediaBlock"
    >
      {/* Background Media */}
      {media && (
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="absolute inset-0"
        >
          <Media imgClassName={cn('w-full h-full object-cover')} resource={media} fill priority />
        </motion.div>
      )}
      {/* Dark Overlay */}
      <div className={`absolute inset-0 ${backgroundColorClass} z-[1]`} />
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

        {/* Menu Icons Section */}
        {menuItems && menuItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-12 md:mt-16"
          >
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8 max-w-5xl mx-auto">
              {menuItems.map((item: any, index: number) => (
                <motion.button
                  key={item.id || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.1 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleMenuItemClick(item.anchorId)}
                  className="group flex flex-col items-center text-center space-y-3 p-4 rounded-lg hover:bg-white/10 transition-all duration-300"
                >
                  {/* Icon Container */}
                  <div className="relative w-16 h-16 md:w-20 md:h-20 mb-2 transition-transform duration-300 group-hover:scale-110 bg-white/10 rounded-lg flex items-center justify-center p-2">
                    {item.icon && (
                      <Media
                        resource={item.icon}
                        imgClassName={cn(
                          'w-full h-full object-contain transition-all duration-300',
                          'group-hover:opacity-100',
                          backgroundColor === 'charcoal' ? 'opacity-90' : 'opacity-80',
                        )}
                        fill
                      />
                    )}
                  </div>

                  {/* Menu Name */}
                  <span
                    className={cn(
                      'font-poppins text-sm md:text-base font-medium transition-colors duration-300',
                      backgroundColor === 'charcoal'
                        ? 'text-white/80 group-hover:text-white'
                        : 'text-charcoal/80 group-hover:text-charcoal',
                    )}
                  >
                    {item.name}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {links && links.length > 0 && (
          <div className="flex flex-wrap gap-4 justify-center mt-8">
            {links.map((link) => (
              <CMSLink
                key={link.id}
                {...link.link}
                className={cn(
                  'text-white inline-flex text-xs px-8 py-4 transition-all duration-300 hover:scale-105  outline-1 outline-gold-darker',
                )}
              />
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}
