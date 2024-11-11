import { Edit2, Check, Trash2, User } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { useComponents } from "@/context/component-context"

interface Testimonial {
  text: string;
  author: string;
}

interface ThreeTestimonialsProps {
  id: string;
  initialData?: {
    testimonials: Testimonial[];
  };
  isPreview?: boolean;
}

export function ThreeTestimonials({ id, initialData, isPreview }: ThreeTestimonialsProps) {
  const { deleteComponent, updateComponentContent, components } = useComponents()
  const [isEditing, setIsEditing] = useState(false)

  const currentComponent = components.find(comp => comp.id === id)
  const defaultTestimonials = [
    {
      text: "This product has completely transformed how we work. The efficiency gains are remarkable.",
      author: "Alex Chen"
    },
    {
      text: "Outstanding support team and regular updates. They really listen to user feedback.",
      author: "Maria Garcia"
    },
    {
      text: "Intuitive interface and powerful features. Exactly what our team needed.",
      author: "James Wilson"
    }
  ]

  const testimonials = currentComponent?.content?.testimonials || initialData?.testimonials || defaultTestimonials
  const [editedTestimonials, setEditedTestimonials] = useState(testimonials)

  const handleEdit = (index: number, field: keyof Testimonial, value: string) => {
    const newTestimonials = [...editedTestimonials]
    newTestimonials[index] = { ...newTestimonials[index], [field]: value }
    setEditedTestimonials(newTestimonials)
  }

  const saveChanges = () => {
    updateComponentContent(id, { testimonials: editedTestimonials })
    setIsEditing(false)
  }

  const startEditing = () => {
    setEditedTestimonials(testimonials)
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

        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Customer Reviews</h2>
          <p className="mt-4 text-lg text-gray-500">What our clients have to say</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {(isEditing ? editedTestimonials : testimonials).map((testimonial, index) => (
            <div 
              key={index}
              className="relative"
              style={{
                animation: 'float 6s ease-in-out infinite',
                animationDelay: `${-index * 2}s`
              }}
            >
              <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-lg h-full">
                {isEditing && !isPreview ? (
                  <div className="space-y-4">
                    <Textarea
                      value={testimonial.text}
                      onChange={(e) => handleEdit(index, 'text', e.target.value)}
                      className="min-h-[100px]"
                      placeholder="Enter testimonial text..."
                    />
                    <Input
                      value={testimonial.author}
                      onChange={(e) => handleEdit(index, 'author', e.target.value)}
                      placeholder="Author name"
                    />
                  </div>
                ) : (
                  <>
                    <p className="text-gray-600 mb-4">{testimonial.text}</p>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shadow-lg">
                        <User className="h-5 w-5 text-white" />
                      </div>
                      <p className="font-medium text-gray-900">— {testimonial.author}</p>
                    </div>
                  </>
                )}
                {/* Decorative tail */}
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-gradient-to-br from-white to-gray-50 rotate-45 shadow-lg" />
              </div>
            </div>
          ))}
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

export default ThreeTestimonials;