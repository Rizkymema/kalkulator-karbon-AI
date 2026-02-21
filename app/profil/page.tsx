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
    if (status === "unauthenticated") {
      router.push("/login")
    }

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
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>
  }

  if (!session) {
    return null
  }

  const userInitial = session.user.name?.charAt(0).toUpperCase() || session.user.email?.charAt(0).toUpperCase() || "K"

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">Profil Pengguna</h1>
            <p className="text-blue-100">Beranda / Profil Pengguna</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* User Avatar and Name */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center space-x-4">
            <div className="h-20 w-20 bg-blue-600 rounded-lg flex items-center justify-center text-white text-2xl font-bold">
              {userInitial}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">{profile.name || "Kohibox Tugas"}</h2>
              <p className="text-gray-500">Klik untuk ubah Avatar</p>
            </div>
          </div>
        </div>

        {/* Alert Messages */}
        {message && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <AlertDescription className="text-green-800">{message}</AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertDescription className="text-red-800">{error}</AlertDescription>
          </Alert>
        )}

        {/* Profile Form */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h3 className="text-lg font-semibold text-green-600 mb-6">Perbarui Profil</h3>
          
          <form onSubmit={handleUpdateProfile} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name" className="text-gray-700 font-medium">Nama Lengkap</Label>
                <Input
                  id="name"
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Kohibox Tugas"
                  className="mt-1"
                  required
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-gray-700 font-medium">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="stripaikah@gmail.com"
                  className="mt-1"
                  required
                />
              </div>

              <div>
                <Label className="text-gray-700 font-medium">Jenis Kelamin</Label>
                <div className="mt-2 space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      value="Laki-laki"
                      checked={profile.gender === "Laki-laki"}
                      onChange={(e) => setProfile(prev => ({ ...prev, gender: e.target.value }))}
                      className="form-radio text-blue-600"
                    />
                    <span className="ml-2 text-gray-700">Laki-laki</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      value="Perempuan"
                      checked={profile.gender === "Perempuan"}
                      onChange={(e) => setProfile(prev => ({ ...prev, gender: e.target.value }))}
                      className="form-radio text-blue-600"
                    />
                    <span className="ml-2 text-gray-700">Perempuan</span>
                  </label>
                </div>
              </div>

              <div>
                <Label htmlFor="phone" className="text-gray-700 font-medium">Nomor Telepon</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="Nomor Telepon"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="job" className="text-gray-700 font-medium">Pekerjaan</Label>
                <Input
                  id="job"
                  type="text"
                  value={profile.job}
                  onChange={(e) => setProfile(prev => ({ ...prev, job: e.target.value }))}
                  placeholder="Pekerjaan"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="city" className="text-gray-700 font-medium">Kota</Label>
                <Input
                  id="city"
                  type="text"
                  value={profile.city}
                  onChange={(e) => setProfile(prev => ({ ...prev, city: e.target.value }))}
                  placeholder="Kota"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="instagram" className="text-gray-700 font-medium">Instagram</Label>
                <Input
                  id="instagram"
                  type="text"
                  value={profile.instagram}
                  onChange={(e) => setProfile(prev => ({ ...prev, instagram: e.target.value }))}
                  placeholder="Instagram"
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="about" className="text-gray-700 font-medium">About Me</Label>
              <textarea
                id="about"
                value={profile.about}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setProfile(prev => ({ ...prev, about: e.target.value }))}
                placeholder="About Me"
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                rows={4}
              />
            </div>

            <div className="flex justify-end">
              <Button 
                type="submit" 
                disabled={isLoading}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-2 rounded-lg"
              >
                {isLoading ? "Menyimpan..." : "Simpan Profil"}
              </Button>
            </div>
          </form>
        </div>

        {/* Change Password Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-green-600 mb-6">Ubah Password</h3>
          
          <form onSubmit={handleChangePassword} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="currentPassword" className="text-gray-700 font-medium">Password Lama</Label>
                <div className="relative mt-1">
                  <Input
                    id="currentPassword"
                    type={showPassword ? "text" : "password"}
                    value={passwords.currentPassword}
                    onChange={(e) => setPasswords(prev => ({ ...prev, currentPassword: e.target.value }))}
                    placeholder="Password Lama"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4 text-gray-400" /> : <Eye className="h-4 w-4 text-gray-400" />}
                  </button>
                </div>
              </div>

              <div>
                <Label htmlFor="newPassword" className="text-gray-700 font-medium">Password Baru</Label>
                <div className="relative mt-1">
                  <Input
                    id="newPassword"
                    type={showPassword ? "text" : "password"}
                    value={passwords.newPassword}
                    onChange={(e) => setPasswords(prev => ({ ...prev, newPassword: e.target.value }))}
                    placeholder="Password Baru"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button 
                type="submit" 
                disabled={isLoading}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-2 rounded-lg"
              >
                {isLoading ? "Menyimpan..." : "Simpan Profil"}
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
      <div className="min-h-screen bg-slate-50">
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
