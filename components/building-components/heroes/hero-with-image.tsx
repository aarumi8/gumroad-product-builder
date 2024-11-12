// components/building-components/heroes/hero-with-image.tsx
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
  imageUrl: string
}

interface HeroWithImageProps {
  id: string
  initialData?: HeroContent
  isPreview?: boolean
}

export function HeroWithImage({ id, initialData, isPreview }: HeroWithImageProps) {
  const defaultContent: HeroContent = {
    title: "Build Beautiful Websites Without Code",
    subtitle: "Transform your ideas into reality without writing a single line of code.",
    buttonText: "Get Started",
    imageUrl: ""
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
    
    if (!aiContent || typeof aiContent !== 'object') {
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
      imageUrl: aiContent.imageUrl || ""
    }

    console.log('Formatted content:', formattedContent)
    setEditedContent({...formattedContent})
  }

  const handleImageChange = (file: File) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      setEditedContent({ ...editedContent, imageUrl: reader.result as string })
    }
    reader.readAsDataURL(file)
  }

  const handleContentChange = (key: keyof HeroContent, value: string) => {
    setEditedContent({ ...editedContent, [key]: value })
  }

  return (
    <SectionWrapper className="bg-gray-50">
      <BackgroundGradients colors={{
        first: 'from-primary/40 to-purple-400',
        second: 'from-blue-400 to-primary/40'
      }} />

      <EditorControls
        isPreview={isPreview}
        isEditing={isEditing}
        onDelete={() => deleteComponent(id)}
        onEdit={startEditing}
        onSave={saveChanges}
        componentType="hero-with-image"
        onAIContent={handleAIContent}
      />

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative z-10">
            <EditableContent
              isEditing={isEditing}
              isPreview={isPreview}
              content={isEditing ? editedContent : content}
              onContentChange={handleContentChange}
            />
          </div>

          <div className="relative z-10">
            <ImageUploader
              imageUrl={isEditing ? editedContent.imageUrl : content.imageUrl}
              onImageChange={handleImageChange}
              isEditing={isEditing}
              isPreview={isPreview}
              aspectRatio="aspect-[5/4]"
              className="shadow-xl"
            />
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 -bottom-4 -left-4 bg-gradient-to-br from-primary/20 to-purple-400/20 rounded-2xl -z-10" />
            <div className="absolute -top-2 -right-2 -bottom-2 -left-2 bg-gradient-to-br from-primary/10 to-purple-400/10 rounded-2xl -z-10" />
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}