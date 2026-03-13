'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { TiktokenEncoding, getEncoding } from 'js-tiktoken'

export interface ModelConfig {
  id: string
  name: string
  inputPrice: number
  outputPrice: number
  encoding: string
  isCustom?: boolean
}

export const DEFAULT_MODELS: ModelConfig[] = [
  {
    id: 'gpt-5',
    name: 'GPT-5',
    inputPrice: 0.08,
    outputPrice: 0.32,
    encoding: 'o200k_base',
  },
  {
    id: 'gpt-5-turbo',
    name: 'GPT-5 Turbo',
    inputPrice: 0.03,
    outputPrice: 0.12,
    encoding: 'o200k_base',
  },
  {
    id: 'gpt-4.1',
    name: 'GPT-4.1',
    inputPrice: 0.015,
    outputPrice: 0.045,
    encoding: 'o200k_base',
  },
  {
    id: 'gpt-4.1-mini',
    name: 'GPT-4.1 Mini',
    inputPrice: 0.003,
    outputPrice: 0.012,
    encoding: 'o200k_base',
  },
  {
    id: 'gpt-4o',
    name: 'GPT-4o',
    inputPrice: 0.005,
    outputPrice: 0.015,
    encoding: 'o200k_base',
  },
  {
    id: 'gpt-4-turbo',
    name: 'GPT-4 Turbo',
    inputPrice: 0.01,
    outputPrice: 0.03,
    encoding: 'cl100k_base',
  },
  {
    id: 'gpt-4',
    name: 'GPT-4',
    inputPrice: 0.03,
    outputPrice: 0.06,
    encoding: 'cl100k_base',
  },
  {
    id: 'gpt-35-turbo',
    name: 'GPT-3.5 Turbo',
    inputPrice: 0.0005,
    outputPrice: 0.0015,
    encoding: 'cl100k_base',
  },
  {
    id: 'gpt-4o-mini',
    name: 'GPT-4o Mini',
    inputPrice: 0.00015,
    outputPrice: 0.0006,
    encoding: 'o200k_base',
  },
]

interface TokenizerContextType {
  text: string
  setText: (text: string) => void
  selectedModel: ModelConfig
  setSelectedModel: (model: ModelConfig) => void
  tokenCount: number
  inputCost: number
  outputCost: number
  customModels: ModelConfig[]
  addCustomModel: (model: ModelConfig) => void
  removeCustomModel: (id: string) => void
  allModels: ModelConfig[]
}

const TokenizerContext = createContext<TokenizerContextType | undefined>(undefined)

export function TokenizerProvider({ children }: { children: React.ReactNode }) {
  const [text, setText] = useState('')
  const [selectedModel, setSelectedModel] = useState<ModelConfig>(DEFAULT_MODELS[0])
  const [customModels, setCustomModels] = useState<ModelConfig[]>([])
  const [tokenCount, setTokenCount] = useState(0)

  // Load custom models from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('customTokenizerModels')
    if (stored) {
      try {
        const models = JSON.parse(stored)
        setCustomModels(models)
      } catch (e) {
        console.error('Failed to load custom models:', e)
      }
    }
  }, [])

  // Count tokens
  useEffect(() => {
    try {
      const encoding = getEncoding(selectedModel.encoding as TiktokenEncoding)
      const tokens = encoding.encode(text)
      setTokenCount(tokens.length)
    } catch (e) {
      setTokenCount(0)
    }
  }, [text, selectedModel.encoding])

  // Calculate costs (per 1K tokens)
  const inputCost = (tokenCount / 1000) * selectedModel.inputPrice
  const outputCost = (tokenCount / 1000) * selectedModel.outputPrice

  const allModels = [...DEFAULT_MODELS, ...customModels]

  const addCustomModel = (model: ModelConfig) => {
    const newModels = [...customModels, { ...model, isCustom: true }]
    setCustomModels(newModels)
    localStorage.setItem('customTokenizerModels', JSON.stringify(newModels))
  }

  const removeCustomModel = (id: string) => {
    const newModels = customModels.filter(m => m.id !== id)
    setCustomModels(newModels)
    localStorage.setItem('customTokenizerModels', JSON.stringify(newModels))
  }

  return (
    <TokenizerContext.Provider
      value={{
        text,
        setText,
        selectedModel,
        setSelectedModel,
        tokenCount,
        inputCost,
        outputCost,
        customModels,
        addCustomModel,
        removeCustomModel,
        allModels,
      }}
    >
      {children}
    </TokenizerContext.Provider>
  )
}

export function useTokenizer() {
  const context = useContext(TokenizerContext)
  if (!context) {
    throw new Error('useTokenizer must be used within TokenizerProvider')
  }
  return context
}
