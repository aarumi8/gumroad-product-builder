import { Edit2, Check, Trash2, Mail } from "lucide-react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useComponents } from "@/context/component-context"

interface NewsletterFormProps {
  id: string;
  initialData?: {
    title: string;
    subtitle: string;
    buttonText: string;
    placeholder?: string;
  };
  isPreview?: boolean;
}

export function NewsletterForm({ id, initialData, isPreview }: NewsletterFormProps) {
  const { deleteComponent, updateComponentContent, components } = useComponents()
  const [isEditing, setIsEditing] = useState(false)

  // Get current component's content from context
  const currentComponent = components.find(comp => comp.id === id)
  const defaultContent = {
    title: initialData?.title || "Subscribe to Our Newsletter",
    subtitle: initialData?.subtitle || "Stay up to date with the latest news, announcements, and articles.",
    buttonText: initialData?.buttonText || "Subscribe",
    placeholder: initialData?.placeholder || "Enter your email",
  }
  
  // Use content from context if available, otherwise use default
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
    <section className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 border-b border-gray-100">
      <div className="max-w-4xl mx-auto">
        {/* Control Buttons */}
        {!isPreview && (
          <div className="absolute right-4 top-4 flex items-center gap-2 bg-gray-50">
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

        <div className="max-w-2xl mx-auto text-center">
          {isEditing && !isPreview ? (
            <div className="space-y-4 mb-8">
              <Input
                value={editedContent.title}
                onChange={(e) => setEditedContent({ ...editedContent, title: e.target.value })}
                className="text-center text-xl font-bold"
                placeholder="Enter title..."
              />
              <Input
                value={editedContent.subtitle}
                onChange={(e) => setEditedContent({ ...editedContent, subtitle: e.target.value })}
                className="text-center"
                placeholder="Enter subtitle..."
              />
            </div>
          ) : (
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900">{content.title}</h2>
              <p className="mt-4 text-lg text-gray-500">{content.subtitle}</p>
            </div>
          )}

          <form 
            onSubmit={(e) => e.preventDefault()} 
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <div className="relative flex-1">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              {isEditing && !isPreview ? (
                <Input
                  value={editedContent.placeholder}
                  onChange={(e) => setEditedContent({ ...editedContent, placeholder: e.target.value })}
                  className="pl-10"
                  placeholder="Enter placeholder text..."
                />
              ) : (
                <Input placeholder={content.placeholder} className="pl-10" type="email" />
              )}
            </div>
            {isEditing && !isPreview ? (
              <Input
                value={editedContent.buttonText}
                onChange={(e) => setEditedContent({ ...editedContent, buttonText: e.target.value })}
                className="w-auto sm:w-32"
                placeholder="Button text..."
              />
            ) : (
              <Button className="sm:w-32">{content.buttonText}</Button>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}