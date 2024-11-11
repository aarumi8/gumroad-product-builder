import { Edit2, Check, Trash2, Image as ImageIcon, Upload } from "lucide-react"
import { useState, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useComponents } from "@/context/component-context"
import Image from "next/image"

interface TextAndImageProps {
  id: string;
  initialData?: {
    title: string;
    description: string;
    imageUrl: string;
  };
  isPreview?: boolean;
}

export function TextAndImage({ id, initialData, isPreview }: TextAndImageProps) {
  const { deleteComponent, updateComponentContent, components } = useComponents()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isEditing, setIsEditing] = useState(false)

  const currentComponent = components.find(comp => comp.id === id)
  const defaultContent = {
    title: initialData?.title || "Transform Your Workflow",
    description: initialData?.description || "Our platform provides powerful tools and features that help you streamline your work process, increase productivity, and achieve better results. Experience the difference with our innovative solutions.",
    imageUrl: initialData?.imageUrl || ""
  }

  const content = currentComponent?.content || defaultContent
  const [editedContent, setEditedContent] = useState(content)

  const handleImageClick = () => {
    if (!isEditing || isPreview) return
    fileInputRef.current?.click()
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setEditedContent({ ...editedContent, imageUrl: reader.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  const saveChanges = () => {
    updateComponentContent(id, editedContent)
    setIsEditing(false)
  }

  const startEditing = () => {
    setEditedContent(content)
    setIsEditing(true)
  }

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full mix-blend-multiply blur-3xl"
          style={{
            animation: 'moveUpDown 8s ease-in-out infinite'
          }}
        />
        <div 
          className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-rose-500/10 to-orange-500/10 rounded-full mix-blend-multiply blur-3xl"
          style={{
            animation: 'moveUpDown 8s ease-in-out infinite',
            animationDelay: '-4s'
          }}
        />
      </div>

      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleImageChange}
      />

      <div className="max-w-6xl mx-auto">
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

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="relative z-10 space-y-6">
            {isEditing && !isPreview ? (
              <div className="space-y-4">
                <Input
                  value={editedContent.title}
                  onChange={(e) => setEditedContent({ ...editedContent, title: e.target.value })}
                  className="text-xl font-bold"
                  placeholder="Enter title..."
                />
                <Textarea
                  value={editedContent.description}
                  onChange={(e) => setEditedContent({ ...editedContent, description: e.target.value })}
                  className="min-h-[150px]"
                  placeholder="Enter description..."
                />
              </div>
            ) : (
              <div 
                className="relative"
                style={{
                  animation: 'slideIn 0.8s ease-out'
                }}
              >
                <div className="relative">
                  <h2 className="text-4xl font-bold text-gray-900 mb-6">
                    {content.title}
                  </h2>
                  {/* Animated underline */}
                  <div className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-primary/60 to-purple-500/60 rounded-full w-24" 
                    style={{
                      animation: 'expandWidth 0.8s ease-out forwards',
                      animationDelay: '0.4s'
                    }}
                  />
                </div>
                <p className="text-lg text-gray-600 leading-relaxed mt-8">{content.description}</p>
              </div>
            )}
          </div>

          {/* Image */}
          <div className="relative">
            {/* Decorative elements */}
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-2xl blur-lg -z-10"
              style={{
                animation: 'pulse 3s ease-in-out infinite'
              }}
            />
            <div 
              className={`
                relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 
                ${isEditing && !isPreview ? 'cursor-pointer hover:opacity-90 transition-opacity' : ''}
                shadow-2xl
              `}
              onClick={handleImageClick}
              style={{
                animation: 'fadeIn 0.8s ease-out'
              }}
            >
              <div className="aspect-[4/3]">
                {(isEditing && !isPreview ? editedContent.imageUrl : content.imageUrl) ? (
                  <Image
                    src={isEditing && !isPreview ? editedContent.imageUrl : content.imageUrl}
                    alt={content.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 gap-2">
                    <ImageIcon className="h-12 w-12" />
                    {isEditing && !isPreview && (
                      <>
                        <Upload className="h-6 w-6" />
                        <span className="text-sm">Click to upload image</span>
                      </>
                    )}
                  </div>
                )}
              </div>
              
              {/* Decorative corner accents */}
              <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-primary/30 rounded-tl-lg" />
              <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-primary/30 rounded-tr-lg" />
              <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-primary/30 rounded-bl-lg" />
              <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-primary/30 rounded-br-lg" />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes moveUpDown {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-20px) scale(1.1); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes expandWidth {
          from { width: 0; }
          to { width: 6rem; }
        }
      `}</style>
    </section>
  )
}

export default TextAndImage;