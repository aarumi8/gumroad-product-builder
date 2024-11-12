import React from 'react'
import { User } from 'lucide-react'
import { useComponentEditor } from '@/hooks/useComponentEditor'
import { EditorControls } from '@/components/building-blocks/editor-controls'
import { BackgroundGradients } from '@/components/building-blocks/background-gradients'
import { SectionWrapper } from '@/components/building-blocks/section-wrapper'
import { EditableContent } from '@/components/building-blocks/editable-content'
import { cn } from '@/lib/utils'

interface Testimonial {
  text: string
  author: string
}

interface TestimonialsContent {
  testimonials: Testimonial[]
}

interface ThreeTestimonialsProps {
  id: string
  initialData?: TestimonialsContent
  isPreview?: boolean
}

export function ThreeTestimonials({ id, initialData, isPreview }: ThreeTestimonialsProps) {
  const defaultContent: TestimonialsContent = {
    testimonials: [
      {
        text: "This product has completely transformed how we work. The efficiency gains are remarkable.",
        author: "Alex Chen"
      },
      {
        text: "Outstanding support team and regular updates. They really listen to user feedback.",
        author: "Maria Garcia"
      },
      {
        text: "Intuitive interface and powerful features. Exactly what our team needed.",
        author: "James Wilson"
      }
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
  } = useComponentEditor<TestimonialsContent>({
    id,
    defaultContent,
    initialData
  })

  const handleAIContent = (aiContent: any) => {
    console.log('Raw AI content received:', aiContent)
    
    if (!aiContent?.testimonials || !Array.isArray(aiContent.testimonials)) {
      console.error('Invalid AI content received:', aiContent)
      return
    }

    // Start editing mode
    startEditing()

    // Format the content with fallbacks
    const formattedContent: TestimonialsContent = {
      testimonials: aiContent.testimonials.map((t: any, index: number) => ({
        text: t.text || defaultContent.testimonials[index].text,
        author: t.author || defaultContent.testimonials[index].author
      }))
    }

    console.log('Formatted content:', formattedContent)
    setEditedContent({...formattedContent})
  }

  const handleTestimonialChange = (index: number, field: keyof Testimonial, value: string) => {
    const newTestimonials = [...editedContent.testimonials]
    newTestimonials[index] = { 
      ...newTestimonials[index], 
      [field]: value 
    }
    setEditedContent({ testimonials: newTestimonials })
  }

  // Section Title Component
  const SectionTitle = () => (
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold text-gray-900">Customer Reviews</h2>
      <p className="mt-4 text-lg text-gray-500">What our clients have to say</p>
    </div>
  )

  // Individual Testimonial Card Component
  const TestimonialCard = ({ testimonial, index }: { testimonial: Testimonial; index: number }) => {
    const isEditMode = isEditing && !isPreview
    const currentTestimonial = isEditMode ? editedContent.testimonials[index] : testimonial

    return (
      <div 
        className="relative"
        style={{
          animation: 'float 6s ease-in-out infinite',
          animationDelay: `${-index * 2}s`
        }}
      >
        <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-lg h-full">
          {/* Testimonial Content */}
          <EditableContent
            isEditing={isEditing}
            isPreview={isPreview}
            content={{
              description: currentTestimonial.text,
            }}
            onContentChange={(_, value) => handleTestimonialChange(index, 'text', value)}
            className="mb-4"
          />

          {/* Author Info */}
          <AuthorInfo author={currentTestimonial.author} index={index} />

          <BubbleTail />
        </div>
      </div>
    )
  }

  // Author Info Component
  const AuthorInfo = ({ author, index }: { author: string; index: number }) => (
    <div className="flex items-center gap-3">
      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shadow-lg">
        <User className="h-5 w-5 text-white" />
      </div>
      <EditableContent
        isEditing={isEditing}
        isPreview={isPreview}
        content={{ title: author }}
        onContentChange={(_, value) => handleTestimonialChange(index, 'author', value)}
        className="font-medium text-gray-900"
      />
    </div>
  )

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
    <SectionWrapper className="py-16">
      {/* Complex gradient background with multiple layers */}
      <BackgroundGradients colors={{
        first: 'from-violet-500/20 to-purple-500/20',
        second: 'from-blue-500/20 to-cyan-500/20'
      }}>
        <div 
          className={cn(
            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
            "w-96 h-96 bg-gradient-to-br from-rose-500/10 to-orange-500/10",
            "rounded-full mix-blend-multiply blur-3xl"
          )}
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
        componentType="testimonial-2"
        onAIContent={handleAIContent}
      />

      <div className="max-w-4xl mx-auto">
        <SectionTitle />

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {(isEditing ? editedContent.testimonials : content.testimonials)
            .map((testimonial, index) => (
              <TestimonialCard
                key={index}
                testimonial={testimonial}
                index={index}
              />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </SectionWrapper>
  )
}

export default ThreeTestimonials