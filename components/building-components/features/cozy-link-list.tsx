// components/features/CozyLinkList.tsx
import { Edit2, Check, Circle, Trash2 } from "lucide-react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useComponents } from "@/context/component-context"

interface CozyLinkListProps {
  id: string;
  initialData?: {
    items: string[];
  };
  isPreview?: boolean;
}

export function CozyLinkList({ id, initialData, isPreview }: CozyLinkListProps) {
  const { deleteComponent, updateComponentContent, components } = useComponents()
  const [isEditing, setIsEditing] = useState(false)
  
  // Get current component's content from context
  const currentComponent = components.find(comp => comp.id === id)
  const defaultItems = [
    "Integration with popular design tools",
    "Real-time collaboration features",
    "Advanced exporting options",
    "Custom themes and styling",
    "Automatic backup and versioning"
  ]
  
  // Use content from context if available, otherwise use initialData or defaults
  const items = currentComponent?.content?.items || initialData?.items || defaultItems
  const [editedItems, setEditedItems] = useState(items)

  const handleEdit = (index: number, value: string) => {
    const newItems = [...editedItems]
    newItems[index] = value
    setEditedItems(newItems)
  }

  const saveChanges = () => {
    updateComponentContent(id, { items: editedItems })
    setIsEditing(false)
  }

  const startEditing = () => {
    setEditedItems(items)
    setIsEditing(true)
  }

  return (
    <section className="relative py-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100">
      <div className="max-w-4xl mx-auto">
        {/* Control Buttons */}
        {!isPreview && (
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
        )}

        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Key Features</h2>
          <p className="mt-4 text-lg text-gray-500">Essential features that make our product stand out</p>
        </div>

        {/* List Items */}
        <ul className="space-y-6 mt-8">
          {(isEditing ? editedItems : items).map((item, index) => (
            <li key={`${id}-${index}`} className="flex items-start gap-4">
              <div className="mt-1.5">
                <Circle className="h-3 w-3 text-primary fill-primary/20" />
              </div>
              <div className="flex-1">
                {isEditing ? (
                  <Input
                    value={editedItems[index]}
                    onChange={(e) => handleEdit(index, e.target.value)}
                    className="bg-gray-50/50 border-gray-200 focus:bg-white"
                    placeholder="Enter feature description..."
                  />
                ) : (
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {item}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}