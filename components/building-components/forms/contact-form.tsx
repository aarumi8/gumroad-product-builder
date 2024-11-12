import React, { useState } from 'react'
import { Mail, User, MessageSquare, ArrowRight } from 'lucide-react'
import { useComponentEditor } from '@/hooks/useComponentEditor'
import { EditorControls } from '@/components/building-blocks/editor-controls'
import { BackgroundGradients } from '@/components/building-blocks/background-gradients'
import { SectionWrapper } from '@/components/building-blocks/section-wrapper'
import { EditableContent } from '@/components/building-blocks/editable-content'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface FormContent {
  title: string
  subtitle: string
  buttonText: string
  namePlaceholder: string
  emailPlaceholder: string
  messagePlaceholder: string
}

interface ContactFormProps {
  id: string
  initialData?: FormContent
  isPreview?: boolean
}

export function ContactForm({ id, initialData, isPreview }: ContactFormProps) {
  const [focusedField, setFocusedField] = useState<string | null>(null)
  
  const defaultContent: FormContent = {
    title: "Get in Touch",
    subtitle: "Have any questions? We'd love to hear from you.",
    buttonText: "Send Message",
    namePlaceholder: "Your Name",
    emailPlaceholder: "Email Address",
    messagePlaceholder: "Your Message"
  }

  const {
    content,
    editedContent,
    isEditing,
    setEditedContent,
    saveChanges,
    startEditing,
    deleteComponent
  } = useComponentEditor<FormContent>({
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

    // First, start editing mode
    startEditing()

    // Format the content with fallbacks
    const formattedContent: FormContent = {
      title: aiContent.title || defaultContent.title,
      subtitle: aiContent.subtitle || aiContent.description || defaultContent.subtitle,
      buttonText: aiContent.buttonText || defaultContent.buttonText,
      namePlaceholder: aiContent.namePlaceholder || defaultContent.namePlaceholder,
      emailPlaceholder: aiContent.emailPlaceholder || defaultContent.emailPlaceholder,
      messagePlaceholder: aiContent.messagePlaceholder || defaultContent.messagePlaceholder
    }

    console.log('Formatted content:', formattedContent)
    setEditedContent({...formattedContent})
  }

  const handleContentChange = (key: keyof FormContent, value: string) => {
    setEditedContent(prev => ({ ...prev, [key]: value }))
  }

  // Input field configuration
  const getInputFields = () => {
    const currentContent = isEditing ? editedContent : content
    
    return [
      {
        name: 'name',
        placeholder: currentContent.namePlaceholder,
        icon: User,
        type: 'text',
        editKey: 'namePlaceholder'
      },
      {
        name: 'email',
        placeholder: currentContent.emailPlaceholder,
        icon: Mail,
        type: 'email',
        editKey: 'emailPlaceholder'
      },
      {
        name: 'message',
        placeholder: currentContent.messagePlaceholder,
        icon: MessageSquare,
        type: 'textarea',
        editKey: 'messagePlaceholder'
      }
    ]
  }

  const InputField = ({ 
    name, 
    placeholder, 
    icon: Icon, 
    type,
    editKey 
  }: { 
    name: string
    placeholder: string
    icon: React.ElementType
    type: string
    editKey: keyof FormContent
  }) => {
    const isFocused = focusedField === name
    const isTextarea = type === 'textarea'
    
    if (isEditing && !isPreview) {
      return (
        <div className="relative group">
          <Icon 
            className={cn(
              "absolute left-3 top-3.5 h-5 w-5",
              isFocused ? 'text-primary' : 'text-gray-400'
            )} 
          />
          <input
            type="text"
            value={editedContent[editKey]}
            onChange={(e) => handleContentChange(editKey, e.target.value)}
            className={cn(
              "w-full bg-white dark:bg-gray-900 border-2 transition-all duration-300",
              "rounded-lg pl-10 pr-4 py-3 outline-none",
              isFocused ? 'border-primary/50 shadow-lg shadow-primary/20' : 'border-gray-200'
            )}
            placeholder={`Enter ${name} placeholder text...`}
            onFocus={() => setFocusedField(name)}
            onBlur={() => setFocusedField(null)}
          />
        </div>
      )
    }

    return isTextarea ? (
      <div className="relative group">
        <Icon 
          className={cn(
            "absolute left-3 top-3.5 h-5 w-5 transition-colors duration-300",
            isFocused ? 'text-primary' : 'text-gray-400'
          )} 
        />
        <textarea
          placeholder={placeholder}
          className={cn(
            "w-full bg-white dark:bg-gray-900 border-2 transition-all duration-300",
            "rounded-lg pl-10 pr-4 py-3 outline-none min-h-[120px] resize-none",
            isFocused && 'border-primary/50 shadow-lg shadow-primary/20',
            !isFocused && 'border-gray-200'
          )}
          onFocus={() => setFocusedField(name)}
          onBlur={() => setFocusedField(null)}
        />
      </div>
    ) : (
      <div className="relative group">
        <Icon 
          className={cn(
            "absolute left-3 top-3.5 h-5 w-5 transition-colors duration-300",
            isFocused ? 'text-primary' : 'text-gray-400'
          )} 
        />
        <input
          type={type}
          placeholder={placeholder}
          className={cn(
            "w-full bg-white dark:bg-gray-900 border-2 transition-all duration-300",
            "rounded-lg pl-10 pr-4 py-3 outline-none",
            isFocused && 'border-primary/50 shadow-lg shadow-primary/20',
            !isFocused && 'border-gray-200'
          )}
          onFocus={() => setFocusedField(name)}
          onBlur={() => setFocusedField(null)}
        />
      </div>
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
        componentType="contact-form"
        onAIContent={handleAIContent}
      />

      <div className="max-w-4xl mx-auto">
        {/* Title Section */}
        <div className="max-w-xl mx-auto text-center mb-12">
          <EditableContent
            isEditing={isEditing}
            isPreview={isPreview}
            content={{
              title: isEditing ? editedContent.title : content.title,
              subtitle: isEditing ? editedContent.subtitle : content.subtitle,
              buttonText: isEditing ? editedContent.buttonText : content.buttonText
            }}
            onContentChange={handleContentChange}
          />
        </div>

        {/* Form Section */}
        <div className="relative max-w-lg mx-auto">
          <div 
            className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-xl"
            style={{
              animation: 'fadeIn 0.8s ease-out'
            }}
          >
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              {/* Render input fields */}
              {getInputFields().map((field) => (
                <InputField 
                  key={field.name} 
                  {...field} 
                />
              ))}

              {/* Submit Button */}
              {isEditing && !isPreview ? (
                <input
                  type="text"
                  value={editedContent.buttonText}
                  onChange={(e) => handleContentChange('buttonText', e.target.value)}
                  className="w-full p-3 border-2 rounded-lg"
                  placeholder="Enter button text..."
                />
              ) : (
                <Button 
                  className="w-full group bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 transition-all duration-300"
                >
                  <span className="flex items-center justify-center gap-2">
                    {content.buttonText}
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              )}
            </form>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}

export default ContactForm