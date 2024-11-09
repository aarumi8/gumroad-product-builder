import Image from 'next/image'

interface TemplateCardProps {
  title: string;
  imageUrl?: string;
  onClick: () => void;
}

export function TemplateCard({ title, imageUrl, onClick }: TemplateCardProps) {
  return (
    <div 
      className="rounded-lg border bg-card overflow-hidden cursor-pointer transition-colors hover:bg-accent"
      onClick={onClick}
    >
      <div className="aspect-video w-full bg-muted relative">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 400px) 100vw, 400px"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
            Preview Image
          </div>
        )}
      </div>
      <div className="p-3">
        <h3 className="font-medium">{title}</h3>
      </div>
    </div>
  )
}