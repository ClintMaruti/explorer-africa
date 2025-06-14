import React from 'react'
import './styles.css'
import { Header } from '@/globals/Header/Component'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body suppressHydrationWarning={true}>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  )
}
