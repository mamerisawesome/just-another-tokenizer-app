'use client'

import { useState, useEffect } from 'react'
import { TokenizerSection } from '@/components/TokenizerSection'
import { ModelSelector } from '@/components/ModelSelector'
import { CostDisplay } from '@/components/CostDisplay'
import { CustomModelManager } from '@/components/CustomModelManager'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">GPT Tokenizer</h1>
              <p className="text-muted-foreground mt-2">Count tokens and estimate API costs for OpenAI models</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center">
              <span className="text-lg font-bold text-accent-foreground">⚡</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <Tabs defaultValue="tokenizer" className="w-full">
          <TabsList className="mb-6 bg-secondary">
            <TabsTrigger value="tokenizer">Tokenizer</TabsTrigger>
            <TabsTrigger value="models">Models</TabsTrigger>
          </TabsList>

          {/* Tokenizer Tab */}
          <TabsContent value="tokenizer" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Input and Model Selection */}
              <div className="lg:col-span-2 space-y-6">
                <ModelSelector />
                <TokenizerSection />
              </div>

              {/* Cost Display */}
              <div>
                <CostDisplay />
              </div>
            </div>
          </TabsContent>

          {/* Models Tab */}
          <TabsContent value="models">
            <CustomModelManager />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
