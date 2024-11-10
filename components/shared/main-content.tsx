import { useComponents } from '@/context/component-context';
import { CozyLinkList } from '../building-components/features/cozy-link-list';
import { SingleTestimonial } from '../building-components/testimonials/single-testimonial';
import { ThreeTestimonials } from '../building-components/testimonials/three-testimonials';

export default function MainContent() {
    const { components } = useComponents()
  
    const renderComponent = (component: { id: string; type: string }) => {
        switch (component.type) {
          case 'features-1':
            return <CozyLinkList key={component.id} id={component.id} />
          case 'testimonial-1':
            return <SingleTestimonial key={component.id} id={component.id} />
          case 'testimonial-2':
            return <ThreeTestimonials key={component.id} id={component.id} />
          default:
            return null
        }
      }
  
    return (
      <div className="flex-1 bg-gray-100 p-8 min-h-screen overflow-y-auto">
        <div className="max-w-[1200px] mx-auto bg-white shadow-sm min-h-[calc(100vh-4rem)] rounded-lg overflow-hidden">
          {components.map(component => renderComponent(component))}
          {components.length === 0 && (
            <div className="h-[calc(100vh-4rem)] flex items-center justify-center text-gray-400">
              Choose components from the sidebar to build your website
            </div>
          )}
        </div>
      </div>
    )
  }