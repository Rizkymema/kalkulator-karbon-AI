"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  MessageCircle,
  Users,
  Lightbulb,
  CheckCircle,
  Instagram,
  Facebook,
  Twitter
} from "lucide-react"

export default function HubungiKamiPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError('')
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Terjadi kesalahan')
      }

      setIsSubmitted(true)
      setFormData({ name: '', email: '', subject: '', category: '', message: '' })
    } catch (error: any) {
      setSubmitError(error.message || 'Gagal mengirim pesan. Silakan coba lagi.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6 text-emerald-600" />,
      title: "Email",
      content: "info@karwanua.id",
      description: "Kirim email untuk pertanyaan umum"
    },
    {
      icon: <Phone className="h-6 w-6 text-blue-600" />,
      title: "Telepon",
      content: "+62 431 123456",
      description: "Hubungi kami di jam kerja"
    },
    {
      icon: <MapPin className="h-6 w-6 text-red-600" />,
      title: "Alamat",
      content: "Jl. Kampus UNSRAT, Manado, Sulawesi Utara",
      description: "Kantor pusat Karwanua"
    },
    {
      icon: <Clock className="h-6 w-6 text-orange-600" />,
      title: "Jam Kerja",
      content: "Senin - Jumat, 08:00 - 17:00 WITA",
      description: "Waktu pelayanan resmi"
    }
  ]

  const faqItems = [
    {
      question: "Bagaimana cara menghitung jejak karbon saya?",
      answer: "Gunakan kalkulator emisi kami di halaman 'Hitung Emisi'. Masukkan data konsumsi listrik, transportasi, dan limbah untuk mendapatkan hasil perhitungan jejak karbon Anda."
    },
    {
      question: "Apakah layanan Karwanua gratis?",
      answer: "Ya, layanan dasar Karwanua gratis untuk semua pengguna. Fitur premium dengan analisis mendalam dan rekomendasi personal tersedia dengan berlangganan."
    },
    {
      question: "Bagaimana cara bergabung dengan kegiatan lingkungan?",
      answer: "Pantau halaman 'Berita & Info' untuk informasi kegiatan terbaru, atau ikuti media sosial kami untuk update real-time tentang acara dan kegiatan lingkungan."
    },
    {
      question: "Bisakah saya mengunduh data riwayat emisi saya?",
      answer: "Ya, pengguna terdaftar dapat mengunduh riwayat perhitungan emisi dalam format PDF atau Excel melalui halaman 'Riwayat Saya'."
    }
  ]

  const categories = [
    { value: 'pertanyaan', label: 'Pertanyaan Umum' },
    { value: 'teknis', label: 'Masalah Teknis' },
    { value: 'saran', label: 'Saran & Kritik' },
    { value: 'kerjasama', label: 'Kerjasama' },
    { value: 'lainnya', label: 'Lainnya' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-emerald-600 to-green-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Hubungi Kami
            </h1>
            <p className="text-xl text-emerald-100 mb-8 max-w-3xl mx-auto">
              Formulir kontak untuk pertanyaan, saran, dan kerjasama. Tim kami siap membantu perjalanan ramah lingkungan Anda
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <MessageCircle className="h-6 w-6 text-emerald-600" />
                  Kirim Pesan
                </CardTitle>
                <CardDescription>
                  Isi formulir di bawah ini dan kami akan merespons dalam 24 jam
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isSubmitted && (
                  <Alert className="mb-6 border-green-200 bg-green-50">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-800">
                      Terima kasih! Pesan Anda telah terkirim. Tim kami akan merespons segera.
                    </AlertDescription>
                  </Alert>
                )}

                {submitError && (
                  <Alert className="mb-6 border-red-200 bg-red-50">
                    <AlertDescription className="text-red-800">
                      {submitError}
                    </AlertDescription>
                  </Alert>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Nama Lengkap</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Masukkan nama lengkap"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="contoh@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="category">Kategori</Label>
                      <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        required
                      >
                        <option value="">Pilih kategori</option>
                        {categories.map((cat) => (
                          <option key={cat.value} value={cat.value}>
                            {cat.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="subject">Subjek</Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="Subjek pesan"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message">Pesan</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tulis pesan Anda di sini..."
                      rows={6}
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-emerald-600 hover:bg-emerald-700"
                  >
                    {isSubmitting ? (
                      "Mengirim..."
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Kirim Pesan
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* FAQ Section */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Lightbulb className="h-6 w-6 text-yellow-500" />
                  Pertanyaan yang Sering Diajukan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {faqItems.map((item, index) => (
                    <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
                      <h4 className="font-semibold text-gray-900 mb-2">{item.question}</h4>
                      <p className="text-gray-600 text-sm">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info Sidebar */}
          <div className="space-y-6">
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Informasi Kontak</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      {info.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{info.title}</h4>
                      <p className="text-gray-700 font-medium">{info.content}</p>
                      <p className="text-gray-500 text-sm">{info.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Social Media */}
            <Card>
              <CardHeader>
                <CardTitle>Ikuti Kami</CardTitle>
                <CardDescription>
                  Dapatkan update terbaru tentang lingkungan dan tips hemat emisi
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4">
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Instagram className="h-4 w-4 text-pink-500" />
                    Instagram
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Facebook className="h-4 w-4 text-blue-500" />
                    Facebook
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Twitter className="h-4 w-4 text-blue-400" />
                    Twitter
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Response Time */}
            <Card className="bg-gradient-to-br from-emerald-500 to-green-500 text-white">
              <CardContent className="p-6 text-center">
                <Clock className="h-12 w-12 mx-auto mb-4" />
                <h3 className="font-bold mb-2">Respons Cepat</h3>
                <p className="text-sm text-emerald-100 mb-4">
                  Tim kami merespons dalam 24 jam untuk semua pertanyaan
                </p>
                <div className="flex items-center justify-center space-x-4 text-sm">
                  <div className="text-center">
                    <div className="font-bold">95%</div>
                    <div className="text-emerald-100">Kepuasan</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold">&lt;24h</div>
                    <div className="text-emerald-100">Respons</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Office Hours */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-emerald-600" />
                  Tim Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Senin - Jumat</span>
                    <span className="font-medium">08:00 - 17:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sabtu</span>
                    <span className="font-medium">09:00 - 15:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Minggu</span>
                    <span className="font-medium">Tutup</span>
                  </div>
                  <div className="mt-4 p-3 bg-emerald-50 rounded-lg">
                    <p className="text-emerald-700 text-xs">
                      💡 Untuk respons lebih cepat, gunakan formulir online di atas
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
