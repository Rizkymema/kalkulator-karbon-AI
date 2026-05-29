"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  Mail, 
  Send, 
  CheckCircle,
  Linkedin,
  Instagram,
  Github,
  Loader2,
  ShieldCheck
} from "lucide-react"

// Custom TikTok icon since Lucide might not have it in all versions
const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.59 4.19 1.13 1.29 2.74 2.1 4.47 2.29V10.3c-1.74-.08-3.45-.75-4.8-1.86-.33-.28-.63-.58-.9-.9v6.97c-.02 2.17-.89 4.26-2.45 5.75-1.72 1.66-4.14 2.53-6.52 2.37-2.73-.12-5.32-1.73-6.66-4.14-1.63-2.88-1.2-6.67 1.05-9.1C3.86 8.16 5.86 7.27 8 7.26c.72-.01 1.43.09 2.13.29V11.5c-.71-.24-1.48-.31-2.22-.19-1.39.2-2.65 1.07-3.26 2.32-.85 1.7-.49 3.92 1.02 5.22 1.25 1.08 3.02 1.4 4.58.78 1.34-.51 2.24-1.84 2.29-3.28.02-3.14.01-6.28.02-9.42-.01-2.29.02-4.58-.02-6.87z" />
  </svg>
)

export default function HubungiKamiPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
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
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: 'Pesan Kolaborasi & Tanya Jawab - GET IN TOUCH',
          category: 'kerjasama',
          message: formData.message
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Terjadi kesalahan saat mengirim pesan.')
      }

      setIsSubmitted(true)
      setFormData({ name: '', email: '', message: '' })
      
      // Auto-hide success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false)
      }, 5000)

    } catch (error: any) {
      setSubmitError(error.message || 'Gagal mengirim pesan. Silakan coba lagi.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen bg-[#030a08] text-slate-200 relative overflow-hidden pt-36 pb-20">
      {/* Background radial glow */}
      <div className="absolute top-0 left-0 right-0 h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.08),transparent_60%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Get In Touch Info */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-300 to-teal-400 mb-6 uppercase">
                GET IN TOUCH
              </h1>
              <p className="text-lg text-slate-400 leading-relaxed font-medium">
                Mari berkolaborasi untuk menciptakan solusi keberlanjutan yang berdampak nyata. Saya selalu terbuka untuk berdiskusi, bertukar ide kreatif, maupun mendukung inisiatif hijau Anda. Silakan hubungi saya kapan saja!
              </p>
            </div>

            {/* Email Contact Detail */}
            <div className="flex items-center space-x-4 group p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-emerald-500/20 hover:bg-white/[0.04] transition-all duration-300">
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 transition-colors group-hover:bg-emerald-500/20">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-slate-500 font-bold">Email Kontak</p>
                <a 
                  href="mailto:rhizkymema@gmail.com" 
                  className="text-lg text-white hover:text-emerald-400 transition-colors font-semibold select-all"
                >
                  rhizkymema@gmail.com
                </a>
              </div>
            </div>

            {/* Social Media Link Icons */}
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-widest text-slate-500 font-bold">Tautan Sosial</p>
              <div className="flex flex-wrap gap-3">
                <a 
                  href="https://www.linkedin.com/in/rizky-oktavian-teddy-mema-947336370?utm_source=share_via&utm_content=profile&utm_medium=member_android" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-3.5 bg-slate-950/60 border border-white/5 rounded-xl hover:border-emerald-500/30 text-slate-400 hover:text-emerald-400 hover:shadow-[0_0_15px_rgba(16,185,129,0.15)] transition-all duration-300"
                  title="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a 
                  href="https://www.instagram.com/rizkymema?igsh=cGJ5NjBuZm41NXc2" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-3.5 bg-slate-950/60 border border-white/5 rounded-xl hover:border-emerald-500/30 text-slate-400 hover:text-emerald-400 hover:shadow-[0_0_15px_rgba(16,185,129,0.15)] transition-all duration-300"
                  title="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a 
                  href="https://www.tiktok.com/@rizkymema?_r=1&_t=ZS-96lBF3ty06i" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-3.5 bg-slate-950/60 border border-white/5 rounded-xl hover:border-emerald-500/30 text-slate-400 hover:text-emerald-400 hover:shadow-[0_0_15px_rgba(16,185,129,0.15)] transition-all duration-300"
                  title="TikTok"
                >
                  <TikTokIcon className="h-5 w-5" />
                </a>
                <a 
                  href="https://github.com/Rizkymema" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-3.5 bg-slate-950/60 border border-white/5 rounded-xl hover:border-emerald-500/30 text-slate-400 hover:text-emerald-400 hover:shadow-[0_0_15px_rgba(16,185,129,0.15)] transition-all duration-300"
                  title="GitHub"
                >
                  <Github className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Spam Protection & Security Statement */}
            <div className="p-4 bg-emerald-950/10 border border-emerald-500/10 rounded-2xl flex items-start space-x-3 text-xs text-slate-500 max-w-md">
              <ShieldCheck className="h-5 w-5 text-emerald-500/50 flex-shrink-0 mt-0.5" />
              <p className="leading-relaxed font-medium">
                <strong>Jaminan Keamanan:</strong> Data yang Anda kirim melalui formulir ini terenkripsi dengan aman untuk melindungi privasi Anda dari spam dan akses pihak ketiga yang tidak bertanggung jawab.
              </p>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <Card className="border border-white/5 bg-slate-950/30 backdrop-blur-xl shadow-2xl rounded-3xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
              
              <CardContent className="p-8">
                {isSubmitted && (
                  <Alert className="mb-6 border-emerald-500/20 bg-emerald-500/10 text-emerald-400 rounded-xl">
                    <CheckCircle className="h-4 w-4 text-emerald-400" />
                    <AlertDescription className="font-semibold">
                      Terima kasih! Pesan Anda telah berhasil terkirim. Saya akan merespons segera.
                    </AlertDescription>
                  </Alert>
                )}

                {submitError && (
                  <Alert className="mb-6 border-rose-500/20 bg-rose-500/10 text-rose-450 rounded-xl">
                    <AlertDescription className="font-semibold">
                      {submitError}
                    </AlertDescription>
                  </Alert>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-slate-300 font-bold text-xs uppercase tracking-wider">
                      Nama Lengkap
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Masukkan nama Anda"
                      className="bg-slate-950/60 border-white/10 text-white rounded-xl focus:border-emerald-500/50 focus:ring-emerald-500/30 placeholder:text-slate-650 h-12"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-slate-300 font-bold text-xs uppercase tracking-wider">
                      Alamat Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="contoh@email.com"
                      className="bg-slate-950/60 border-white/10 text-white rounded-xl focus:border-emerald-500/50 focus:ring-emerald-500/30 placeholder:text-slate-650 h-12"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-slate-300 font-bold text-xs uppercase tracking-wider">
                      Pesan
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tulis pesan atau detail kolaborasi Anda di sini..."
                      rows={6}
                      className="bg-slate-950/60 border-white/10 text-white rounded-xl focus:border-emerald-500/50 focus:ring-emerald-500/30 placeholder:text-slate-650 resize-none"
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-6 rounded-2xl transition-all duration-300 hover:shadow-[0_0_25px_rgba(16,185,129,0.25)] disabled:opacity-50 disabled:hover:shadow-none flex items-center justify-center gap-2 text-sm"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin text-white" />
                        Sedang Mengirim...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 text-white" />
                        Kirim Pesan
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </div>
  )
}
