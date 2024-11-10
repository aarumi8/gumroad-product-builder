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

  // Get current component's content from context
  const currentComponent = components.find(comp => comp.id === id)
  const defaultContent = {
    title: initialData?.title || "Transform Your Workflow",
    description: initialData?.description || "Our platform provides powerful tools and features that help you streamline your work process, increase productivity, and achieve better results. Experience the difference with our innovative solutions.",
    imageUrl: initialData?.imageUrl || "",
  }

  // Use content from context if available, otherwise use default
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
    <section className="relative py-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100">
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
          <div className="absolute right-4 top-4 flex items-center gap-2 bg-white">
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
          <div className="space-y-6">
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
              <>
                <h2 className="text-3xl font-bold text-gray-900">{content.title}</h2>
                <p className="text-lg text-gray-600 leading-relaxed">{content.description}</p>
              </>
            )}
          </div>

          {/* Image */}
          <div 
            className={`aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden relative ${isEditing && !isPreview ? 'cursor-pointer hover:bg-gray-200 transition-colors' : ''}`}
            onClick={handleImageClick}
          >
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
        </div>
      </div>
    </section>
  )
}