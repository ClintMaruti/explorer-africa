import React from 'react'
import { cn } from '@/utilities/ui'
import type { MapBlock as MapBlockProps } from '@/payload-types'
import { motion } from 'framer-motion'

export const MapBlock: React.FC<MapBlockProps> = (props) => {
  const {
    title,
    mapType = 'google',
    latitude,
    longitude,
    address,
    embedUrl,
    zoomLevel = 15,
    mapMode = 'roadmap',
    height = 'medium',
    showControls = true,
    allowFullscreen = true,
    borderRadius = 'medium',
  } = props

  const heightClass = {
    small: 'h-[300px]',
    medium: 'h-[400px]',
    large: 'h-[500px]',
    xl: 'h-[600px]',
  }[height as 'small' | 'medium' | 'large' | 'xl']

  const radiusClass = {
    none: 'rounded-none',
    small: 'rounded-md',
    medium: 'rounded-lg',
    large: 'rounded-xl',
  }[borderRadius as 'none' | 'small' | 'medium' | 'large']

  // Generate Google Maps embed URL
  const generateGoogleMapsUrl = () => {
    const baseUrl = 'https://www.google.com/maps/embed/v1/place'
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || 'YOUR_API_KEY'

    let query = ''
    if (latitude && longitude) {
      query = `${latitude},${longitude}`
    } else if (address) {
      query = encodeURIComponent(address)
    } else {
      // Default to Serengeti if no location provided
      query = 'Serengeti+National+Park+Tanzania'
    }

    const params = new URLSearchParams({
      key: apiKey,
      q: query,
      zoom: zoomLevel.toString(),
      maptype: mapMode,
    })

    return `${baseUrl}?${params.toString()}`
  }

  // Get the appropriate map URL
  const getMapUrl = () => {
    if (mapType === 'embed' && embedUrl) {
      return embedUrl
    }
    return generateGoogleMapsUrl()
  }

  // Generate map title for accessibility
  const getMapTitle = () => {
    if (title) return title
    if (address) return `Map of ${address}`
    if (latitude && longitude) return `Map location at ${latitude}, ${longitude}`
    return 'Interactive Map'
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
      className="w-full py-8 md:py-12 bg-pale-mint-white"
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl">
        {title && (
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-ogg text-gold-dark text-2xl md:text-3xl lg:text-4xl mb-6 md:mb-8 text-center"
          >
            {title}
          </motion.h2>
        )}

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className={cn(
            'w-full overflow-hidden shadow-lg',
            heightClass,
            radiusClass,
            'border border-gray-200',
          )}
        >
          <iframe
            src={getMapUrl()}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={allowFullscreen}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={getMapTitle()}
            className="w-full h-full"
          />
        </motion.div>

        {/* Map Info Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-4 text-center"
        >
          {address && (
            <p className="font-poppins text-charcoal/70 text-sm md:text-base">📍 {address}</p>
          )}
          {latitude && longitude && (
            <p className="font-poppins text-charcoal/60 text-xs md:text-sm mt-1">
              Coordinates: {latitude}°, {longitude}°
            </p>
          )}
        </motion.div>

        {/* Fallback message if no location data */}
        {!address && !latitude && !longitude && !embedUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-4 text-center"
          >
            <p className="font-poppins text-charcoal/60 text-sm">
              Please configure the map location in the CMS admin
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
