// Test script untuk xAI API menggunakan fetch
async function testXAI() {
  const API_KEY = process.env.XAI_API_KEY || "YOUR_API_KEY_HERE"
  const BASE_URL = "https://api.x.ai/v1"

  console.log('🔍 Testing xAI API connection...')
  console.log('API Key (first 10 chars):', API_KEY.substring(0, 10) + '...')
  console.log('Base URL:', BASE_URL)
  
  try {
    const requestBody = {
      model: 'grok-beta',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful AI assistant for an environmental carbon calculator platform. Respond in Indonesian.'
        },
        {
          role: 'user',
          content: 'Halo! Apa itu emisi karbon?'
        }
      ],
      max_tokens: 150,
      temperature: 0.7
    }

    console.log('📤 Sending request...')
    console.log('Request body:', JSON.stringify(requestBody, null, 2))

    const response = await fetch(`${BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    })

    console.log('📥 Response received:')
    console.log('Status:', response.status, response.statusText)
    console.log('Headers:', Object.fromEntries(response.headers.entries()))

    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ Error response body:', errorText)
      return { success: false, error: errorText }
    }

    const data = await response.json()
    console.log('✅ Success! Full response:', JSON.stringify(data, null, 2))
    
    if (data.choices && data.choices[0] && data.choices[0].message) {
      console.log('🤖 AI Response:', data.choices[0].message.content)
    }
    
    return { success: true, data }
    
  } catch (error) {
    console.error('💥 Network/Parse error:', error.message)
    return { success: false, error: error.message }
  }
}

// Run the test
testXAI().then(result => {
  console.log('\n🏁 Test completed:', result.success ? 'SUCCESS' : 'FAILED')
  if (!result.success) {
    console.log('Error details:', result.error)
  }
}).catch(err => {
  console.error('💥 Unexpected error:', err)
})
