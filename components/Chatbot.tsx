'use client'

import { useState, useRef, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  MessageCircle, 
  Send, 
  X, 
  Bot, 
  User, 
  Leaf,
  Minimize2,
  Maximize2,
  Loader2
} from 'lucide-react'

interface Message {
  id: string
  content: string
  role: 'user' | 'assistant'
  timestamp: Date
}

interface ChatbotProps {
  context?: string
  className?: string
}

export default function Chatbot({ context, className = '' }: ChatbotProps) {
  const { data: session } = useSession()
  const [mounted, setMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: `Halo ${session?.user?.name || 'Pengguna'}! 👋 Saya AI Assistant Karwanua. Saya siap membantu Anda dengan:

🌱 Tips mengurangi emisi karbon
📊 Memahami hasil perhitungan emisi
🏡 Gaya hidup ramah lingkungan
🌍 Informasi perubahan iklim

Ada yang bisa saya bantu hari ini?`,
      role: 'assistant',
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Listen for open chatbot event from navbar
  useEffect(() => {
    const handleOpenChatbot = () => {
      setIsOpen(true)
      setIsMinimized(false)
    }

    window.addEventListener('openChatbot', handleOpenChatbot)
    return () => window.removeEventListener('openChatbot', handleOpenChatbot)
  }, [])

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage.trim(),
      role: 'user',
      timestamp: new Date()
    }

    // Capture the current history before updating state
    const currentHistory = messages.map(msg => ({
      role: msg.role,
      content: msg.content
    }))

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage.content,
          context: context,
          history: [...currentHistory, { role: 'user', content: userMessage.content }]
        })
      })

      if (!response.ok) {
        throw new Error('Failed to get AI response')
      }

      const data = await response.json()

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.message,
        role: 'assistant',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, aiMessage])
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Maaf, terjadi kesalahan. Silakan coba lagi nanti.',
        role: 'assistant',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  if (!mounted) {
    return null
  }

  return (
    <div className={`fixed z-50 ${className}`}>
      {/* Chat Toggle Button */}
      {!isOpen && (
        <div className="flex items-center gap-3">
          <div className="bg-slate-900/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-lg border border-white/5 text-emerald-400 font-bold text-xs uppercase tracking-wider">
            Tanya AI Assistant
          </div>
          <Button
            onClick={() => setIsOpen(true)}
            className="rounded-full w-14 h-14 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-[0_0_15px_rgba(16,185,129,0.25)] hover:shadow-[0_0_25px_rgba(16,185,129,0.4)] transition-all duration-300 group cursor-pointer border border-white/10"
            aria-label="Open AI Chat"
          >
            <MessageCircle className="h-6 w-6 group-hover:scale-110 transition-transform text-white" />
          </Button>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className={`w-[380px] max-w-[calc(100vw-2rem)] ${isMinimized ? 'h-[72px]' : 'h-[520px]'} shadow-[0_10px_50px_rgba(0,0,0,0.5)] border border-white/10 bg-slate-950/90 backdrop-blur-2xl transition-all duration-300 rounded-2xl overflow-hidden`}>
          {/* Header */}
          <CardHeader className="p-4 bg-gradient-to-r from-emerald-600/90 to-teal-600/90 text-white border-b border-white/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="p-1.5 bg-white/10 rounded-full border border-white/10">
                  <Bot className="h-4 w-4 text-emerald-400" />
                </div>
                <div>
                  <CardTitle className="text-sm font-bold text-white tracking-wide">AI Assistant</CardTitle>
                  <p className="text-[10px] text-emerald-300 font-semibold uppercase tracking-wider">Karwanua Helper</p>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="h-8 w-8 p-0 hover:bg-white/10 text-white rounded-lg transition-colors"
                >
                  {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8 p-0 hover:bg-white/10 text-white rounded-lg transition-colors"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>

          {/* Chat Content */}
          {!isMinimized && (
            <CardContent className="p-0 flex flex-col h-[448px] bg-slate-950/40">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-start space-x-2.5 ${
                      message.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {message.role === 'assistant' && (
                      <div className="p-1.5 bg-teal-500/10 border border-teal-500/20 rounded-full flex-shrink-0 mt-0.5">
                        <Leaf className="h-3.5 w-3.5 text-teal-400" />
                      </div>
                    )}
                    
                    <div
                      className={`max-w-[75%] p-3.5 rounded-2xl text-sm leading-relaxed ${
                        message.role === 'user'
                          ? 'bg-gradient-to-br from-emerald-600 to-teal-600 text-white rounded-br-none shadow-[0_4px_15px_rgba(16,185,129,0.15)] font-semibold'
                          : 'bg-white/5 border border-white/5 text-slate-100 rounded-bl-none font-medium'
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{message.content}</p>
                      <p className={`text-[10px] mt-1.5 font-bold ${
                        message.role === 'user' ? 'text-emerald-200' : 'text-slate-505'
                      }`}>
                        {message.timestamp.toLocaleTimeString('id-ID', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>

                    {message.role === 'user' && (
                      <div className="p-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex-shrink-0 mt-0.5">
                        <User className="h-3.5 w-3.5 text-emerald-400" />
                      </div>
                    )}
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex items-start space-x-2.5">
                    <div className="p-1.5 bg-teal-500/10 border border-teal-500/20 rounded-full">
                      <Leaf className="h-3.5 w-3.5 text-teal-400" />
                    </div>
                    <div className="bg-white/5 border border-white/5 p-3.5 rounded-2xl rounded-bl-none shadow-sm">
                      <div className="flex items-center space-x-2">
                        <Loader2 className="h-3.5 w-3.5 animate-spin text-teal-400" />
                        <span className="text-sm text-slate-400 font-semibold">AI sedang mengetik...</span>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t border-white/5 bg-slate-950/60">
                <div className="flex space-x-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Tanya tentang emisi karbon..."
                    className="flex-1 px-4 py-2.5 bg-slate-900/60 border border-white/10 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 text-white placeholder-slate-500 text-sm font-semibold transition-colors"
                    disabled={isLoading}
                  />
                  <Button
                    onClick={sendMessage}
                    disabled={!inputMessage.trim() || isLoading}
                    className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white p-2.5 rounded-xl transition-all duration-200 cursor-pointer flex items-center justify-center h-10 w-10 border border-emerald-500/10"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          )}
        </Card>
      )}
    </div>
  )
}
