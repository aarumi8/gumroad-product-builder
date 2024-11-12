// components/building-components/images/text-and-image.tsx
import React from 'react'
import { useComponentEditor } from '@/hooks/useComponentEditor'
import { EditorControls } from '@/components/building-blocks/editor-controls'
import { BackgroundGradients } from '@/components/building-blocks/background-gradients'
import { ImageUploader } from '@/components/building-blocks/image-uploader'
import { SectionWrapper } from '@/components/building-blocks/section-wrapper'
import { EditableContent } from '@/components/building-blocks/editable-content'

interface TextImageContent {
  title: string
  description: string
  imageUrl: string
}

interface TextAndImageProps {
  id: string
  initialData?: TextImageContent
  isPreview?: boolean
}

export function TextAndImage({ id, initialData, isPreview }: TextAndImageProps) {
  const defaultContent: TextImageContent = {
    title: "Transform Your Workflow",
    description: "Our platform provides powerful tools and features that help you streamline your work process, increase productivity, and achieve better results. Experience the difference with our innovative solutions.",
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
  } = useComponentEditor<TextImageContent>({
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
    const formattedContent: TextImageContent = {
      title: aiContent.title || defaultContent.title,
      description: aiContent.description || defaultContent.description,
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

  const handleContentChange = (key: keyof TextImageContent, value: string) => {
    setEditedContent({ ...editedContent, [key]: value })
  }

  // Layout decorative elements
  const ImageDecorationLayer = () => (
    <>
      <div 
        className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-2xl blur-lg -z-10"
        style={{
          animation: 'pulse 3s ease-in-out infinite'
        }}
      />
      <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-primary/30 rounded-tl-lg" />
      <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-primary/30 rounded-tr-lg" />
      <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-primary/30 rounded-bl-lg" />
      <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-primary/30 rounded-br-lg" />
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
        componentType="text-and-image"
        onAIContent={handleAIContent}
      />

      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="relative z-10" style={{ animation: 'slideIn 0.8s ease-out' }}>
            <EditableContent
              isEditing={isEditing}
              isPreview={isPreview}
              content={isEditing ? editedContent : content}
              onContentChange={handleContentChange}
            />
          </div>

          {/* Image Section */}
          <div className="relative" style={{ animation: 'fadeIn 0.8s ease-out' }}>
            <div className="relative">
              <ImageUploader
                imageUrl={isEditing ? editedContent.imageUrl : content.imageUrl}
                onImageChange={handleImageChange}
                isEditing={isEditing}
                isPreview={isPreview}
                aspectRatio="aspect-[4/3]"
                className="shadow-2xl"
              />
              <ImageDecorationLayer />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </SectionWrapper>
  )
}

export default TextAndImage