'use client'

import { useTokenizer } from '@/lib/TokenizerContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export function CostDisplay() {
  const { tokenCount, inputCost, outputCost, selectedModel } = useTokenizer()

  const totalCost = inputCost + outputCost

  return (
    <Card className="bg-card border-border sticky top-6">
      <CardHeader>
        <CardTitle className="text-lg">Cost Estimate</CardTitle>
        <CardDescription>{selectedModel.name}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Token Count */}
        <div>
          <div className="text-sm text-muted-foreground mb-2">Total Tokens</div>
          <div className="text-4xl font-bold text-accent">
            {tokenCount.toLocaleString()}
          </div>
        </div>

        {/* Cost Breakdown */}
        <div className="space-y-3 bg-secondary p-4 rounded-lg border border-border">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Input Cost</span>
            <span className="font-mono font-semibold text-foreground">
              ${inputCost.toFixed(6)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Output Cost (estimate)</span>
            <span className="font-mono font-semibold text-foreground">
              ${outputCost.toFixed(6)}
            </span>
          </div>
          <div className="border-t border-border pt-3 flex items-center justify-between">
            <span className="text-sm font-semibold text-foreground">Total Cost</span>
            <span className="font-mono font-bold text-accent text-lg">
              ${totalCost.toFixed(6)}
            </span>
          </div>
        </div>

        {/* Notes */}
        <div className="text-xs text-muted-foreground bg-secondary p-3 rounded border border-border">
          <p className="mb-2">💡 <strong>Note:</strong> Output cost is an estimate assuming the same token count for responses.</p>
          <p>Prices are per 1K tokens and may vary by region.</p>
        </div>

        {/* Quick References */}
        <div className="space-y-2">
          <div className="text-xs font-semibold text-foreground uppercase tracking-wide mb-3">
            Cost Examples
          </div>
          {[1000, 10000, 100000].map((tokens) => (
            <div key={tokens} className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{tokens.toLocaleString()} tokens</span>
              <span className="font-mono font-semibold text-foreground">
                ${(((tokens / 1000) * selectedModel.inputPrice) + ((tokens / 1000) * selectedModel.outputPrice)).toFixed(4)}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
