import React from 'react'
import { useComponentEditor } from '@/hooks/useComponentEditor'
import { EditorControls } from '@/components/building-blocks/editor-controls'
import { BackgroundGradients } from '@/components/building-blocks/background-gradients'
import { SectionWrapper } from '@/components/building-blocks/section-wrapper'
import { EditableContent } from '@/components/building-blocks/editable-content'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface GumroadContent {
  title: string
  description: string
  buttonText: string
  gumroadUrl: string
}

interface GradientCtaProps {
  id: string
  initialData?: GumroadContent
  isPreview?: boolean
}

export function GradientCta({ id, initialData, isPreview }: GradientCtaProps) {
  const [isModalOpen, setIsModalOpen] = React.useState(false)

  const defaultContent: GumroadContent = {
    title: "Ready to Transform Your Journey?",
    description: "Join thousands of creators who have already taken the leap. Start building your dream business today.",
    buttonText: "Buy →",
    gumroadUrl: "https://dvassallo.gumroad.com/l/small-bets"
  }

  const {
    content,
    editedContent,
    isEditing,
    setEditedContent,
    saveChanges,
    startEditing,
    deleteComponent
  } = useComponentEditor<GumroadContent>({
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

    // Start editing mode first
    startEditing()

    // Format the content with fallbacks
    const formattedContent: GumroadContent = {
      title: aiContent.title || defaultContent.title,
      description: aiContent.description || defaultContent.description,
      buttonText: aiContent.buttonText || defaultContent.buttonText,
      gumroadUrl: aiContent.gumroadUrl || defaultContent.gumroadUrl
    }

    console.log('Formatted content:', formattedContent)
    setEditedContent({...formattedContent})
  }

  const handleContentChange = (key: keyof GumroadContent, value: string) => {
    setEditedContent(prev => ({ ...prev, [key]: value }))
  }

  // URL Input Field - only shown in edit mode
  const UrlInput = () => {
    if (!isEditing || isPreview) return null

    return (
      <div className="mt-4">
        <Input
          value={editedContent.gumroadUrl}
          onChange={(e) => handleContentChange('gumroadUrl', e.target.value)}
          placeholder="Gumroad product URL..."
          className="text-center"
        />
      </div>
    )
  }

  // Gumroad Modal
  const GumroadModal = () => (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="max-w-4xl p-0 h-[90vh]">
        <DialogHeader className="px-6 py-4 border-b">
          <DialogTitle>Purchase Product</DialogTitle>
        </DialogHeader>
        <div className="w-full h-[calc(90vh-57px)]">
          <iframe 
            src={content.gumroadUrl}
            className="w-full h-full"
            frameBorder="0"
          />
        </div>
      </DialogContent>
    </Dialog>
  )

  return (
    <SectionWrapper className="py-16">
      <BackgroundGradients>
        {/* Additional animated background elements */}
        <div 
          className="absolute inset-0 overflow-hidden"
          style={{
            animation: 'pulse 3s ease-in-out infinite'
          }}
        >
          <div className="absolute -top-24 right-0 w-96 h-96 bg-gradient-to-br from-primary/20 to-purple-600/20 rounded-full mix-blend-multiply blur-3xl transform rotate-12" />
          <div className="absolute -bottom-24 left-0 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-primary/20 rounded-full mix-blend-multiply blur-3xl transform -rotate-12" />
        </div>
      </BackgroundGradients>

      <EditorControls
        isPreview={isPreview}
        isEditing={isEditing}
        onDelete={() => deleteComponent(id)}
        onEdit={startEditing}
        onSave={saveChanges}
        componentType="buy-button-1"
        onAIContent={handleAIContent}
      />

      <div className="max-w-3xl mx-auto text-center">
        <EditableContent
          isEditing={isEditing}
          isPreview={isPreview}
          content={isEditing ? editedContent : content}
          onContentChange={handleContentChange}
          buttonProps={{
            className: cn(
              "text-lg group relative px-8 py-6",
              "bg-gradient-to-r from-primary to-purple-600",
              "hover:from-primary/90 hover:to-purple-600/90",
              "transition-all duration-300"
            ),
            onClick: () => !isEditing && setIsModalOpen(true)
          }}
        />
        
        <UrlInput />
      </div>

      <GumroadModal />

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.8; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
      `}</style>
    </SectionWrapper>
  )
}

export default GradientCta