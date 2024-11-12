import React from 'react'
import { User } from 'lucide-react'
import { useComponentEditor } from '@/hooks/useComponentEditor'
import { EditorControls } from '@/components/building-blocks/editor-controls'
import { BackgroundGradients } from '@/components/building-blocks/background-gradients'
import { SectionWrapper } from '@/components/building-blocks/section-wrapper'
import { EditableContent } from '@/components/building-blocks/editable-content'
import { cn } from '@/lib/utils'

interface TestimonialContent {
  text: string
  author: string
  role: string
}

interface SingleTestimonialProps {
  id: string
  initialData?: TestimonialContent
  isPreview?: boolean
}

export function SingleTestimonial({ id, initialData, isPreview }: SingleTestimonialProps) {
  const defaultContent: TestimonialContent = {
    text: "The product exceeded my expectations. The interface is intuitive, and the features are exactly what I needed.",
    author: "Sarah Johnson",
    role: "Product Designer"
  }

  const {
    content,
    editedContent,
    isEditing,
    setEditedContent,
    saveChanges,
    startEditing,
    deleteComponent
  } = useComponentEditor<TestimonialContent>({
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
    const formattedContent: TestimonialContent = {
      text: aiContent.text || defaultContent.text,
      author: aiContent.author || defaultContent.author,
      role: aiContent.role || defaultContent.role
    }

    console.log('Formatted content:', formattedContent)
    setEditedContent({...formattedContent})
  }

  const handleContentChange = (key: keyof TestimonialContent, value: string) => {
    setEditedContent(prev => ({ ...prev, [key]: value }))
  }

  // Section Title Component
  const SectionTitle = () => (
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold text-gray-900 relative inline-block">
        What People Say
        <div 
          className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary/60 to-purple-500/60 rounded-full"
          style={{
            animation: 'expandWidth 0.8s ease-out forwards',
            animationDelay: '0.4s'
          }}
        />
      </h2>
      <p className="mt-4 text-lg text-gray-500">
        Hear from our satisfied customers
      </p>
    </div>
  )

  // Testimonial Bubble Component
  const TestimonialBubble = () => {
    const currentContent = isEditing ? editedContent : content

    return (
      <div 
        className="relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg"
        style={{
          animation: 'float 6s ease-in-out infinite'
        }}
      >
        <EditableContent
          isEditing={isEditing}
          isPreview={isPreview}
          content={{
            description: currentContent.text,
          }}
          onContentChange={(_, value) => handleContentChange('text', value)}
        />

        <div className="flex items-center gap-4 mt-6">
          <AvatarIcon />
          <AuthorInfo />
        </div>

        <BubbleTail />
      </div>
    )
  }

  // Avatar Icon Component
  const AvatarIcon = () => (
    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shadow-lg">
      <User className="h-6 w-6 text-white" />
    </div>
  )

  // Author Info Component
  const AuthorInfo = () => {
    const currentContent = isEditing ? editedContent : content

    return (
      <div>
        <EditableContent
          isEditing={isEditing}
          isPreview={isPreview}
          content={{
            title: currentContent.author,
            subtitle: currentContent.role
          }}
          onContentChange={(key, value) => {
            handleContentChange(
              key === 'title' ? 'author' : 'role',
              value
            )
          }}
        />
      </div>
    )
  }

  // Bubble Tail Component
  const BubbleTail = () => (
    <div 
      className={cn(
        "absolute -bottom-3 left-1/2 -translate-x-1/2",
        "w-6 h-6 bg-gradient-to-br from-white to-gray-50",
        "rotate-45 shadow-lg"
      )} 
    />
  )

  return (
    <SectionWrapper>
      {/* Complex gradient background with multiple layers */}
      <BackgroundGradients colors={{
        first: 'from-violet-500/20 to-purple-500/20',
        second: 'from-blue-500/20 to-cyan-500/20'
      }}>
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-rose-500/10 to-orange-500/10 rounded-full mix-blend-multiply blur-3xl"
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
        componentType="testimonial-1"
        onAIContent={handleAIContent}
      />

      <div className="max-w-4xl mx-auto">
        <SectionTitle />

        <div className="relative max-w-2xl mx-auto">
          <TestimonialBubble />
        </div>
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

export default SingleTestimonial