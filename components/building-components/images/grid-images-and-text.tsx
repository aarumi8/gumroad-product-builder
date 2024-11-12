// components/building-components/images/grid-images-and-text.tsx
import React from 'react'
import { useComponentEditor } from '@/hooks/useComponentEditor'
import { EditorControls } from '@/components/building-blocks/editor-controls'
import { BackgroundGradients } from '@/components/building-blocks/background-gradients'
import { ImageUploader } from '@/components/building-blocks/image-uploader'
import { SectionWrapper } from '@/components/building-blocks/section-wrapper'
import { EditableContent } from '@/components/building-blocks/editable-content'
import { cn } from '@/lib/utils'

interface GridImagesContent {
  title: string
  description: string
  images: string[]
}

interface GridImagesAndTextProps {
  id: string
  initialData?: GridImagesContent
  isPreview?: boolean
}

export function GridImagesAndText({ id, initialData, isPreview }: GridImagesAndTextProps) {
  const defaultContent: GridImagesContent = {
    title: "Our Gallery",
    description: "Discover our collection of stunning visuals that showcase our work.",
    images: ["", "", "", ""]
  }

  const {
    content,
    editedContent,
    isEditing,
    setEditedContent,
    saveChanges,
    startEditing,
    deleteComponent
  } = useComponentEditor<GridImagesContent>({
    id,
    defaultContent,
    initialData
  })

  const handleAIContent = (aiContent: any) => {
    console.log('Raw AI content received:', aiContent)
    
    if (!aiContent || typeof aiContent !== 'object' || !Array.isArray(aiContent.images)) {
      console.error('Invalid AI content received:', aiContent)
      return
    }

    // Start editing mode
    startEditing()

    // Format the content with fallbacks
    const formattedContent: GridImagesContent = {
      title: aiContent.title || defaultContent.title,
      description: aiContent.description || defaultContent.description,
      images: aiContent.images.slice(0, 4) // Ensure we only take up to 4 images
    }

    console.log('Formatted content:', formattedContent)
    setEditedContent({...formattedContent})
  }

  const handleImageChange = (index: number) => (file: File) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      const newImages = [...editedContent.images]
      newImages[index] = reader.result as string
      setEditedContent({ ...editedContent, images: newImages })
    }
    reader.readAsDataURL(file)
  }

  const handleContentChange = (key: keyof GridImagesContent, value: string) => {
    setEditedContent({ ...editedContent, [key]: value })
  }

  // Helper function to get gradient colors for each image box
  const getGradientColor = (index: number) => {
    const gradients = [
      'from-blue-500/20 to-purple-500/20',
      'from-rose-500/20 to-orange-500/20',
      'from-emerald-500/20 to-cyan-500/20',
      'from-amber-500/20 to-yellow-500/20'
    ]
    return gradients[index % gradients.length]
  }

  // Image Grid Item Component
  const ImageGridItem = ({ index }: { index: number }) => {
    return (
      <div
        className="relative group"
        style={{
          animation: `fadeIn 0.6s ease-out forwards`,
          animationDelay: `${index * 0.2}s`
        }}
      >
        {/* Background gradient animation */}
        <div 
          className={cn(
            "absolute -inset-2 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg",
            `bg-gradient-to-r ${getGradientColor(index)}`
          )}
        />
        <div className="relative">
          <ImageUploader
            imageUrl={isEditing ? editedContent.images[index] : content.images[index]}
            onImageChange={handleImageChange(index)}
            isEditing={isEditing}
            isPreview={isPreview}
            aspectRatio="aspect-square"
            className={cn(
              "rounded-xl shadow-lg transition-transform duration-300",
              "hover:scale-[1.02] hover:-translate-y-1"
            )}
          />
          {/* Decorative corner accents */}
          <CornerAccents />
        </div>
      </div>
    )
  }

  // Corner Accents Component
  const CornerAccents = () => (
    <>
      <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-white/30 rounded-tl-lg" />
      <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-white/30 rounded-tr-lg" />
      <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-white/30 rounded-bl-lg" />
      <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-white/30 rounded-br-lg" />
    </>
  )

  return (
    <SectionWrapper>
      <BackgroundGradients colors={{
        first: 'from-blue-500/10 to-purple-500/10',
        second: 'from-rose-500/10 to-orange-500/10'
      }} />

      <EditorControls
        isPreview={isPreview}
        isEditing={isEditing}
        onDelete={() => deleteComponent(id)}
        onEdit={startEditing}
        onSave={saveChanges}
        componentType="grid-images-and-text"
        onAIContent={handleAIContent}
      />

      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Grid Images */}
          <div className="grid grid-cols-2 gap-6 relative">
            {[0, 1, 2, 3].map((index) => (
              <ImageGridItem key={index} index={index} />
            ))}
          </div>

          {/* Text Content */}
          <div className="space-y-6" style={{ animation: 'slideIn 0.8s ease-out' }}>
            <EditableContent
              isEditing={isEditing}
              isPreview={isPreview}
              content={isEditing ? editedContent : content}
              onContentChange={handleContentChange}
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </SectionWrapper>
  )
}

export default GridImagesAndText