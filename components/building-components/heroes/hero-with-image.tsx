import { Edit2, Check, Trash2, Upload } from "lucide-react"
import { useState, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useComponents } from "@/context/component-context"
import Image from "next/image"

interface HeroWithImageProps {
  id: string;
  initialData?: {
    title: string;
    subtitle: string;
    buttonText: string;
    imageUrl?: string;
  };
  isPreview?: boolean;
}

export function HeroWithImage({ id, initialData, isPreview }: HeroWithImageProps) {
  const { deleteComponent, updateComponentContent, components } = useComponents()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isEditing, setIsEditing] = useState(false)

  // Get current component's content from context
  const currentComponent = components.find(comp => comp.id === id)
  const defaultContent = {
    title: initialData?.title || "Build Beautiful Websites Without Code",
    subtitle: initialData?.subtitle || "Transform your ideas into reality without writing a single line of code.",
    buttonText: initialData?.buttonText || "Get Started",
    imageUrl: initialData?.imageUrl || ""
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
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gray-50">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-0 top-0 h-[600px] w-[600px] opacity-20 blur-3xl -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-primary/40 to-purple-400 rounded-full" />
        <div className="absolute right-0 bottom-0 h-[400px] w-[400px] opacity-20 blur-3xl translate-x-1/3 translate-y-1/3 bg-gradient-to-l from-blue-400 to-primary/40 rounded-full" />
      </div>

      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleImageChange}
      />

      {/* Control Buttons */}
      {!isPreview && (
        <div className="absolute right-4 top-4 flex items-center gap-2 z-10">
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

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="relative z-10 space-y-8">
            {isEditing && !isPreview ? (
              <div className="space-y-6">
                <Input
                  value={editedContent.title}
                  onChange={(e) => setEditedContent({ ...editedContent, title: e.target.value })}
                  className="text-3xl font-bold"
                  placeholder="Enter title..."
                />
                <Textarea
                  value={editedContent.subtitle}
                  onChange={(e) => setEditedContent({ ...editedContent, subtitle: e.target.value })}
                  placeholder="Enter subtitle..."
                />
                <Input
                  value={editedContent.buttonText}
                  onChange={(e) => setEditedContent({ ...editedContent, buttonText: e.target.value })}
                  placeholder="Button text..."
                />
              </div>
            ) : (
              <>
                <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
                  {content.title}
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  {content.subtitle}
                </p>
                <Button size="lg" className="text-lg px-8">
                  {content.buttonText}
                </Button>
              </>
            )}
          </div>

          {/* Image Container */}
          <div className="relative z-10">
            <div 
              className={`aspect-[5/4] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 shadow-xl ${isEditing && !isPreview ? 'cursor-pointer' : ''}`}
              onClick={handleImageClick}
            >
              {(isEditing && !isPreview ? editedContent.imageUrl : content.imageUrl) ? (
                <Image
                  src={isEditing && !isPreview ? editedContent.imageUrl : content.imageUrl}
                  alt="Hero"
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 gap-3">
                  <Upload className="h-12 w-12" />
                  {isEditing && !isPreview && <p className="text-sm">Click to upload image</p>}
                </div>
              )}
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 -bottom-4 -left-4 bg-gradient-to-br from-primary/20 to-purple-400/20 rounded-2xl -z-10" />
            <div className="absolute -top-2 -right-2 -bottom-2 -left-2 bg-gradient-to-br from-primary/10 to-purple-400/10 rounded-2xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  )
}