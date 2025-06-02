import { Footer as FooterProps } from '@/payload-types'
import { cn } from '@/utilities/ui'
import React from 'react'
import { Media } from '../../components/Media'
import Image from 'next/image'

export const Footer: React.FC<FooterProps> = (props) => {
  const { mainLogo, phoneNumbers, email, otherLogos, backgroundImage } = props

  return (
    <div className="relative w-full overflow-hidden bg-charcoal">
      {/* Background Media */}
      <div className="absolute inset-0">
        {backgroundImage && (
          <Media
            imgClassName={cn('w-full h-full object-cover opacity-50')}
            resource={backgroundImage}
            fill
            priority
          />
        )}
      </div>
      {/* Pattern Overlay */}
      <div className="absolute inset-0 z-[1] opacity-30">
        <Image
          src="/media/contours.png"
          alt="Background pattern"
          fill
          className="object-cover"
          priority
        />
      </div>
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40 z-[2]" />
      {/* Content Overlay */}
      <div className="container relative z-[3] px-4 max-w-6xl mx-auto py-16">
        <div className="flex flex-col items-center justify-center gap-12">
          {/* Main Logo */}
          <div className="w-full flex items-center justify-center">
            <Media
              imgClassName={cn('w-auto h-24 md:h-32 object-contain')}
              resource={mainLogo}
              priority
            />
          </div>

          {/* Contact Information */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
            {/* Phone Numbers */}
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4 text-white/90"
                >
                  <path
                    fillRule="evenodd"
                    d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="text-white/90 text-base md:text-lg font-light tracking-wide">
                {phoneNumbers.map((phone, index) => (
                  <React.Fragment key={phone.id}>
                    {phone.phoneNumber}
                    {index < phoneNumbers.length - 1 && ' | '}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4 text-white/90"
                >
                  <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                  <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                </svg>
              </div>
              <div className="text-white/90 text-base md:text-lg font-light tracking-wide">
                {email}
              </div>
            </div>
          </div>

          {/* Other Logos */}
          {otherLogos && otherLogos.length > 0 && (
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
              {otherLogos.map((logo) => (
                <Media
                  key={logo.id}
                  imgClassName={cn(
                    'w-auto h-12 md:h-16 object-contain brightness-0 invert opacity-80 hover:opacity-100 transition-opacity',
                  )}
                  resource={logo.logo}
                  priority
                />
              ))}
            </div>
          )}

          {/* Copyright */}
          <div className="text-white/60 text-sm font-light mt-8">
            © Explorer By Elewana {new Date().getFullYear()}
          </div>
        </div>
      </div>
    </div>
  )
}
