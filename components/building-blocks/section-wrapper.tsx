import { animations } from "./animations"

interface SectionWrapperProps {
    children: React.ReactNode
    className?: string
  }
  
  export function SectionWrapper({ children, className = "" }: SectionWrapperProps) {
    return (
      <section className={`relative py-24 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100 overflow-hidden ${className}`}>
        <style jsx>{animations}</style>
        {children}
      </section>
    )
  }