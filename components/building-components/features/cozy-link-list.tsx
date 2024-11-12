import React from 'react'
import { useComponentEditor } from '@/hooks/useComponentEditor'
import { EditorControls } from '@/components/building-blocks/editor-controls'
import { BackgroundGradients } from '@/components/building-blocks/background-gradients'
import { SectionWrapper } from '@/components/building-blocks/section-wrapper'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface ListContent {
  items: string[]
}

interface CozyLinkListProps {
  id: string
  initialData?: ListContent
  isPreview?: boolean
}

export function CozyLinkList({ id, initialData, isPreview }: CozyLinkListProps) {
  const defaultContent: ListContent = {
    items: [
      "Integration with popular design tools",
      "Real-time collaboration features",
      "Advanced exporting options",
      "Custom themes and styling",
      "Automatic backup and versioning"
    ]
  }

  const {
    content,
    editedContent,
    isEditing,
    setEditedContent,
    saveChanges,
    startEditing,
    deleteComponent
  } = useComponentEditor<ListContent>({
    id,
    defaultContent,
    initialData
  })

  const handleAIContent = (aiContent: any) => {
    console.log('Raw AI content received:', aiContent)
    
    if (!aiContent || !Array.isArray(aiContent.items)) {
      console.error('Invalid AI content received:', aiContent)
      return
    }

    // Start editing mode
    startEditing()

    // Format the content
    const formattedContent: ListContent = {
      items: aiContent.items.slice(0, 5) // Ensure we only take up to 5 items
    }

    console.log('Formatted content:', formattedContent)
    setEditedContent({...formattedContent})
  }

  const handleEdit = (index: number, value: string) => {
    const newItems = [...editedContent.items]
    newItems[index] = value
    setEditedContent({ items: newItems })
  }

  // Function to get gradient colors based on index
  const getGradientColor = (index: number) => {
    const gradients = [
      { bg: 'from-blue-400 to-purple-400', pulse: 'from-blue-400 to-purple-400' },
      { bg: 'from-rose-400 to-orange-400', pulse: 'from-rose-400 to-orange-400' },
      { bg: 'from-emerald-400 to-cyan-400', pulse: 'from-emerald-400 to-cyan-400' },
      { bg: 'from-amber-400 to-yellow-400', pulse: 'from-amber-400 to-yellow-400' },
      { bg: 'from-pink-400 to-purple-400', pulse: 'from-pink-400 to-purple-400' }
    ]
    return gradients[index % gradients.length]
  }

  // List Item Component
  const ListItem = ({ 
    item, 
    index 
  }: { 
    item: string
    index: number 
  }) => {
    const gradientColors = getGradientColor(index)

    return (
      <li className="flex items-start gap-4 group">
        <div className="mt-1.5 relative">
          {/* Animated pulse effect */}
          <div className={cn(
            "absolute inset-0 rounded-full animate-ping opacity-20",
            `bg-gradient-to-r ${gradientColors.pulse}`
          )} />
          {/* Bullet point */}
          <div className={cn(
            "relative h-3 w-3 rounded-full transform transition-transform duration-300 group-hover:scale-125",
            `bg-gradient-to-r ${gradientColors.bg}`
          )} />
        </div>
        
        <div className="flex-1">
          {isEditing && !isPreview ? (
            <Input
              value={item}
              onChange={(e) => handleEdit(index, e.target.value)}
              className="bg-white/50 border-gray-200 focus:bg-white"
              placeholder="Enter feature description..."
            />
          ) : (
            <div className="group relative overflow-hidden">
              <p className="text-gray-600 text-lg leading-relaxed transition-transform duration-300 group-hover:translate-x-2">
                {item}
              </p>
            </div>
          )}
        </div>
      </li>
    )
  }

  return (
    <SectionWrapper>
      <BackgroundGradients colors={{
        first: 'from-blue-100/20 to-purple-100/20',
        second: 'from-rose-100/20 to-orange-100/20'
      }}>
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-emerald-100/10 to-cyan-100/10 rounded-full mix-blend-multiply blur-xl"
          style={{
            animation: 'moveUpDown 8s ease-in-out infinite',
            animationDelay: '-2s'
          }}
        />
      </BackgroundGradients>

      <EditorControls
        isPreview={isPreview}
        isEditing={isEditing}
        onDelete={() => deleteComponent(id)}
        onEdit={startEditing}
        onSave={saveChanges}
        componentType="features-1"
        onAIContent={handleAIContent}
      />

      <div className="max-w-4xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12">
          <div className="relative inline-block">
            <h2 className="text-3xl font-bold text-gray-900">Key Features</h2>
            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary/60 to-purple-500/60 rounded-full"
              style={{
                animation: 'expandWidth 0.8s ease-out forwards',
                animationDelay: '0.4s'
              }}
            />
          </div>
          <p className="mt-4 text-lg text-gray-500">
            Essential features that make our product stand out
          </p>
        </div>

        {/* List Items */}
        <ul className="space-y-6">
          {(isEditing ? editedContent.items : content.items).map((item, index) => (
            <ListItem 
              key={`${id}-${index}`}
              item={item}
              index={index}
            />
          ))}
        </ul>
      </div>

      <style jsx>{`
        @keyframes expandWidth {
          from { width: 0; }
          to { width: 100%; }
        }
      `}</style>
    </SectionWrapper>
  )
}

export default CozyLinkList