'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function TestChatbot() {
  const [message, setMessage] = useState('')
  const [response, setResponse] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const testAPI = async () => {
    if (!message.trim()) return

    setIsLoading(true)
    setError('')
    setResponse('')

    try {
      const res = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message,
          context: 'Test dari dashboard'
        })
      })

      const data = await res.json()

      if (!res.ok) {
        setError(`Error ${res.status}: ${data.error || 'Unknown error'}`)
        console.error('API Error Details:', data)
      } else {
        setResponse(data.message)
      }
    } catch (err) {
      setError('Network error: ' + (err instanceof Error ? err.message : 'Unknown error'))
      console.error('Network Error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Test xAI Chatbot API</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Pesan untuk AI:
          </label>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Contoh: Bagaimana cara mengurangi emisi karbon?"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <Button 
          onClick={testAPI} 
          disabled={isLoading || !message.trim()}
          className="w-full"
        >
          {isLoading ? 'Mengirim...' : 'Test API'}
        </Button>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-md">
            <h3 className="font-semibold text-red-800">Error:</h3>
            <p className="text-red-700 text-sm mt-1">{error}</p>
          </div>
        )}

        {response && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-md">
            <h3 className="font-semibold text-green-800">Response dari AI:</h3>
            <p className="text-green-700 text-sm mt-1 whitespace-pre-wrap">{response}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
