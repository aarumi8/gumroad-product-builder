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

  const currentComponent = components.find(comp => comp.id === id)
  const defaultContent: ContentType = {
    title: initialData?.title || "Our Gallery",
    description: initialData?.description || "Discover our collection of stunning visuals that showcase our work.",
    images: initialData?.images || ["", "", "", ""]
  }

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

  const currentImages = isEditing && !isPreview ? editedContent.images : content.images

  // Generate gradient colors for each image box
  const getGradientColor = (index: number) => {
    const gradients = [
      'from-blue-500/20 to-purple-500/20',
      'from-rose-500/20 to-orange-500/20',
      'from-emerald-500/20 to-cyan-500/20',
      'from-amber-500/20 to-yellow-500/20'
    ]
    return gradients[index % gradients.length]
  }

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100 overflow-hidden">
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
          {/* Grid Images */}
          <div className="grid grid-cols-2 gap-6 relative">
            {currentImages.map((imageUrl, index) => (
              <div
                key={index}
                className="relative group"
                style={{
                  animation: `fadeIn 0.6s ease-out forwards`,
                  animationDelay: `${index * 0.2}s`
                }}
              >
                {/* Background gradient animation */}
                <div 
                  className={`absolute -inset-2 bg-gradient-to-r ${getGradientColor(index)} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg`}
                />
                <div
                  className={`
                    relative aspect-square rounded-xl overflow-hidden
                    ${isEditing && !isPreview ? 'cursor-pointer' : ''}
                    bg-gray-100 shadow-lg transition-transform duration-300
                    hover:scale-[1.02] hover:-translate-y-1
                  `}
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
                  
                  {/* Decorative corner accents */}
                  <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-white/30 rounded-tl-lg" />
                  <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-white/30 rounded-tr-lg" />
                  <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-white/30 rounded-bl-lg" />
                  <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-white/30 rounded-br-lg" />
                </div>
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
              <div 
                className="relative"
                style={{
                  animation: 'slideIn 0.8s ease-out'
                }}
              >
                <div className="relative inline-block">
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
                <p className="text-lg text-gray-600 leading-relaxed mt-8">
                  {content.description}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes moveUpDown {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-20px) scale(1.1); }
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

export default GridImagesAndText;