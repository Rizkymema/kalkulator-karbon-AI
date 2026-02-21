import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/db"
import bcrypt from "bcrypt"

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
    const { currentPassword, newPassword } = body

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { message: "Password saat ini dan password baru harus diisi" },
        { status: 400 }
      )
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { message: "Password baru minimal 6 karakter" },
        { status: 400 }
      )
    }

    // Ambil user dari database
    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id
      }
    })

    if (!user || !user.hashedPassword) {
      return NextResponse.json(
        { message: "User tidak ditemukan" },
        { status: 404 }
      )
    }

    // Verifikasi password saat ini
    const isCurrentPasswordValid = await bcrypt.compare(
      currentPassword,
      user.hashedPassword
    )

    if (!isCurrentPasswordValid) {
      return NextResponse.json(
        { message: "Password saat ini salah" },
        { status: 400 }
      )
    }

    // Hash password baru
    const hashedNewPassword = await bcrypt.hash(newPassword, 10)

    // Update password
    await prisma.user.update({
      where: {
        id: session.user.id
      },
      data: {
        hashedPassword: hashedNewPassword
      }
    })

    return NextResponse.json({
      message: "Password berhasil diubah"
    })

  } catch (error) {
    console.error("Error changing password:", error)
    return NextResponse.json(
      { message: "Terjadi kesalahan saat mengubah password" },
      { status: 500 }
    )
  }
}
