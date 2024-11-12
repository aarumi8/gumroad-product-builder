import { useState } from 'react'
import { useComponents } from '@/context/component-context'

interface UseComponentEditorProps<T> {
  id: string
  defaultContent: T
  initialData?: T
}

export function useComponentEditor<T>({ id, defaultContent, initialData }: UseComponentEditorProps<T>) {
  const { deleteComponent, updateComponentContent, components } = useComponents()
  const [isEditing, setIsEditing] = useState(false)

  const currentComponent = components.find(comp => comp.id === id)
  const content = currentComponent?.content || initialData || defaultContent
  const [editedContent, setEditedContent] = useState<T>(content)

  const saveChanges = () => {
    updateComponentContent(id, editedContent)
    setIsEditing(false)
  }

  const startEditing = () => {
    setEditedContent(content)
    setIsEditing(true)
  }

  return {
    content,
    editedContent,
    isEditing,
    setEditedContent,
    saveChanges,
    startEditing,
    deleteComponent
  }
}