import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/db"

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await req.json()
    const { name, email } = body

    if (!name || !email) {
      return NextResponse.json(
        { message: "Nama dan email harus diisi" },
        { status: 400 }
      )
    }

    // Validasi format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: "Format email tidak valid" },
        { status: 400 }
      )
    }

    // Cek apakah email sudah digunakan oleh user lain
    const existingUser = await prisma.user.findFirst({
      where: {
        email: email.toLowerCase().trim(),
        NOT: {
          id: session.user.id
        }
      }
    })

    if (existingUser) {
      return NextResponse.json(
        { message: "Email sudah digunakan oleh akun lain" },
        { status: 400 }
      )
    }

    // Update user profile
    const updatedUser = await prisma.user.update({
      where: {
        id: session.user.id
      },
      data: {
        name,
        email: email.toLowerCase().trim()
      }
    })

    return NextResponse.json({
      message: "Profil berhasil diperbarui",
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role
      }
    })

  } catch (error) {
    console.error("Error updating profile:", error)
    return NextResponse.json(
      { message: "Terjadi kesalahan saat memperbarui profil" },
      { status: 500 }
    )
  }
}
