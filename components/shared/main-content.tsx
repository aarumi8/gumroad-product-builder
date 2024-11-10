import { useComponents } from '@/context/component-context';
import { CozyLinkList } from '../building-components/features/cozy-link-list';
import { SingleTestimonial } from '../building-components/testimonials/single-testimonial';
import { ThreeTestimonials } from '../building-components/testimonials/three-testimonials';
import { ContactForm } from '../building-components/forms/contact-form';
import { NewsletterForm } from '../building-components/forms/newsletter-form';
import { TextAndImage } from '../building-components/images/text-and-image';
import { GridImagesAndText } from '../building-components/images/grid-images-and-text';
import { HeroWithImage } from '../building-components/heroes/hero-with-image';
import { TwoImagesHero } from '../building-components/heroes/two-images-hero';

export default function MainContent() {
    const { components } = useComponents()
    const renderComponent = (component: { id: string; type: string; initialData?: any }) => {
        switch (component.type) {
          case 'features-1':
            return <CozyLinkList key={component.id} id={component.id} initialData={component.initialData} />
          case 'testimonial-1':
            return <SingleTestimonial key={component.id} id={component.id} initialData={component.initialData} />
          case 'testimonial-2':
            return <ThreeTestimonials key={component.id} id={component.id} initialData={component.initialData} />
          case 'form-1':
            return <ContactForm key={component.id} id={component.id} initialData={component.initialData} />
          case 'form-2':
            return <NewsletterForm key={component.id} id={component.id} initialData={component.initialData} />
          case 'hero-1':
            return <HeroWithImage key={component.id} id={component.id} initialData={component.initialData} />
          case 'hero-2':
            return <TwoImagesHero key={component.id} id={component.id} initialData={component.initialData} />
          case 'image-1':
            return <TextAndImage key={component.id} id={component.id} initialData={component.initialData} />
          case 'image-2':
            return <GridImagesAndText key={component.id} id={component.id} initialData={component.initialData} />
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