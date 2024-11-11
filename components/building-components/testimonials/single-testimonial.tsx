import { Edit2, Check, Trash2, User } from "lucide-react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useComponents } from "@/context/component-context"

interface SingleTestimonialProps {
  id: string;
  initialData?: {
    text: string;
    author: string;
    role: string;
  };
  isPreview?: boolean;
}

export function SingleTestimonial({ id, initialData, isPreview }: SingleTestimonialProps) {
  const { deleteComponent, updateComponentContent, components } = useComponents()
  const [isEditing, setIsEditing] = useState(false)

  const currentComponent = components.find(comp => comp.id === id)
  const defaultTestimonial = {
    text: initialData?.text || "The product exceeded my expectations. The interface is intuitive, and the features are exactly what I needed.",
    author: initialData?.author || "Sarah Johnson",
    role: initialData?.role || "Product Designer"
  }

  const testimonial = currentComponent?.content || defaultTestimonial
  const [editedTestimonial, setEditedTestimonial] = useState(testimonial)

  const saveChanges = () => {
    updateComponentContent(id, editedTestimonial)
    setIsEditing(false)
  }

  const startEditing = () => {
    setEditedTestimonial(testimonial)
    setIsEditing(true)
  }

  return (
    <section className="relative py-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100 overflow-hidden">
      {/* Animated background gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-violet-500/20 to-purple-500/20 rounded-full mix-blend-multiply blur-3xl"
          style={{
            animation: 'moveUpDown 8s ease-in-out infinite'
          }}
        />
        <div 
          className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full mix-blend-multiply blur-3xl"
          style={{
            animation: 'moveUpDown 8s ease-in-out infinite',
            animationDelay: '-4s'
          }}
        />
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-rose-500/10 to-orange-500/10 rounded-full mix-blend-multiply blur-3xl"
          style={{
            animation: 'moveUpDown 8s ease-in-out infinite',
            animationDelay: '-2s'
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Control Buttons - No white background */}
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

        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">What People Say</h2>
          <p className="mt-4 text-lg text-gray-500">Hear from our satisfied customers</p>
        </div>

        <div className="relative max-w-2xl mx-auto">
          {/* Testimonial Bubble - Animated */}
          <div 
            className="relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg"
            style={{
              animation: 'float 6s ease-in-out infinite'
            }}
          >
            {/* Quote content */}
            {isEditing && !isPreview ? (
              <Textarea
                value={editedTestimonial.text}
                onChange={(e) => setEditedTestimonial({ ...editedTestimonial, text: e.target.value })}
                className="min-h-[120px] mb-6"
                placeholder="Enter testimonial text..."
              />
            ) : (
              <p className="text-lg text-gray-600 mb-6">{testimonial.text}</p>
            )}

            {/* Author info */}
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shadow-lg">
                <User className="h-6 w-6 text-white" />
              </div>
              <div>
                {isEditing && !isPreview ? (
                  <div className="space-y-2">
                    <Input
                      value={editedTestimonial.author}
                      onChange={(e) => setEditedTestimonial({ ...editedTestimonial, author: e.target.value })}
                      placeholder="Author name"
                      className="font-medium"
                    />
                    <Input
                      value={editedTestimonial.role}
                      onChange={(e) => setEditedTestimonial({ ...editedTestimonial, role: e.target.value })}
                      placeholder="Author role"
                      className="text-gray-500"
                    />
                  </div>
                ) : (
                  <>
                    <div className="font-medium text-gray-900">{testimonial.author}</div>
                    <div className="text-gray-500">{testimonial.role}</div>
                  </>
                )}
              </div>
            </div>

            {/* Decorative tail for the bubble */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-gradient-to-br from-white to-gray-50 rotate-45 shadow-lg" />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes moveUpDown {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-30px) scale(1.1); }
        }
      `}</style>
    </section>
  )
}

export default SingleTestimonial;