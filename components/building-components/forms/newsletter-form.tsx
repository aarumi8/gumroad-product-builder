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
  const [isFocused, setIsFocused] = useState(false)

  // Get current component's content from context
  const currentComponent = components.find(comp => comp.id === id)
  const defaultContent = {
    title: initialData?.title || "Subscribe to Our Newsletter",
    subtitle: initialData?.subtitle || "Stay up to date with the latest news, announcements, and articles.",
    buttonText: initialData?.buttonText || "Subscribe",
    placeholder: initialData?.placeholder || "Enter your email"
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

      <div className="max-w-4xl mx-auto">
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
            <div 
              className="mb-8"
              style={{
                animation: 'fadeIn 0.8s ease-out'
              }}
            >
              <div className="relative inline-block">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">{content.title}</h2>
                {/* Animated underline */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-1 bg-gradient-to-r from-primary/60 to-purple-500/60 rounded-full"
                  style={{
                    animation: 'expandWidth 0.8s ease-out forwards',
                    animationDelay: '0.4s'
                  }}
                />
              </div>
              <p className="mt-6 text-lg text-gray-600">{content.subtitle}</p>
            </div>
          )}

          <div 
            className="max-w-md mx-auto"
            style={{
              animation: 'slideUp 0.8s ease-out'
            }}
          >
            <form 
              onSubmit={(e) => e.preventDefault()} 
              className="relative flex flex-col sm:flex-row gap-3"
            >
              <div className="relative flex-1">
                <div className={`
                  absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-lg blur opacity-0 transition-opacity duration-300
                  ${isFocused ? 'opacity-100' : ''}
                `} />
                <div className="relative bg-white border-2 border-gray-200 rounded-lg flex items-center transition-colors duration-300">
                  <Mail className={`ml-3 h-5 w-5 transition-colors duration-300 ${isFocused ? 'text-primary' : 'text-gray-400'}`} />
                  {isEditing && !isPreview ? (
                    <Input
                      value={editedContent.placeholder}
                      onChange={(e) => setEditedContent({ ...editedContent, placeholder: e.target.value })}
                      className="border-0 bg-transparent"
                      placeholder="Enter placeholder text..."
                    />
                  ) : (
                    <input
                      type="email"
                      placeholder={content.placeholder}
                      className="flex-1 py-2 px-3 bg-transparent border-0 outline-none text-gray-900 placeholder-gray-500"
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                    />
                  )}
                </div>
              </div>

              {isEditing && !isPreview ? (
                <Input
                  value={editedContent.buttonText}
                  onChange={(e) => setEditedContent({ ...editedContent, buttonText: e.target.value })}
                  className="sm:w-auto"
                  placeholder="Button text..."
                />
              ) : (
                <Button 
                  className="group h-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 transition-all duration-300"
                >
                  {content.buttonText}
                  <svg
                    className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </Button>
              )}
            </form>
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

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes expandWidth {
          from { width: 0; }
          to { width: 100px; }
        }
      `}</style>
    </section>
  )
}

export default NewsletterForm;