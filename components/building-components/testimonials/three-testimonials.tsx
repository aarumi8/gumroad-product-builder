import { Edit2, Check, Trash2 } from "lucide-react"
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
}

export function ThreeTestimonials({ id }: ThreeTestimonialsProps) {
  const { deleteComponent } = useComponents()
  const [isEditing, setIsEditing] = useState(false)
  const [testimonials, setTestimonials] = useState<Testimonial[]>([
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
  ])
  const [editedTestimonials, setEditedTestimonials] = useState(testimonials)

  const saveChanges = () => {
    setTestimonials(editedTestimonials)
    setIsEditing(false)
  }

  const startEditing = () => {
    setEditedTestimonials([...testimonials])
    setIsEditing(true)
  }

  const handleEdit = (index: number, field: keyof Testimonial, value: string) => {
    const newTestimonials = [...editedTestimonials]
    newTestimonials[index] = { ...newTestimonials[index], [field]: value }
    setEditedTestimonials(newTestimonials)
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

        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Customer Reviews</h2>
          <p className="mt-4 text-lg text-gray-500">What our clients have to say</p>
        </div>

        <div className="space-y-6">
          {(isEditing ? editedTestimonials : testimonials).map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-primary/5 rounded-2xl p-6 relative"
            >
              {isEditing ? (
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
                  <p className="text-gray-600 mb-4 italic">"{testimonial.text}"</p>
                  <p className="font-medium text-gray-900">— {testimonial.author}</p>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}