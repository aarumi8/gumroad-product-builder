"use client"

import Sidebar from '@/components/shared/sidebar'
import MainContent from '@/components/shared/main-content'
import { ComponentProvider } from '@/context/component-context'

export default function Home() {
  return (
    <ComponentProvider>
      <main className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <MainContent />
      </main>
    </ComponentProvider>
  )
}