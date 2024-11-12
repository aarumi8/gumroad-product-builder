// components/building-components/heroes/two-images-hero.tsx
import React from 'react'
import { useComponentEditor } from '@/hooks/useComponentEditor'
import { EditorControls } from '@/components/building-blocks/editor-controls'
import { BackgroundGradients } from '@/components/building-blocks/background-gradients'
import { ImageUploader } from '@/components/building-blocks/image-uploader'
import { SectionWrapper } from '@/components/building-blocks/section-wrapper'
import { EditableContent } from '@/components/building-blocks/editable-content'

interface HeroContent {
  title: string
  subtitle: string
  buttonText: string
  images: string[]
}

interface TwoImagesHeroProps {
  id: string
  initialData?: HeroContent
  isPreview?: boolean
}

export function TwoImagesHero({ id, initialData, isPreview }: TwoImagesHeroProps) {
  const defaultContent: HeroContent = {
    title: "Create & Innovate",
    subtitle: "Design stunning websites with our drag-and-drop builder. Perfect for businesses, portfolios, and personal projects.",
    buttonText: "Start Building",
    images: ["", ""]
  }

  const {
    content,
    editedContent,
    isEditing,
    setEditedContent,
    saveChanges,
    startEditing,
    deleteComponent
  } = useComponentEditor<HeroContent>({
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
    const formattedContent: HeroContent = {
      title: aiContent.title || defaultContent.title,
      subtitle: aiContent.subtitle || defaultContent.subtitle,
      buttonText: aiContent.buttonText || defaultContent.buttonText,
      images: aiContent.images.slice(0, 2) // Ensure we only take up to 2 images
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

  const handleContentChange = (key: keyof HeroContent, value: string) => {
    setEditedContent({ ...editedContent, [key]: value })
  }

  return (
    <SectionWrapper className="bg-gradient-to-b from-gray-50 to-white py-20">
      <BackgroundGradients colors={{
        first: 'from-primary to-purple-400 opacity-20',
        second: 'from-blue-400 to-primary opacity-10'
      }} />

      <EditorControls
        isPreview={isPreview}
        isEditing={isEditing}
        onDelete={() => deleteComponent(id)}
        onEdit={startEditing}
        onSave={saveChanges}
        componentType="two-images-hero"
        onAIContent={handleAIContent}
      />

      <div className="max-w-7xl mx-auto">
        {/* Text Content */}
        <div className="text-center max-w-3xl mx-auto relative z-10 mb-16">
          <EditableContent
            isEditing={isEditing}
            isPreview={isPreview}
            content={isEditing ? editedContent : content}
            onContentChange={handleContentChange}
            className="max-w-3xl mx-auto"
          />
        </div>

        {/* Images Grid */}
        <div className="grid md:grid-cols-2 gap-8 relative z-10">
          {[0, 1].map((index) => (
            <div key={index} className="relative">
              <ImageUploader
                imageUrl={isEditing ? editedContent.images[index] : content.images[index]}
                onImageChange={handleImageChange(index)}
                isEditing={isEditing}
                isPreview={isPreview}
                aspectRatio="aspect-[4/3]"
                className="shadow-xl"
              />
              <div 
                className={`absolute -top-3 -right-3 -bottom-3 -left-3 bg-gradient-to-br ${
                  index === 0 
                    ? 'from-primary/20 to-purple-400/20' 
                    : 'from-blue-400/20 to-primary/20'
                } rounded-2xl -z-10`} 
              />
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}

export default TwoImagesHero