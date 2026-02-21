import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

interface ContactFormData {
  name: string
  email: string
  subject: string
  category: string
  message: string
}

// In-memory storage untuk demo (dalam production gunakan database)
const contactMessages: (ContactFormData & { id: string; timestamp: string; status: string })[] = []

export async function POST(request: NextRequest) {
  try {
    const data: ContactFormData = await request.json()

    // Validasi data
    if (!data.name || !data.email || !data.subject || !data.message) {
      return NextResponse.json(
        { error: 'Semua field wajib diisi' },
        { status: 400 }
      )
    }

    // Validasi email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: 'Format email tidak valid' },
        { status: 400 }
      )
    }

    // Simpan pesan (dalam production, simpan ke database dan kirim email notifikasi)
    const newMessage = {
      ...data,
      id: `msg_${Date.now()}`,
      timestamp: new Date().toISOString(),
      status: 'pending'
    }
    
    contactMessages.push(newMessage)

    // Log untuk debugging
    console.log('New contact message received:', {
      id: newMessage.id,
      name: data.name,
      email: data.email,
      subject: data.subject,
      category: data.category,
      timestamp: newMessage.timestamp
    })

    // Dalam production, kirim email notifikasi ke admin
    // await sendEmailNotification(data)

    return NextResponse.json({
      success: true,
      message: 'Pesan berhasil dikirim! Tim kami akan merespons dalam 24 jam.',
      messageId: newMessage.id
    })

  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat mengirim pesan' },
      { status: 500 }
    )
  }
}

// GET endpoint untuk admin melihat pesan masuk
export async function GET(request: NextRequest) {
  try {
    // Check if user is admin
    const session = await getServerSession(authOptions)
    if (!session || session.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    return NextResponse.json({
      messages: contactMessages,
      total: contactMessages.length
    })

  } catch (error) {
    console.error('Get contact messages error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan' },
      { status: 500 }
    )
  }
}
