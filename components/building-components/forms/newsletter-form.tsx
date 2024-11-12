import React, { useState, useEffect } from 'react'
import { Mail } from 'lucide-react'
import { useComponentEditor } from '@/hooks/useComponentEditor'
import { EditorControls } from '@/components/building-blocks/editor-controls'
import { BackgroundGradients } from '@/components/building-blocks/background-gradients'
import { SectionWrapper } from '@/components/building-blocks/section-wrapper'
import { EditableContent } from '@/components/building-blocks/editable-content'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface NewsletterContent {
  title: string
  subtitle: string
  buttonText: string
  placeholder: string
}

interface NewsletterFormProps {
  id: string
  initialData?: NewsletterContent
  isPreview?: boolean
}

export function NewsletterForm({ id, initialData, isPreview }: NewsletterFormProps) {
  const [isFocused, setIsFocused] = useState(false)

  const defaultContent: NewsletterContent = {
    title: "Subscribe to Our Newsletter",
    subtitle: "Stay up to date with the latest news, announcements, and articles.",
    buttonText: "Subscribe",
    placeholder: "Enter your email"
  }

  const {
    content,
    editedContent,
    isEditing,
    setEditedContent,
    saveChanges,
    startEditing,
    deleteComponent
  } = useComponentEditor<NewsletterContent>({
    id,
    defaultContent,
    initialData
  })

  // Debug effect to monitor state changes
  useEffect(() => {
    console.log('Current editing state:', isEditing)
    console.log('Current edited content:', editedContent)
    console.log('Current content:', content)
  }, [isEditing, editedContent, content])

  const handleAIContent = (aiContent: any) => {
    console.log('Step 1 - Raw AI content received:', aiContent)
    
    if (!aiContent || typeof aiContent !== 'object') {
      console.error('Invalid AI content received:', aiContent)
      return
    }

    // First, start editing mode
    startEditing()

    // Then format and set the content
    const formattedContent: NewsletterContent = {
      title: aiContent.title || defaultContent.title,
      subtitle: aiContent.subtitle || aiContent.description || defaultContent.subtitle,
      buttonText: aiContent.buttonText || defaultContent.buttonText,
      placeholder: aiContent.placeholder || defaultContent.placeholder
    }

    console.log('Step 2 - Formatted content:', formattedContent)

    // Force a new object reference to ensure React detects the change
    setEditedContent({...formattedContent})
    
    console.log('Step 3 - EditedContent after update:', editedContent)
  }

  const handleContentChange = (key: keyof NewsletterContent, value: string) => {
    console.log('Content change:', key, value)
    setEditedContent(prev => ({ ...prev, [key]: value }))
  }

  const EmailInput = () => {
    const currentContent = isEditing ? editedContent : content
    console.log('Email Input current content:', currentContent)
    
    if (isEditing && !isPreview) {
      return (
        <Input
          value={editedContent.placeholder}
          onChange={(e) => handleContentChange('placeholder', e.target.value)}
          className="border-0 bg-transparent"
          placeholder="Enter placeholder text..."
        />
      )
    }

    return (
      <input
        type="email"
        placeholder={currentContent.placeholder}
        className="flex-1 py-2 px-3 bg-transparent border-0 outline-none text-gray-900 placeholder-gray-500"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    )
  }

  const SubmitButton = () => {
    const currentContent = isEditing ? editedContent : content
    console.log('Submit Button current content:', currentContent)
    
    if (isEditing && !isPreview) {
      return (
        <Input
          value={editedContent.buttonText}
          onChange={(e) => handleContentChange('buttonText', e.target.value)}
          className="sm:w-auto"
          placeholder="Button text..."
        />
      )
    }

    return (
      <Button 
        className="group h-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 transition-all duration-300"
      >
        {currentContent.buttonText}
        <svg
          className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          />
        </svg>
      </Button>
    )
  }

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
        componentType="newsletter-form"
        onAIContent={handleAIContent}
      />

      <div className="max-w-4xl mx-auto">
        <div className="max-w-2xl mx-auto text-center">
          {/* Title Section */}
          <div className="mb-8">
            <EditableContent
              isEditing={isEditing}
              isPreview={isPreview}
              content={{
                title: isEditing ? editedContent.title : content.title,
                subtitle: isEditing ? editedContent.subtitle : content.subtitle
              }}
              onContentChange={handleContentChange}
            />
          </div>

          {/* Form Section */}
          <div 
            className="max-w-md mx-auto"
            style={{
              animation: 'slideUp 0.8s ease-out'
            }}
          >
            <form 
              onSubmit={(e) => e.preventDefault()} 
              className="relative flex flex-col sm:flex-row gap-3"
            >
              {/* Email Input Container */}
              <div className="relative flex-1">
                <div className={cn(
                  "absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-lg blur opacity-0 transition-opacity duration-300",
                  isFocused && "opacity-100"
                )} />
                <div className="relative bg-white border-2 border-gray-200 rounded-lg flex items-center transition-colors duration-300">
                  <Mail className={cn(
                    "ml-3 h-5 w-5 transition-colors duration-300",
                    isFocused ? 'text-primary' : 'text-gray-400'
                  )} />
                  <EmailInput />
                </div>
              </div>

              {/* Submit Button */}
              <SubmitButton />
            </form>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}

export default NewsletterForm