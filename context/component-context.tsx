// context/component-context.tsx
import { createContext, useContext, useState, ReactNode } from 'react'
import { templates } from '@/config/templates'

interface Component {
  id: string;
  type: string;
  initialData?: any;
}

interface ComponentContextType {
  components: Component[];
  addComponent: (componentId: string) => void;
  loadTemplate: (templateId: string) => void;
  deleteComponent: (componentId: string) => void; // Added this
}

const ComponentContext = createContext<ComponentContextType | undefined>(undefined)

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
        initialData: comp.initialData
      }))
      setComponents(newComponents)
    }
  }

  const deleteComponent = (componentId: string) => {
    setComponents(prev => prev.filter(comp => comp.id !== componentId))
  }

  return (
    <ComponentContext.Provider value={{ 
      components, 
      addComponent, 
      loadTemplate, 
      deleteComponent  // Added this
    }}>
      {children}
    </ComponentContext.Provider>
  )
}

export function useComponents() {
  const context = useContext(ComponentContext)
  if (context === undefined) {
    throw new Error('useComponents must be used within a ComponentProvider')
  }
  return context
}