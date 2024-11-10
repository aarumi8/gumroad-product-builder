import { Edit2, Check, Trash2, Image as ImageIcon, Upload } from "lucide-react"
import { useState, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useComponents } from "@/context/component-context"
import Image from "next/image"

interface GridImagesAndTextProps {
  id: string;
  initialData?: {
    title: string;
    description: string;
    images: string[];
  };
  isPreview?: boolean;
}

interface ContentType {
  title: string;
  description: string;
  images: string[];
}

export function GridImagesAndText({ id, initialData, isPreview }: GridImagesAndTextProps) {
  const { deleteComponent, updateComponentContent, components } = useComponents()
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([null, null, null, null])
  const [isEditing, setIsEditing] = useState(false)

  // Get current component's content from context
  const currentComponent = components.find(comp => comp.id === id)
  const defaultContent: ContentType = {
    title: initialData?.title || "Our Gallery",
    description: initialData?.description || "Discover our collection of stunning visuals that showcase our work.",
    images: initialData?.images || ["", "", "", ""]
  }

  // Use content from context if available, otherwise use default
  const content = (currentComponent?.content || defaultContent) as ContentType
  const [editedContent, setEditedContent] = useState<ContentType>(content)

  const handleImageClick = (index: number) => {
    if (!isEditing || isPreview) return
    fileInputRefs.current[index]?.click()
  }

  const handleImageChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const newImages = [...editedContent.images]
        newImages[index] = reader.result as string
        setEditedContent({ ...editedContent, images: newImages })
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

  // Safely get current images
  const currentImages = isEditing && !isPreview ? editedContent.images : content.images

  return (
    <section className="relative py-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100">
      {/* Hidden file inputs */}
      {[0, 1, 2, 3].map((index) => (
        <input
          key={index}
          type="file"
          ref={(el) => fileInputRefs.current[index] = el}
          className="hidden"
          accept="image/*"
          onChange={(e) => handleImageChange(index, e)}
        />
      ))}

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
          {/* Grid Images */}
          <div className="grid grid-cols-2 gap-4">
            {currentImages.map((imageUrl, index) => (
              <div
                key={index}
                className={`aspect-square bg-gray-100 rounded-lg overflow-hidden relative ${isEditing && !isPreview ? 'cursor-pointer hover:bg-gray-200 transition-colors' : ''}`}
                onClick={() => handleImageClick(index)}
              >
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={`Gallery image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 gap-2">
                    <ImageIcon className="h-8 w-8" />
                    {isEditing && !isPreview && (
                      <>
                        <Upload className="h-4 w-4" />
                        <span className="text-xs">Upload</span>
                      </>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

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
        </div>
      </div>
    </section>
  )
}