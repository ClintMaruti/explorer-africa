'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Header as HeaderType } from '@/payload-types'
import { X } from 'lucide-react'

interface SidebarProps {
  data: HeaderType
  handleClose: (value: boolean) => void
  isOpen: boolean
}

export const Sidebar: React.FC<SidebarProps> = ({ data, handleClose, isOpen }) => {
  const navGroups = data.navItems || []

  const getItemUrl = (link: NonNullable<NonNullable<HeaderType['navItems']>[0]['link']>) => {
    if (link.type === 'custom') {
      return link.url || '#'
    }

    if (link.type === 'reference' && link.reference) {
      return `/${link.reference.value}`
    }

    return '#'
  }

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={() => handleClose(false)}
        />
      )}
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 w-64 h-screen bg-black/50 backdrop-blur-sm text-gold transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="w-full h-[100px] flex items-center">
          <button
            className="cursor-pointer hover:bg-gold/10 rounded-full p-2 ml-auto"
            onClick={() => handleClose(false)}
          >
            <X />
          </button>
        </div>
        <div className="flex flex-col h-full">
          {/* Navigation Items */}
          <nav className="flex-1 px-4 py-6 overflow-y-auto">
            <ul className="space-y-6">
              {navGroups.map((group) => (
                <li key={group.id} className="space-y-2">
                  <Link
                    href={getItemUrl(group.link)}
                    className="flex items-center px-4 py-3 text-gray-700 rounded-md hover:bg-gray-100 hover:text-gray-900 transition-all duration-200"
                  >
                    {group.link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>
    </>
  )
}
