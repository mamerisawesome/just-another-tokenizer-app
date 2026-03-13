'use client'

import { useTokenizer } from '@/lib/TokenizerContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function ModelSelector() {
  const { selectedModel, setSelectedModel, allModels } = useTokenizer()

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle>Model Selection</CardTitle>
        <CardDescription>Choose a model to see pricing</CardDescription>
      </CardHeader>
      <CardContent>
        <Select value={selectedModel.id} onValueChange={(id) => {
          const model = allModels.find(m => m.id === id)
          if (model) setSelectedModel(model)
        }}>
          <SelectTrigger className="bg-secondary border-border text-foreground">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-card border-border">
            {allModels.map((model) => (
              <SelectItem
                key={model.id}
                value={model.id}
                className="text-foreground hover:bg-secondary"
              >
                {model.name}
                {model.isCustom && ' (Custom)'}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="bg-secondary p-4 rounded-lg border border-border">
            <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
              Input Price
            </div>
            <div className="text-xl font-bold text-foreground">
              ${selectedModel.inputPrice.toFixed(4)}
            </div>
            <div className="text-xs text-muted-foreground mt-1">per 1K tokens</div>
          </div>
          <div className="bg-secondary p-4 rounded-lg border border-border">
            <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
              Output Price
            </div>
            <div className="text-xl font-bold text-app-green">
              ${selectedModel.outputPrice.toFixed(4)}
            </div>
            <div className="text-xs text-muted-foreground mt-1">per 1K tokens</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
