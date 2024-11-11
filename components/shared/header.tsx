// components/shared/header.tsx
import { cn } from "@/lib/utils"

export default function Header() {
  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-sm border-b z-40 flex items-center px-4">
        <div className="flex-1 flex items-center justify-between">
          {/* Space for sidebar menu button (already implemented) */}
          <div className="w-8" />
          
          {/* Gradient Label */}
          <div className="relative">
            <span className="bg-gradient-to-r from-primary/80 to-purple-600/80 text-transparent bg-clip-text font-semibold">
              Gumroad Product Builder
            </span>
            <div className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-primary/60 to-purple-600/60" />
          </div>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden lg:block fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-sm border-b z-40">
        <div className="h-full flex items-center">
          {/* Left side - Page Components */}
          <div className="w-[300px] px-6 border-r h-full flex items-center">
            <div className="relative">
              <span className="text-lg bg-gradient-to-r from-primary/80 to-purple-600/80 text-transparent bg-clip-text font-semibold">
                Page Components
              </span>
              <div className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-primary/60 to-purple-600/60" />
            </div>
          </div>
          
          {/* Right side - App Name */}
          <div className="px-8">
            <div className="relative">
              <span className="text-lg bg-gradient-to-r from-primary/80 to-purple-600/80 text-transparent bg-clip-text font-semibold">
                Gumroad Product Builder
              </span>
              <div className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-primary/60 to-purple-600/60" />
            </div>
          </div>
        </div>

        {/* Vertical line that extends from header to bottom */}
        <div className="fixed top-16 bottom-0 left-[300px] w-[1px] bg-border" />
      </div>
    </>
  )
}