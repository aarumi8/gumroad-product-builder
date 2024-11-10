import { createContext, useContext, useState, ReactNode } from 'react'
import { templates } from '@/config/templates'

interface Component {
  id: string;
  type: string;
  initialData?: any;
  content?: any; // Add this to store component-specific content
}

interface ComponentContextType {
  components: Component[];
  addComponent: (componentId: string) => void;
  loadTemplate: (templateId: string) => void;
  deleteComponent: (componentId: string) => void;
  updateComponentContent: (componentId: string, content: any) => void; // Add this
}

const ComponentContext = createContext<ComponentContextType | undefined>(undefined)

export function useComponents() {
  const context = useContext(ComponentContext)
  if (!context) {
    throw new Error('useComponents must be used within a ComponentProvider')
  }
  return context
}

export function ComponentProvider({ children }: { children: ReactNode }) {
  const [components, setComponents] = useState<Component[]>([])

  const addComponent = (componentId: string) => {
    const newComponent = {
      id: `${componentId}-${Date.now()}`,
      type: componentId
    }
    setComponents(prev => [...prev, newComponent])
  }

  const loadTemplate = (templateId: string) => {
    const template = templates[templateId]
    if (template) {
      const newComponents = template.components.map(comp => ({
        id: `${comp.type}-${Date.now()}`,
        type: comp.type,
        initialData: comp.initialData,
        content: comp.initialData // Set initial content from initialData
      }))
      setComponents(newComponents)
    }
  }

  const deleteComponent = (componentId: string) => {
    setComponents(prev => prev.filter(comp => comp.id !== componentId))
  }

  const updateComponentContent = (componentId: string, content: any) => {
    setComponents(prev => prev.map(comp => 
      comp.id === componentId 
        ? { ...comp, content }
        : comp
    ))
  }

  const value = {
    components,
    addComponent,
    loadTemplate,
    deleteComponent,
    updateComponentContent
  }

  return (
    <ComponentContext.Provider value={value}>
      {children}
    </ComponentContext.Provider>
  )
}