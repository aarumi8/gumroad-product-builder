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
}

export function SingleTestimonial({ id, initialData }: SingleTestimonialProps) {
  const { deleteComponent } = useComponents()
  const [isEditing, setIsEditing] = useState(false)
  const [testimonial, setTestimonial] = useState({
    text: initialData?.text || "The product exceeded my expectations. The interface is intuitive, and the features are exactly what I needed.",
    author: initialData?.author || "Sarah Johnson",
    role: initialData?.role || "Product Designer"
  });
  const [editedTestimonial, setEditedTestimonial] = useState(testimonial)

  const saveChanges = () => {
    setTestimonial(editedTestimonial)
    setIsEditing(false)
  }

  const startEditing = () => {
    setEditedTestimonial({ ...testimonial })
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

        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">What People Say</h2>
          <p className="mt-4 text-lg text-gray-500">Hear from our satisfied customers</p>
        </div>

        <div className="relative max-w-2xl mx-auto">
          <div className="relative bg-primary/5 rounded-2xl p-8 shadow-sm">
            {/* Quote content */}
            {isEditing ? (
              <Textarea
                value={editedTestimonial.text}
                onChange={(e) => setEditedTestimonial({ ...editedTestimonial, text: e.target.value })}
                className="min-h-[120px] mb-6"
                placeholder="Enter testimonial text..."
              />
            ) : (
              <p className="text-lg text-gray-600 mb-6 italic">"{testimonial.text}"</p>
            )}

            {/* Author info */}
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-6 w-6 text-primary" />
              </div>
              <div>
                {isEditing ? (
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
          </div>
        </div>
      </div>
    </section>
  )
}