"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff } from "lucide-react"
import AdminSidebar from "@/app/admin/components/AdminSidebar"

function ProfilContent() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  // Form states
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    gender: "",
    phone: "",
    job: "",
    city: "",
    instagram: "",
    about: ""
  })

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: ""
  })

  useEffect(() => {
    if (session?.user) {
      setProfile(prev => ({
        ...prev,
        name: session.user.name || "",
        email: session.user.email || ""
      }))
    }
  }, [session, status, router])

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage("")
    setError("")

    try {
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: profile.name, email: profile.email }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage("Profil berhasil diperbarui!")
      } else {
        setError(data.message || "Gagal memperbarui profil")
      }
    } catch (error) {
      setError("Terjadi kesalahan saat memperbarui profil")
    } finally {
      setIsLoading(false)
    }
  }

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage("")
    setError("")

    if (passwords.newPassword.length < 6) {
      setError("Password baru minimal 6 karakter")
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch('/api/user/change-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          currentPassword: passwords.currentPassword, 
          newPassword: passwords.newPassword 
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage("Password berhasil diubah!")
        setPasswords({ currentPassword: "", newPassword: "" })
      } else {
        setError(data.message || "Gagal mengubah password")
      }
    } catch (error) {
      setError("Terjadi kesalahan saat mengubah password")
    } finally {
      setIsLoading(false)
    }
  }

  if (status === "loading") {
    return <div className="flex justify-center items-center min-h-screen bg-[#030a08] text-slate-200">Loading...</div>
  }

  const userInitial = session?.user?.name?.charAt(0).toUpperCase() || session?.user?.email?.charAt(0).toUpperCase() || "K"

  return (
    <div className="min-h-screen bg-[#030a08] text-slate-200 pt-36 pb-12 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-0 left-0 right-0 h-[400px] bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.06),transparent_50%)] pointer-events-none" />
      
      {/* Header */}
      <div className="bg-gradient-to-b from-[#061814] to-slate-950/90 border-b border-white/5 py-12 relative z-10">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center">
            <h1 className="text-3xl font-black font-display uppercase tracking-tight text-white mb-2">Profil Pengguna</h1>
            <p className="text-slate-400 font-medium">Beranda / Profil Pengguna</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8 relative z-10">
        {/* User Avatar and Name */}
        <div className="bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-xl p-6 mb-6">
          <div className="flex items-center space-x-4">
            <div className="h-20 w-20 bg-emerald-600 rounded-lg flex items-center justify-center text-white text-2xl font-bold">
              {userInitial}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">{profile.name || "Kohibox Tugas"}</h2>
              <p className="text-slate-400 text-sm font-medium">Klik untuk ubah Avatar</p>
            </div>
          </div>
        </div>

        {/* Alert Messages */}
        {message && (
          <Alert className="mb-6 border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert className="mb-6 border-rose-500/20 bg-rose-500/10 text-rose-450">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Profile Form */}
        <div className="bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-xl p-6 mb-6">
          <h3 className="text-lg font-bold text-emerald-400 mb-6 uppercase tracking-wider">Perbarui Profil</h3>
          
          <form onSubmit={handleUpdateProfile} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name" className="text-slate-300 font-bold text-xs uppercase tracking-wider">Nama Lengkap</Label>
                <Input
                  id="name"
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Kohibox Tugas"
                  className="mt-1 bg-slate-950/60 border-white/5 text-white"
                  required
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-slate-300 font-bold text-xs uppercase tracking-wider">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="stripaikah@gmail.com"
                  className="mt-1 bg-slate-950/60 border-white/5 text-white"
                  required
                />
              </div>

              <div>
                <Label className="text-slate-300 font-bold text-xs uppercase tracking-wider">Jenis Kelamin</Label>
                <div className="mt-2 space-x-4">
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="radio"
                      value="Laki-laki"
                      checked={profile.gender === "Laki-laki"}
                      onChange={(e) => setProfile(prev => ({ ...prev, gender: e.target.value }))}
                      className="form-radio text-emerald-500 bg-slate-950 border-white/5"
                    />
                    <span className="ml-2 text-slate-300 font-semibold text-sm">Laki-laki</span>
                  </label>
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="radio"
                      value="Perempuan"
                      checked={profile.gender === "Perempuan"}
                      onChange={(e) => setProfile(prev => ({ ...prev, gender: e.target.value }))}
                      className="form-radio text-emerald-500 bg-slate-950 border-white/5"
                    />
                    <span className="ml-2 text-slate-300 font-semibold text-sm">Perempuan</span>
                  </label>
                </div>
              </div>

              <div>
                <Label htmlFor="phone" className="text-slate-300 font-bold text-xs uppercase tracking-wider">Nomor Telepon</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="Nomor Telepon"
                  className="mt-1 bg-slate-950/60 border-white/5 text-white"
                />
              </div>

              <div>
                <Label htmlFor="job" className="text-slate-300 font-bold text-xs uppercase tracking-wider">Pekerjaan</Label>
                <Input
                  id="job"
                  type="text"
                  value={profile.job}
                  onChange={(e) => setProfile(prev => ({ ...prev, job: e.target.value }))}
                  placeholder="Pekerjaan"
                  className="mt-1 bg-slate-950/60 border-white/5 text-white"
                />
              </div>

              <div>
                <Label htmlFor="city" className="text-slate-300 font-bold text-xs uppercase tracking-wider">Kota</Label>
                <Input
                  id="city"
                  type="text"
                  value={profile.city}
                  onChange={(e) => setProfile(prev => ({ ...prev, city: e.target.value }))}
                  placeholder="Kota"
                  className="mt-1 bg-slate-950/60 border-white/5 text-white"
                />
              </div>

              <div>
                <Label htmlFor="instagram" className="text-slate-300 font-bold text-xs uppercase tracking-wider">Instagram</Label>
                <Input
                  id="instagram"
                  type="text"
                  value={profile.instagram}
                  onChange={(e) => setProfile(prev => ({ ...prev, instagram: e.target.value }))}
                  placeholder="Instagram"
                  className="mt-1 bg-slate-950/60 border-white/5 text-white"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="about" className="text-slate-300 font-bold text-xs uppercase tracking-wider">About Me</Label>
              <textarea
                id="about"
                value={profile.about}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setProfile(prev => ({ ...prev, about: e.target.value }))}
                placeholder="About Me"
                className="mt-1 w-full px-3 py-2 bg-slate-950/60 border border-white/5 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white text-sm"
                rows={4}
              />
            </div>

            <div className="flex justify-end">
              <Button 
                type="submit" 
                disabled={isLoading}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-2 rounded-xl font-bold shadow-md"
              >
                {isLoading ? "Menyimpan..." : "Simpan Profil"}
              </Button>
            </div>
          </form>
        </div>

        {/* Change Password Section */}
        <div className="bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-xl p-6">
          <h3 className="text-lg font-bold text-emerald-400 mb-6 uppercase tracking-wider">Ubah Password</h3>
          
          <form onSubmit={handleChangePassword} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="currentPassword" className="text-slate-300 font-bold text-xs uppercase tracking-wider">Password Lama</Label>
                <div className="relative mt-1">
                  <Input
                    id="currentPassword"
                    type={showPassword ? "text" : "password"}
                    value={passwords.currentPassword}
                    onChange={(e) => setPasswords(prev => ({ ...prev, currentPassword: e.target.value }))}
                    placeholder="Password Lama"
                    className="bg-slate-950/60 border-white/5 text-white"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4 text-slate-400" /> : <Eye className="h-4 w-4 text-slate-400" />}
                  </button>
                </div>
              </div>

              <div>
                <Label htmlFor="newPassword" className="text-slate-300 font-bold text-xs uppercase tracking-wider">Password Baru</Label>
                <div className="relative mt-1">
                  <Input
                    id="newPassword"
                    type={showPassword ? "text" : "password"}
                    value={passwords.newPassword}
                    onChange={(e) => setPasswords(prev => ({ ...prev, newPassword: e.target.value }))}
                    placeholder="Password Baru"
                    className="bg-slate-950/60 border-white/5 text-white"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button 
                type="submit" 
                disabled={isLoading}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-2 rounded-xl font-bold shadow-md"
              >
                {isLoading ? "Menyimpan..." : "Simpan Password"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default function ProfilPage() {
  const { data: session } = useSession()
  
  // If user is admin, use admin layout with sidebar
  if (session?.user?.role === 'ADMIN') {
    return (
      <div className="min-h-screen bg-slate-950">
        <AdminSidebar />
        <main className="ml-64 p-8">
          <ProfilContent />
        </main>
      </div>
    )
  }
  
  // For regular users, use normal layout (navbar will be hidden by ClientLayout for admin)
  return <ProfilContent />
}
