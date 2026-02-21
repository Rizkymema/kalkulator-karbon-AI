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
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
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
          context: context
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

  if (!session) {
    return null
  }

  return (
    <div className={`fixed z-50 ${className}`}>
      {/* Chat Toggle Button */}
      {!isOpen && (
        <div className="flex items-center gap-3">
          <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-green-200">
            <span className="text-sm font-medium text-green-700">Konsultasi dengan AI</span>
          </div>
          <Button
            onClick={() => setIsOpen(true)}
            className="rounded-full w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg hover:shadow-xl transition-all duration-300 group"
            aria-label="Open AI Chat"
          >
            <MessageCircle className="h-6 w-6 group-hover:scale-110 transition-transform" />
          </Button>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className={`w-80 ${isMinimized ? 'h-16' : 'h-96'} shadow-2xl border-0 bg-white/95 backdrop-blur-md transition-all duration-300`}>
          {/* Header */}
          <CardHeader className="p-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="p-1.5 bg-white/20 rounded-full">
                  <Bot className="h-4 w-4" />
                </div>
                <div>
                  <CardTitle className="text-sm font-semibold">AI Assistant</CardTitle>
                  <p className="text-xs text-green-100">Karwanua Helper</p>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="h-8 w-8 p-0 hover:bg-white/20 text-white"
                >
                  {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8 p-0 hover:bg-white/20 text-white"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>

          {/* Chat Content */}
          {!isMinimized && (
            <CardContent className="p-0 flex flex-col h-80">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-start space-x-2 ${
                      message.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {message.role === 'assistant' && (
                      <div className="p-1.5 bg-green-100 rounded-full flex-shrink-0">
                        <Leaf className="h-3 w-3 text-green-600" />
                      </div>
                    )}
                    
                    <div
                      className={`max-w-[70%] p-3 rounded-lg text-sm ${
                        message.role === 'user'
                          ? 'bg-green-500 text-white rounded-br-none'
                          : 'bg-gray-100 text-gray-800 rounded-bl-none'
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.role === 'user' ? 'text-green-100' : 'text-gray-500'
                      }`}>
                        {message.timestamp.toLocaleTimeString('id-ID', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>

                    {message.role === 'user' && (
                      <div className="p-1.5 bg-blue-100 rounded-full flex-shrink-0">
                        <User className="h-3 w-3 text-blue-600" />
                      </div>
                    )}
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex items-center space-x-2">
                    <div className="p-1.5 bg-green-100 rounded-full">
                      <Leaf className="h-3 w-3 text-green-600" />
                    </div>
                    <div className="bg-gray-100 p-3 rounded-lg rounded-bl-none">
                      <div className="flex items-center space-x-2">
                        <Loader2 className="h-4 w-4 animate-spin text-gray-500" />
                        <span className="text-sm text-gray-500">AI sedang mengetik...</span>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex space-x-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Tanya tentang emisi karbon..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                    disabled={isLoading}
                  />
                  <Button
                    onClick={sendMessage}
                    disabled={!inputMessage.trim() || isLoading}
                    className="bg-green-500 hover:bg-green-600 text-white p-2"
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
