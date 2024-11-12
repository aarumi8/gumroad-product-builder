import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface EditableContentProps {
  isEditing: boolean
  isPreview?: boolean
  content: {
    title?: string
    subtitle?: string
    description?: string
    buttonText?: string
  }
  onContentChange: (key: string, value: string) => void
  className?: string
  buttonProps?: React.ButtonHTMLAttributes<HTMLButtonElement> & {
    className?: string
  }
}

export function EditableContent({ 
  isEditing, 
  isPreview, 
  content, 
  onContentChange,
  className = "",
  buttonProps = {}
}: EditableContentProps) {
  if (isEditing && !isPreview) {
    return (
      <div className={`space-y-4 ${className}`}>
        {content.title !== undefined && (
          <Input
            value={content.title}
            onChange={(e) => onContentChange('title', e.target.value)}
            className="text-center text-xl font-bold"
            placeholder="Enter title..."
          />
        )}
        {content.subtitle !== undefined && (
          <Input
            value={content.subtitle}
            onChange={(e) => onContentChange('subtitle', e.target.value)}
            className="text-center"
            placeholder="Enter subtitle..."
          />
        )}
        {content.description !== undefined && (
          <Textarea
            value={content.description}
            onChange={(e) => onContentChange('description', e.target.value)}
            className="min-h-[150px]"
            placeholder="Enter description..."
          />
        )}
        {content.buttonText !== undefined && (
          <Input
            value={content.buttonText}
            onChange={(e) => onContentChange('buttonText', e.target.value)}
            placeholder="Button text..."
          />
        )}
      </div>
    )
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {content.title && (
        <div className="relative inline-block">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{content.title}</h2>
          <div 
            className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-primary/60 to-purple-500/60 rounded-full"
            style={{
              animation: 'expandWidth 0.8s ease-out forwards',
              animationDelay: '0.4s'
            }}
          />
        </div>
      )}
      {content.subtitle && <p className="text-lg text-gray-600">{content.subtitle}</p>}
      {content.description && <p className="text-lg text-gray-600 leading-relaxed">{content.description}</p>}
      {content.buttonText && (
        <Button
          {...buttonProps}
          className={cn(
            "group bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90",
            buttonProps.className
          )}
        >
          {content.buttonText}
        </Button>
      )}
    </div>
  )
}