'use client'

import { useTokenizer } from '@/lib/TokenizerContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

export function TokenizerSection() {
  const { text, setText, tokenCount } = useTokenizer()

  const handleClear = () => setText('')

  const handlePaste = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText()
      setText(clipboardText)
    } catch (err) {
      console.error('Failed to read clipboard:', err)
    }
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle>Text Input</CardTitle>
        <CardDescription>Paste or type text to count tokens</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="Paste your text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="min-h-64 resize-none bg-secondary text-foreground border-border placeholder:text-muted-foreground"
        />

        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <Button
              onClick={handlePaste}
              variant="outline"
              size="sm"
              className="border-border hover:bg-secondary"
            >
              Paste from Clipboard
            </Button>
            <Button
              onClick={handleClear}
              variant="outline"
              size="sm"
              className="border-border hover:bg-secondary"
            >
              Clear
            </Button>
          </div>

          <div className="text-right">
            <div className="text-sm text-muted-foreground mb-1">Tokens</div>
            <div className="text-2xl font-bold text-accent">
              {tokenCount.toLocaleString()}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 text-sm pt-2 border-t border-border">
          <div>
            <div className="text-muted-foreground">Characters</div>
            <div className="font-mono text-foreground font-semibold">
              {text.length.toLocaleString()}
            </div>
          </div>
          <div>
            <div className="text-muted-foreground">Words</div>
            <div className="font-mono text-foreground font-semibold">
              {text.trim().split(/\s+/).filter(w => w.length > 0).length}
            </div>
          </div>
          <div>
            <div className="text-muted-foreground">Ratio</div>
            <div className="font-mono text-foreground font-semibold">
              {text.length > 0 ? (text.length / Math.max(tokenCount, 1)).toFixed(2) : '0.00'}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
