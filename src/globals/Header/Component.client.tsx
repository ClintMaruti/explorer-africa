'use client'
import { Header } from '@/payload-types'
import Image from 'next/image'
import { Mail, Menu } from 'lucide-react'
import { useState } from 'react'

interface HeaderProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderProps> = ({ data }) => {
  const logoUrl = data.logo && typeof data.logo === 'object' ? data.logo.url : ''
  const logoAlt = data.logo && typeof data.logo === 'object' ? data.logo.alt : ''
  const [isOpen, setIsOpen] = useState(false)
  return (
    <header className="fixed top-0 left-0 p-6 w-full z-50 bg-black/50 backdrop-blur-sm text-gold">
      <div className="relative flex items-center sm:justify-between">
        <button
          className=" cursor-pointer hover:bg-gold/10 rounded-full p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Menu />
        </button>
        {logoUrl && (
          <Image
            src={logoUrl}
            alt={logoAlt}
            width={160}
            height={100}
            className="absolute left-1/2 -translate-x-1/2 sm:relative sm:left-auto sm:translate-x-0"
          />
        )}
        <div className="w-[160px] text-right hidden sm:flex items-center gap-2 ">
          <Mail className="w-4 h-4" />
          <span className="text-sm">{data.email}</span>
        </div>
      </div>
    </header>
  )
}
