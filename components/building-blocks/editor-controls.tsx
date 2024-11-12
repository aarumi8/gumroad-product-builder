import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { Check, Edit2, Trash2, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { useAI } from '@/hooks/useAi'

interface EditorControlsProps {
  isPreview?: boolean
  isEditing: boolean
  onDelete: () => void
  onEdit: () => void
  onSave: () => void
  componentType: string
  onAIContent: (content: any) => void
}

export function EditorControls({ 
  isPreview, 
  isEditing, 
  onDelete, 
  onEdit, 
  onSave,
  componentType,
  onAIContent
}: EditorControlsProps) {
  const [isAIDialogOpen, setIsAIDialogOpen] = useState(false)
  const [prompt, setPrompt] = useState('')
  const { generateContent, isGenerating, error } = useAI()

  const handleAIGenerate = async () => {
    const content = await generateContent(prompt, componentType)
    if (content) {
      onAIContent(content)
      setIsAIDialogOpen(false)
      setPrompt('')
    }
  }

  if (isPreview) return null

  return (
    <>
      <div className="absolute right-4 top-4 flex items-center gap-2 z-10">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 text-gray-600 hover:text-red-500 hover:border-red-500"
          onClick={onDelete}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
        
        {/* AI Button */}
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 text-purple-600 hover:text-purple-700 hover:border-purple-700"
          onClick={() => setIsAIDialogOpen(true)}
        >
          <Sparkles className="h-4 w-4" />
        </Button>
        
        <Button
          variant="outline"
          size="icon"
          className={`h-8 w-8 ${isEditing ? 'text-green-600 hover:text-green-700 hover:border-green-700' : 'text-gray-600 hover:text-gray-700'}`}
          onClick={isEditing ? onSave : onEdit}
        >
          {isEditing ? <Check className="h-4 w-4" /> : <Edit2 className="h-4 w-4" />}
        </Button>
      </div>

      {/* AI Dialog */}
      <Dialog open={isAIDialogOpen} onOpenChange={setIsAIDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Gumroad AI Assistant</DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe what content you want to generate..."
              className="min-h-[100px]"
            />
            {error && (
              <p className="text-red-500 text-sm mt-2">{error}</p>
            )}
          </div>

          <DialogFooter>
            <Button
              onClick={() => setIsAIDialogOpen(false)}
              variant="outline"
            >
              Cancel
            </Button>
            <Button
              onClick={handleAIGenerate}
              disabled={isGenerating || !prompt.trim()}
              className="bg-gradient-to-r from-primary to-purple-600"
            >
              {isGenerating ? 'Generating...' : 'Generate Content'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}