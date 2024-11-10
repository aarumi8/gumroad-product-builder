// components/forms/ContactForm.tsx
import { Edit2, Check, Trash2, Mail, User, MessageSquare } from "lucide-react"
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
}

export function ContactForm({ id, initialData  }: ContactFormProps) {
  const { deleteComponent } = useComponents()
  const [isEditing, setIsEditing] = useState(false)
  const [content, setContent] = useState({
    title: initialData?.title || "Get in Touch",
    subtitle: initialData?.subtitle || "Have any questions? We'd love to hear from you.",
    buttonText: initialData?.buttonText || "Send Message"
  });
  const [editedContent, setEditedContent] = useState(content)

  const saveChanges = () => {
    setContent(editedContent)
    setIsEditing(false)
  }

  const startEditing = () => {
    setEditedContent({ ...content })
    setIsEditing(true)
  }

  return (
    <section className="relative py-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100">
      <div className="max-w-4xl mx-auto">
        {/* Control Buttons */}
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

        <div className="max-w-xl mx-auto text-center mb-12">
          {isEditing ? (
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
            <>
              <h2 className="text-3xl font-bold text-gray-900">{content.title}</h2>
              <p className="mt-4 text-lg text-gray-500">{content.subtitle}</p>
            </>
          )}
        </div>

        <div className="max-w-lg mx-auto">
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="relative">
              <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input placeholder="Your Name" className="pl-10" />
            </div>
            
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input type="email" placeholder="Email Address" className="pl-10" />
            </div>

            <div className="relative">
              <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Textarea 
                placeholder="Your Message" 
                className="min-h-[120px] pl-10 pt-2"
              />
            </div>

            {isEditing ? (
              <Input
                value={editedContent.buttonText}
                onChange={(e) => setEditedContent({ ...editedContent, buttonText: e.target.value })}
                className="w-auto"
                placeholder="Button text..."
              />
            ) : (
              <Button className="w-full">{content.buttonText}</Button>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}