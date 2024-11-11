// components/building-components/buy-buttons/gradient-cta.tsx
import { Edit2, Check, Trash2, ExternalLink } from "lucide-react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useComponents } from "@/context/component-context"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"

interface GradientCtaProps {
  id: string;
  initialData?: {
    title: string;
    description: string;
    buttonText: string;
    gumroadUrl: string;
  };
  isPreview?: boolean;
}

export function GradientCta({ id, initialData, isPreview }: GradientCtaProps) {
  const { deleteComponent, updateComponentContent, components } = useComponents()
  const [isEditing, setIsEditing] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const currentComponent = components.find(comp => comp.id === id)
  const defaultContent = {
    title: initialData?.title || "Ready to Transform Your Journey?",
    description: initialData?.description || "Join thousands of creators who have already taken the leap. Start building your dream business today.",
    buttonText: initialData?.buttonText || "Buy →",
    gumroadUrl: initialData?.gumroadUrl || "https://dvassallo.gumroad.com/l/small-bets"
  }

  const content = currentComponent?.content || defaultContent
  const [editedContent, setEditedContent] = useState(content)

  const saveChanges = () => {
    updateComponentContent(id, editedContent)
    setIsEditing(false)
  }

  const startEditing = () => {
    setEditedContent(content)
    setIsEditing(true)
  }

  return (
    <section className="relative py-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute -top-24 right-0 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full mix-blend-multiply blur-3xl"
          style={{
            animation: 'moveUpDown 8s ease-in-out infinite'
          }}
        />
        <div 
          className="absolute -bottom-24 left-0 w-96 h-96 bg-gradient-to-br from-rose-500/10 to-orange-500/10 rounded-full mix-blend-multiply blur-3xl"
          style={{
            animation: 'moveUpDown 8s ease-in-out infinite',
            animationDelay: '-4s'
          }}
        />
      </div>

      {/* Control Buttons */}
      {!isPreview && (
        <div className="absolute right-4 top-4 flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 text-gray-600 hover:text-red-500 hover:border-red-500"
            onClick={() => deleteComponent(id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className={`h-8 w-8 ${isEditing ? 'text-green-600 hover:text-green-700 hover:border-green-700' : 'text-gray-600 hover:text-gray-700'}`}
            onClick={isEditing ? saveChanges : startEditing}
          >
            {isEditing ? <Check className="h-4 w-4" /> : <Edit2 className="h-4 w-4" />}
          </Button>
        </div>
      )}

      <div className="max-w-3xl mx-auto text-center">
        {isEditing && !isPreview ? (
          <div className="space-y-4">
            <Input
              value={editedContent.title}
              onChange={(e) => setEditedContent({ ...editedContent, title: e.target.value })}
              className="text-center text-2xl font-bold"
              placeholder="Enter title..."
            />
            <Textarea
              value={editedContent.description}
              onChange={(e) => setEditedContent({ ...editedContent, description: e.target.value })}
              className="text-center"
              placeholder="Enter description..."
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                value={editedContent.buttonText}
                onChange={(e) => setEditedContent({ ...editedContent, buttonText: e.target.value })}
                placeholder="Button text..."
              />
              <Input
                value={editedContent.gumroadUrl}
                onChange={(e) => setEditedContent({ ...editedContent, gumroadUrl: e.target.value })}
                placeholder="Gumroad URL..."
              />
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">{content.title}</h2>
            <p className="text-lg text-gray-600">{content.description}</p>
            <Button 
              size="lg"
              className="text-lg group relative px-8 py-6 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 transition-all duration-300"
              onClick={() => setIsModalOpen(true)}
            >
              {content.buttonText}
              <span className="absolute inset-0 rounded-md bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Button>
          </div>
        )}
      </div>

      {/* Updated Gumroad Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl p-0 h-[90vh]"> {/* Removed default padding and increased height */}
          <DialogHeader className="px-6 py-4 border-b"> {/* Added padding to header specifically */}
            <DialogTitle>Purchase Product</DialogTitle>
          </DialogHeader>
          <div className="w-full h-[calc(90vh-57px)]"> {/* Calculate height by subtracting header height */}
            <iframe 
              src={content.gumroadUrl}
              className="w-full h-full"
              frameBorder="0"
            />
          </div>
        </DialogContent>
      </Dialog>

      <style jsx>{`
        @keyframes moveUpDown {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-20px) scale(1.1); }
        }
      `}</style>
    </section>
  )
}

export default GradientCta;