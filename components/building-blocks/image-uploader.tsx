import { useRef } from 'react'
import Image from 'next/image'
import { Upload } from 'lucide-react'

interface ImageUploaderProps {
  imageUrl: string
  onImageChange: (file: File) => void
  isEditing: boolean
  isPreview?: boolean
  aspectRatio?: string
  className?: string
}

export function ImageUploader({ 
  imageUrl, 
  onImageChange, 
  isEditing, 
  isPreview,
  aspectRatio = "aspect-video",
  className = ""
}: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageClick = () => {
    if (!isEditing || isPreview) return
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onImageChange(file)
    }
  }

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />
      <div 
        className={`${aspectRatio} rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 
          ${isEditing && !isPreview ? 'cursor-pointer' : ''} ${className}`}
        onClick={handleImageClick}
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt="Uploaded image"
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
    </>
  )
}