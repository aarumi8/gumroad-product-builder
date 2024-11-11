import { useComponents } from '@/context/component-context';
import { Button } from '@/components/ui/button'
import { Eye } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { CozyLinkList } from '../building-components/features/cozy-link-list';
import { SingleTestimonial } from '../building-components/testimonials/single-testimonial';
import { ThreeTestimonials } from '../building-components/testimonials/three-testimonials';
import { ContactForm } from '../building-components/forms/contact-form';
import { NewsletterForm } from '../building-components/forms/newsletter-form';
import { TextAndImage } from '../building-components/images/text-and-image';
import { GridImagesAndText } from '../building-components/images/grid-images-and-text';
import { HeroWithImage } from '../building-components/heroes/hero-with-image';
import { TwoImagesHero } from '../building-components/heroes/two-images-hero';
import GradientCta from '../building-components/buy-buttons/gradient-cta';

interface MainContentProps {
  isPreview?: boolean;
  onPreview?: () => void;
}
  
export default function MainContent({ isPreview, onPreview }: MainContentProps) {
    const { components } = useComponents()
    const router = useRouter()
  
    const renderComponent = (component: { id: string; type: string; initialData?: any }) => {
      const commonProps = {
        key: component.id,
        id: component.id,
        initialData: component.initialData,
        isPreview
      }
    
      switch (component.type) {
        case 'features-1':
          return <CozyLinkList {...commonProps} />
        case 'testimonial-1':
          return <SingleTestimonial {...commonProps} />
        case 'testimonial-2':
          return <ThreeTestimonials {...commonProps} />
        case 'form-1':
          return <ContactForm {...commonProps} />
        case 'form-2':
          return <NewsletterForm {...commonProps} />
        case 'hero-1':
          return <HeroWithImage {...commonProps} />
        case 'hero-2':
          return <TwoImagesHero {...commonProps} />
        case 'image-1':
          return <TextAndImage {...commonProps} />
        case 'image-2':
          return <GridImagesAndText {...commonProps} />
        case 'buy-button-1':
          return <GradientCta {...commonProps} />
        default:
          return null
      }
    }
  
    return (
      <div className="flex-1">
        <div className={isPreview ? "" : "relative max-w-[1200px] mx-auto bg-white min-h-[calc(100vh-4rem)] rounded-lg overflow-hidden shadow-sm my-8"}>
          {/* Components */}
          <div>
            {components.map(component => renderComponent(component))}
          </div>
  
          {/* Preview Button - Only show in edit mode when there are components */}
          {!isPreview && components.length > 0 && (
            <div className="fixed bottom-8 right-8 z-50">
              <button
                onClick={onPreview}
                className="inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md shadow-lg backdrop-blur-sm"
                style={{
                  backgroundImage: 'linear-gradient(to right, var(--primary), rgb(147, 51, 234))'
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 mr-2"
                >
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                Preview Website
              </button>
            </div>
          )}
  
          {/* Empty State */}
          {!isPreview && components.length === 0 && (
            <div className="h-[calc(100vh-4rem)] flex items-center justify-center text-gray-400">
              Choose components from the sidebar to build your website
            </div>
          )}
        </div>
      </div>
    )
  }