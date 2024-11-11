import { Edit2, Check, Trash2, Mail, User, MessageSquare, ArrowRight } from "lucide-react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useComponents } from "@/context/component-context"

interface ContactFormProps {
  id: string;
  initialData?: {
    title: string;
    subtitle: string;
    buttonText: string;
  };
  isPreview?: boolean;
}

export function ContactForm({ id, initialData, isPreview }: ContactFormProps) {
  const { deleteComponent, updateComponentContent, components } = useComponents()
  const [isEditing, setIsEditing] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  
  const currentComponent = components.find(comp => comp.id === id)
  const defaultContent = {
    title: initialData?.title || "Get in Touch",
    subtitle: initialData?.subtitle || "Have any questions? We'd love to hear from you.",
    buttonText: initialData?.buttonText || "Send Message"
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

  const inputClasses = (fieldName: string) => `
    w-full bg-white dark:bg-gray-900 border-2 transition-all duration-300
    ${focusedField === fieldName ? 'border-primary/50 shadow-lg shadow-primary/20' : 'border-gray-200'}
    rounded-lg pl-10 pr-4 py-3 outline-none
  `

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

        <div className="max-w-xl mx-auto text-center mb-12">
          {isEditing && !isPreview ? (
            <div className="space-y-4">
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
              <p className="mt-4 text-lg text-gray-600">{content.subtitle}</p>
            </div>
          )}
        </div>

        <div className="relative max-w-lg mx-auto">
          <div 
            className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-xl"
            style={{
              animation: 'fadeIn 0.8s ease-out'
            }}
          >
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="relative group">
                <User className={`absolute left-3 top-3.5 h-5 w-5 transition-colors duration-300 ${focusedField === 'name' ? 'text-primary' : 'text-gray-400'}`} />
                <input
                  placeholder="Your Name"
                  className={inputClasses('name')}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                />
              </div>
              
              <div className="relative group">
                <Mail className={`absolute left-3 top-3.5 h-5 w-5 transition-colors duration-300 ${focusedField === 'email' ? 'text-primary' : 'text-gray-400'}`} />
                <input
                  type="email"
                  placeholder="Email Address"
                  className={inputClasses('email')}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                />
              </div>

              <div className="relative group">
                <MessageSquare className={`absolute left-3 top-3.5 h-5 w-5 transition-colors duration-300 ${focusedField === 'message' ? 'text-primary' : 'text-gray-400'}`} />
                <textarea 
                  placeholder="Your Message" 
                  className={`${inputClasses('message')} min-h-[120px] resize-none`}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                />
              </div>

              {isEditing && !isPreview ? (
                <Input
                  value={editedContent.buttonText}
                  onChange={(e) => setEditedContent({ ...editedContent, buttonText: e.target.value })}
                  className="w-full"
                  placeholder="Button text..."
                />
              ) : (
                <Button 
                  className="w-full group bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 transition-all duration-300"
                >
                  <span className="flex items-center justify-center gap-2">
                    {content.buttonText}
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
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

        @keyframes expandWidth {
          from { width: 0; }
          to { width: 100px; }
        }
      `}</style>
    </section>
  )
}

export default ContactForm;