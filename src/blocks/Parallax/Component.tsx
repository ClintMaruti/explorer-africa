import React, { useRef } from 'react'
import { cn } from '@/utilities/ui'
import RichText from '@/components/RichText'
import type { ParallaxBlock as ParallaxBlockProps } from '@/payload-types'
import { Media } from '@/components/Media'
import { motion } from 'framer-motion'
import { useMemo } from 'react'
import type { DefaultNodeTypes } from '@payloadcms/richtext-lexical'
import type { JSXConvertersFunction } from '@payloadcms/richtext-lexical/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

export const ParallaxBlock: React.FC<ParallaxBlockProps> = (props) => {
  const {
    anchorId,
    backgroundImage,
    height = 'large',
    parallaxSpeed = 'medium',
    overlay = 'medium',
    content,
    textAlignment = 'center',
    textColor = 'white',
  } = props

  const containerRef = useRef<HTMLDivElement>(null)
  const backgroundRef = useRef<HTMLDivElement>(null)

  // Height classes
  const heightClass = {
    small: 'h-[400px]',
    medium: 'h-[600px]',
    large: 'h-[800px]',
    xl: 'h-screen',
  }[height as 'small' | 'medium' | 'large' | 'xl']

  // Parallax speed values
  const speedValue = {
    slow: 0.3,
    medium: 0.5,
    fast: 0.7,
    none: 0,
  }[parallaxSpeed as 'slow' | 'medium' | 'fast' | 'none']

  // Overlay classes
  const overlayClass = {
    none: '',
    light: 'bg-black/30',
    medium: 'bg-black/50',
    dark: 'bg-black/70',
  }[overlay as 'none' | 'light' | 'medium' | 'dark']

  // Text alignment classes
  const alignmentClass = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  }[textAlignment as 'left' | 'center' | 'right']

  // Text color classes
  const textColorClass = {
    white: 'text-white',
    black: 'text-charcoal',
    gold: 'text-gold',
  }[textColor as 'white' | 'black' | 'gold']

  // GSAP Parallax effect
  useGSAP(() => {
    if (!containerRef.current || !backgroundRef.current || speedValue === 0) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        refreshPriority: -1,
      },
    })

    // Move background slower than scroll to create parallax effect
    // Reduced movement to prevent edge exposure
    tl.to(backgroundRef.current, {
      yPercent: -10 * speedValue,
      ease: 'none',
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [speedValue])

  // Create custom converters for the parallax content
  const parallaxTextConverters: JSXConvertersFunction<DefaultNodeTypes> = useMemo(
    () =>
      ({ defaultConverters }) => ({
        ...defaultConverters,
        heading: ({ node, nodesToJSX, parent, converters }) => {
          const tag = node.tag as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
          const classNames = {
            h1: `font-ogg text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-6 md:mb-8 tracking-wide ${textColorClass}`,
            h2: `font-poppins text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-5 md:mb-6 font-light tracking-wide ${textColorClass}`,
            h3: `font-poppins text-2xl md:text-3xl lg:text-4xl xl:text-5xl mb-4 md:mb-5 font-medium tracking-wide ${textColorClass}`,
            h4: `font-poppins text-xl md:text-2xl lg:text-3xl xl:text-4xl mb-3 md:mb-4 font-medium tracking-wide uppercase ${textColorClass}`,
            h5: `font-poppins text-lg md:text-xl lg:text-2xl xl:text-3xl mb-3 font-medium tracking-wide ${textColorClass}`,
            h6: `font-poppins text-base md:text-lg lg:text-xl xl:text-2xl mb-2 font-medium tracking-wide ${textColorClass}`,
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
              'font-poppins text-lg md:text-xl lg:text-2xl mb-4 md:mb-6 leading-relaxed font-light',
              textAlignment === 'center' ? 'max-w-4xl mx-auto text-center' : 'max-w-4xl',
              textColorClass,
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
                'mb-6 space-y-2 max-w-3xl',
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
              'font-poppins text-lg md:text-xl leading-relaxed font-light relative',
              textColorClass,
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
              'border-l-4 border-gold pl-6 italic font-light text-xl md:text-2xl mb-6 max-w-4xl',
              textColorClass,
            )}
          >
            {nodesToJSX({ nodes: node.children, parent: node, converters })}
          </blockquote>
        ),
      }),
    [textColorClass, textAlignment],
  )

  return (
    <div
      ref={containerRef}
      className={cn('relative w-full overflow-hidden', heightClass)}
      id={anchorId || undefined}
      style={{ isolation: 'isolate' }}
    >
      {/* Parallax Background */}
      <div
        ref={backgroundRef}
        className="absolute inset-0 w-full h-[140%] -top-[10%] z-0"
        style={{ willChange: 'transform' }}
      >
        {backgroundImage && (
          <Media
            resource={backgroundImage}
            imgClassName="w-full h-full object-cover"
            fill
            priority
          />
        )}
      </div>

      {/* Overlay */}
      {overlay !== 'none' && <div className={cn('absolute inset-0 z-10', overlayClass)} />}

      {/* Content */}
      {content && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={cn(
            'relative z-30 flex flex-col justify-center items-center h-full px-4 md:px-6 lg:px-8',
            textAlignment === 'left' && 'items-start text-left',
            textAlignment === 'right' && 'items-end text-right',
            textAlignment === 'center' && 'items-center text-center',
          )}
          style={{ minHeight: '100%' }}
        >
          <div
            className={cn(
              'w-full max-w-7xl mx-auto',
              textAlignment === 'center' && 'flex flex-col items-center',
            )}
          >
            <RichText data={content} enableGutter={false} converters={parallaxTextConverters} />
          </div>
        </motion.div>
      )}
    </div>
  )
}
