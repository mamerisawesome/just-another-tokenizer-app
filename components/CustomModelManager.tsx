'use client'

import { useState } from 'react'
import { useTokenizer, ModelConfig } from '@/lib/TokenizerContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Trash2, Plus } from 'lucide-react'

export function CustomModelManager() {
  const { customModels, addCustomModel, removeCustomModel } = useTokenizer()
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    inputPrice: '',
    outputPrice: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.id || !formData.name || !formData.inputPrice || !formData.outputPrice) {
      alert('All fields are required')
      return
    }

    const newModel: ModelConfig = {
      id: formData.id.toLowerCase().replace(/\s+/g, '-'),
      name: formData.name,
      inputPrice: parseFloat(formData.inputPrice),
      outputPrice: parseFloat(formData.outputPrice),
      encoding: 'cl100k_base',
      isCustom: true,
    }

    addCustomModel(newModel)
    setFormData({ id: '', name: '', inputPrice: '', outputPrice: '' })
    setIsOpen(false)
  }

  return (
    <div className="space-y-6">
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Manage Custom Models</CardTitle>
          <CardDescription>Add or remove custom model configurations</CardDescription>
        </CardHeader>
        <CardContent>
          {customModels.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">No custom models yet</p>
              <Button
                onClick={() => setIsOpen(true)}
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Custom Model
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-3">
                {customModels.map((model) => (
                  <div
                    key={model.id}
                    className="flex items-center justify-between p-4 bg-secondary border border-border rounded-lg"
                  >
                    <div>
                      <h3 className="font-semibold text-foreground">{model.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Input: ${model.inputPrice.toFixed(4)} • Output: ${model.outputPrice.toFixed(4)} per 1K tokens
                      </p>
                    </div>
                    <Button
                      onClick={() => removeCustomModel(model.id)}
                      variant="ghost"
                      size="sm"
                      className="hover:bg-destructive hover:text-destructive-foreground"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <Button
                onClick={() => setIsOpen(true)}
                variant="outline"
                className="w-full border-border hover:bg-secondary"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Another Model
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Model Form */}
      {isOpen && (
        <Card className="bg-card border-border border-accent">
          <CardHeader>
            <CardTitle>Add New Model</CardTitle>
            <CardDescription>Create a custom model configuration</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-foreground">
                    Model Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="e.g., My Custom Model"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="id" className="text-foreground">
                    Model ID
                  </Label>
                  <Input
                    id="id"
                    placeholder="e.g., custom-model"
                    value={formData.id}
                    onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                    className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="inputPrice" className="text-foreground">
                    Input Price (per 1K tokens)
                  </Label>
                  <Input
                    id="inputPrice"
                    type="number"
                    placeholder="0.001"
                    step="0.000001"
                    value={formData.inputPrice}
                    onChange={(e) => setFormData({ ...formData, inputPrice: e.target.value })}
                    className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="outputPrice" className="text-foreground">
                    Output Price (per 1K tokens)
                  </Label>
                  <Input
                    id="outputPrice"
                    type="number"
                    placeholder="0.003"
                    step="0.000001"
                    value={formData.outputPrice}
                    onChange={(e) => setFormData({ ...formData, outputPrice: e.target.value })}
                    className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button
                  type="submit"
                  className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  Add Model
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    setIsOpen(false)
                    setFormData({ id: '', name: '', inputPrice: '', outputPrice: '' })
                  }}
                  variant="outline"
                  className="flex-1 border-border hover:bg-secondary"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
