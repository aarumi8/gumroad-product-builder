import { Edit2, Check, Trash2, Upload } from "lucide-react"
import { useState, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useComponents } from "@/context/component-context"
import Image from "next/image"

interface TwoImagesHeroProps {
  id: string;
  initialData?: {
    title: string;
    subtitle: string;
    buttonText: string;
    images: string[];
  };
}

export function TwoImagesHero({ id, initialData }: TwoImagesHeroProps)  {
    const { deleteComponent } = useComponents()
    const fileInputRefs = useRef<(HTMLInputElement | null)[]>([null, null])
    const [isEditing, setIsEditing] = useState(false)
    const [content, setContent] = useState({
      title: initialData?.title || "Create & Innovate",
      subtitle: initialData?.subtitle || "Design stunning websites with our drag-and-drop builder. Perfect for businesses, portfolios, and personal projects.",
      buttonText: initialData?.buttonText || "Start Building",
      images: initialData?.images || ["", ""]
    })
    const [editedContent, setEditedContent] = useState(content)
  
    const handleImageClick = (index: number) => {
      if (!isEditing) return
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
  
    return (
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-gray-50 to-white">
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute right-0 top-0 h-[300px] w-[300px] opacity-20 blur-2xl bg-gradient-to-br from-primary to-purple-400 rounded-full" />
          <div className="absolute left-0 bottom-0 h-[400px] w-[400px] opacity-10 blur-3xl bg-gradient-to-tr from-blue-400 to-primary rounded-full" />
        </div>
  
        {/* Hidden file inputs */}
        {[0, 1].map((index) => (
          <input
            key={index}
            type="file"
            ref={(el) => fileInputRefs.current[index] = el}
            className="hidden"
            accept="image/*"
            onChange={(e) => handleImageChange(index, e)}
          />
        ))}
  
        {/* Control Buttons */}
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
            onClick={isEditing ? () => { setContent(editedContent); setIsEditing(false); } : () => { setEditedContent(content); setIsEditing(true); }}
          >
            {isEditing ? <Check className="h-4 w-4" /> : <Edit2 className="h-4 w-4" />}
          </Button>
        </div>
  
        <div className="max-w-7xl mx-auto">
          {/* Text Content */}
          <div className="text-center max-w-3xl mx-auto relative z-10 mb-16">
            {isEditing ? (
              <div className="space-y-6">
                <Input
                  value={editedContent.title}
                  onChange={(e) => setEditedContent({ ...editedContent, title: e.target.value })}
                  className="text-3xl font-bold text-center"
                  placeholder="Enter title..."
                />
                <Textarea
                  value={editedContent.subtitle}
                  onChange={(e) => setEditedContent({ ...editedContent, subtitle: e.target.value })}
                  className="text-center"
                  placeholder="Enter subtitle..."
                />
                <Input
                  value={editedContent.buttonText}
                  onChange={(e) => setEditedContent({ ...editedContent, buttonText: e.target.value })}
                  className="text-center"
                  placeholder="Button text..."
                />
              </div>
            ) : (
              <>
                <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 leading-tight mb-6">
                  {content.title}
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed mb-8">
                  {content.subtitle}
                </p>
                <Button size="lg" className="text-lg px-8">
                  {content.buttonText}
                </Button>
              </>
            )}
          </div>
  
          {/* Images */}
          <div className="grid md:grid-cols-2 gap-8 relative z-10">
            {(isEditing ? editedContent.images : content.images).map((imageUrl, index) => (
              <div key={index} className="relative">
                <div 
                  className={`aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 shadow-xl ${isEditing ? 'cursor-pointer' : ''}`}
                  onClick={() => handleImageClick(index)}
                >
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={`Hero image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 gap-3">
                      <Upload className="h-12 w-12" />
                      {isEditing && <p className="text-sm">Click to upload image</p>}
                    </div>
                  )}
                </div>
                {/* Decorative elements */}
                <div className={`absolute -top-3 -right-3 -bottom-3 -left-3 bg-gradient-to-br ${index === 0 ? 'from-primary/20 to-purple-400/20' : 'from-blue-400/20 to-primary/20'} rounded-2xl -z-10`} />
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }