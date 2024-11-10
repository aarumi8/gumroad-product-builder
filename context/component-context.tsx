import { createContext, useContext, useState, ReactNode } from 'react'

interface Component {
  id: string;
  type: string;
}

interface ComponentContextType {
  components: Component[];
  addComponent: (componentId: string) => void;
  deleteComponent: (componentId: string) => void; // Add delete function
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

  const deleteComponent = (componentId: string) => {
    setComponents(prev => prev.filter(component => component.id !== componentId))
  }

  return (
    <ComponentContext.Provider value={{ components, addComponent, deleteComponent }}>
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