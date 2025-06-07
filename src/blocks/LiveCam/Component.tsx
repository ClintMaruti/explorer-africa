import { LiveCamBlock } from '@/payload-types'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'
import { motion } from 'framer-motion'
import React from 'react'
import { ChevronRight } from 'lucide-react'

export const LiveCamBlockComponent = ({ block }: { block: LiveCamBlock }) => {
  const { liveCamGallery } = block
  console.log('Live Cam Block', liveCamGallery)
  if (!liveCamGallery || liveCamGallery.length === 0) {
    return (
      <div className="w-full py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <p className="font-poppins text-lg text-charcoal">No live cams available.</p>
        </div>
      </div>
    )
  }

  const featuredCam = liveCamGallery.find((cam) => cam.isActive) || liveCamGallery[0]
  const otherCams = liveCamGallery.filter((cam) => cam.id !== featuredCam.id)

  return (
    <section className="bg-pale-gold py-20 md:py-28">
      <div className="container mx-auto px-4">
        {/* Featured Card */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="lg:col-span-3 rounded-2xl overflow-hidden shadow-2xl group"
          >
            <div className="relative aspect-[16/10] bg-charcoal">
              {typeof featuredCam.thumbnail === 'number' ? (
                <p>Media not available</p>
              ) : (
                <Media resource={featuredCam.thumbnail} imgClassName="w-full h-full object-cover" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10" />
              <div className="absolute bottom-0 left-0 p-6 md:p-8">
                <h3 className="font-ogg text-4xl md:text-5xl text-white mb-2">
                  {featuredCam.title}
                </h3>
              </div>
            </div>
          </motion.div>
          <div className="lg:col-span-2 flex flex-col justify-center">
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
              className="font-poppins text-charcoal/80 text-lg leading-relaxed"
            >
              {featuredCam.description}
            </motion.p>
            {featuredCam.links && featuredCam.links.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="mt-6"
              >
                {featuredCam.links[0] && (
                  <a
                    href={
                      featuredCam.links[0].link.url ||
                      `/${(featuredCam.links[0].link.reference?.value as any)?.slug || ''}`
                    }
                    className="inline-flex items-center font-semibold text-gold-dark hover:text-gold transition-colors group"
                  >
                    <span>{featuredCam.links[0].link.label}</span>
                    <ChevronRight className="w-5 h-5 ml-1 transform group-hover:translate-x-1 transition-transform" />
                  </a>
                )}
              </motion.div>
            )}
          </div>
        </div>

        {/* Other Cams Grid */}
        <div className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 relative z-10">
            {otherCams.map((cam, i) => (
              <motion.div
                key={cam.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 group"
              >
                <div className="relative aspect-video">
                  {typeof cam.thumbnail === 'number' ? (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <p className="text-gray-500">Media not available</p>
                    </div>
                  ) : (
                    <Media resource={cam.thumbnail} imgClassName="w-full h-full object-cover" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent" />
                </div>
                <div className="p-5">
                  <h4 className="font-ogg text-2xl text-charcoal mb-2 truncate">{cam.title}</h4>
                  {cam.links && cam.links.length > 0 && cam.links[0] && (
                    <a
                      href={
                        cam.links[0].link.url ||
                        `/${(cam.links[0].link.reference?.value as any)?.slug || ''}`
                      }
                      className="inline-flex items-center text-sm font-semibold text-gold-dark hover:text-gold transition-colors group"
                    >
                      <span>{cam.links[0].link.label}</span>
                      <ChevronRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
