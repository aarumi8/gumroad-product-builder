"use client"

import Sidebar from '@/components/shared/sidebar'
import MainContent from '@/components/shared/main-content'
import Header from '@/components/shared/header'
import { ComponentProvider } from '@/context/component-context'
import { useState } from 'react'

export default function Home() {
  const [isPreview, setIsPreview] = useState(false)

  if (isPreview) {
    return (
      <ComponentProvider>
        <div className="min-h-screen bg-white">
          <button
            onClick={() => setIsPreview(false)}
            className="fixed top-4 left-4 z-50 inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3"
          >
            ← Back to Editor
          </button>
          <MainContent isPreview />
        </div>
      </ComponentProvider>
    )
  }

  return (
    <ComponentProvider>
      <Header />
      <main className="flex min-h-screen bg-gray-50 pt-16"> {/* Added pt-16 for header spacing */}
        <Sidebar />
        <MainContent onPreview={() => setIsPreview(true)} />
      </main>
    </ComponentProvider>
  )
}