import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { TokenizerProvider } from '@/lib/TokenizerContext'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: ' Tokenizer - Count Tokens & Estimate Costs',
  description: 'Count tokens and estimate API costs for OpenAI models. Includes preset models and custom model support.',
  icons: {
    icon: "/favicon.ico",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans antialiased bg-background text-foreground">
        <TokenizerProvider>
          {children}
        </TokenizerProvider>
        <Analytics />
      </body>
    </html>
  )
}
