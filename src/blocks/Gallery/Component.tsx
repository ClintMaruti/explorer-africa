import React, { useState, useCallback } from 'react'
import { cn } from '@/utilities/ui'
import type { GalleryBlock as GalleryBlockProps } from '@/payload-types'
import { motion, AnimatePresence } from 'framer-motion'
import { Media } from '@/components/Media'

export const GalleryBlock: React.FC<GalleryBlockProps> = (props) => {
  const {
    anchorId,
    title,
    description,
    images,
    layout = '4',
    aspectRatio = 'landscape',
    spacing = 'small',
    enableLightbox = true,
    showCaptions = true,
    backgroundColor = 'white',
  } = props

  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const backgroundColorClass = {
    white: 'bg-white',
    lightGold: 'bg-pale-mint-white',
    charcoal: 'bg-charcoal',
  }[backgroundColor as 'white' | 'lightGold' | 'charcoal']

  const textColor = backgroundColor === 'charcoal' ? 'text-white' : 'text-charcoal'

  const spacingClass = {
    none: 'gap-0',
    small: 'gap-2 md:gap-3',
    medium: 'gap-4 md:gap-6',
    large: 'gap-6 md:gap-8',
  }[spacing as 'none' | 'small' | 'medium' | 'large']

  const gridCols = {
    '2': 'grid-cols-2',
    '3': 'grid-cols-2 md:grid-cols-3',
    '4': 'grid-cols-2 md:grid-cols-4',
    '5': 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5',
  }[layout as '2' | '3' | '4' | '5']

  const aspectRatioClass = {
    square: 'aspect-square',
    landscape: 'aspect-[4/3]',
    portrait: 'aspect-[3/4]',
    wide: 'aspect-[16/9]',
    auto: '',
  }[aspectRatio as 'square' | 'landscape' | 'portrait' | 'wide' | 'auto']

  const openLightbox = useCallback(
    (index: number) => {
      if (enableLightbox) {
        setCurrentImageIndex(index)
        setLightboxOpen(true)
        document.body.style.overflow = 'hidden'
      }
    },
    [enableLightbox],
  )

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false)
    document.body.style.overflow = 'unset'
  }, [])

  const navigateLightbox = useCallback(
    (direction: 'prev' | 'next') => {
      if (!images) return

      if (direction === 'prev') {
        setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
      } else {
        setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
      }
    },
    [images],
  )

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  if (!images || images.length === 0) {
    return (
      <div className={cn('w-full py-16', backgroundColorClass)}>
        <div className="container mx-auto px-4 text-center">
          <p className={cn('font-poppins text-lg', textColor)}>
            No images available for this gallery.
          </p>
        </div>
      </div>
    )
  }

  return (
    <>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className={cn('w-full py-16 md:py-20', backgroundColorClass)}
        id={anchorId || undefined}
      >
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          {/* Header */}
          {(title || description) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center mb-8 md:mb-12"
            >
              {title && (
                <h2
                  className={cn(
                    'font-ogg text-3xl md:text-4xl lg:text-5xl mb-4',
                    backgroundColor === 'charcoal' ? 'text-gold' : 'text-gold-dark',
                  )}
                >
                  {title}
                </h2>
              )}
              {description && (
                <p
                  className={cn(
                    'font-poppins text-lg md:text-xl max-w-3xl mx-auto leading-relaxed',
                    textColor,
                  )}
                >
                  {description}
                </p>
              )}
            </motion.div>
          )}

          {/* Gallery Grid */}
          <motion.div className={cn('grid', gridCols, spacingClass)} variants={containerVariants}>
            {images.map((item: any, index: number) => (
              <motion.div
                key={item.id || index}
                variants={itemVariants}
                className="group relative overflow-hidden rounded-lg"
              >
                <div
                  className={cn(
                    'relative w-full overflow-hidden',
                    aspectRatioClass,
                    enableLightbox && 'cursor-pointer',
                  )}
                  onClick={() => openLightbox(index)}
                >
                  {item.image && (
                    <>
                      <Media
                        resource={item.image}
                        imgClassName="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        fill
                      />

                      {/* Hover Overlay */}
                      {enableLightbox && (
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                              <svg
                                className="w-6 h-6 text-charcoal"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>

                {/* Caption */}
                {showCaptions && item.caption && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    className="mt-3"
                  >
                    <p
                      className={cn('font-poppins text-sm md:text-base leading-relaxed', textColor)}
                    >
                      {item.caption}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && enableLightbox && images && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-60 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Navigation Buttons */}
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    navigateLightbox('prev')
                  }}
                  className="absolute left-4 z-60 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                >
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    navigateLightbox('next')
                  }}
                  className="absolute right-4 z-60 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                >
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </>
            )}

            {/* Current Image */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl max-h-[80vh] w-full h-full"
              onClick={(e) => e.stopPropagation()}
            >
              {images[currentImageIndex]?.image && (
                <Media
                  resource={images[currentImageIndex].image}
                  imgClassName="object-contain w-full h-full"
                  fill
                  priority
                />
              )}

              {/* Image Counter */}
              {images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
                  {currentImageIndex + 1} / {images.length}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
