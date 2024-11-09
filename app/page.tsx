import Sidebar from '@/components/shared/sidebar'
import MainContent from '@/components/shared/main-content'

export default function Home() {
  return (
    <main className="flex min-h-screen">
      <Sidebar />
      <MainContent />
    </main>
  )
}