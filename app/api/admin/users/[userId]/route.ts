import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/db"
import bcrypt from "bcryptjs"

// GET - Get single user details
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { message: "Unauthorized - Admin access required" },
        { status: 401 }
      )
    }

    const { userId } = await params

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        emissions: {
          orderBy: { tanggal: 'desc' },
          take: 10,
          select: {
            id: true,
            totalEmisi: true,
            pohonDibutuhkan: true,
            aksiTebus: true,
            tanggal: true,
            createdAt: true
          }
        }
      }
    })

    if (!user) {
      return NextResponse.json(
        { message: "Pengguna tidak ditemukan" },
        { status: 404 }
      )
    }

    const totalEmissions = user.emissions.reduce((sum, e) => sum + (e.totalEmisi || 0), 0)
    const totalTrees = user.emissions.reduce((sum, e) => sum + (e.pohonDibutuhkan || 0), 0)

    return NextResponse.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      city: user.city,
      job: user.job,
      gender: user.gender,
      about: user.about,
      instagram: user.instagram,
      image: user.image,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      totalEmissions,
      totalTrees,
      calculationCount: user.emissions.length,
      recentEmissions: user.emissions
    })

  } catch (error) {
    console.error("Error fetching user:", error)
    return NextResponse.json(
      { message: "Terjadi kesalahan saat mengambil data pengguna" },
      { status: 500 }
    )
  }
}

// PUT - Update user
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { message: "Unauthorized - Admin access required" },
        { status: 401 }
      )
    }

    const { userId } = await params
    const body = await req.json()
    const { name, email, password, role, phone, city, job, gender, about } = body

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id: userId }
    })

    if (!existingUser) {
      return NextResponse.json(
        { message: "Pengguna tidak ditemukan" },
        { status: 404 }
      )
    }

    // Check if email already exists (if email is being changed)
    if (email && email !== existingUser.email) {
      const emailExists = await prisma.user.findUnique({
        where: { email }
      })

      if (emailExists) {
        return NextResponse.json(
          { message: "Email sudah digunakan pengguna lain" },
          { status: 400 }
        )
      }
    }

    // Build update data
    const updateData: any = {}
    if (name) updateData.name = name
    if (email) updateData.email = email
    if (role) updateData.role = role.toUpperCase()
    if (phone !== undefined) updateData.phone = phone
    if (city !== undefined) updateData.city = city
    if (job !== undefined) updateData.job = job
    if (gender !== undefined) updateData.gender = gender
    if (about !== undefined) updateData.about = about
    
    // Hash password if provided
    if (password) {
      updateData.hashedPassword = bcrypt.hashSync(password, 10)
    }

    // Update user
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData
    })

    return NextResponse.json({
      message: "Pengguna berhasil diperbarui",
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role
      }
    })

  } catch (error) {
    console.error("Error updating user:", error)
    return NextResponse.json(
      { message: "Terjadi kesalahan saat memperbarui pengguna" },
      { status: 500 }
    )
  }
}

// DELETE - Delete user
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { message: "Unauthorized - Admin access required" },
        { status: 401 }
      )
    }

    const { userId } = await params

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id: userId }
    })

    if (!existingUser) {
      return NextResponse.json(
        { message: "Pengguna tidak ditemukan" },
        { status: 404 }
      )
    }

    // Prevent deleting self
    if (existingUser.id === session.user.id) {
      return NextResponse.json(
        { message: "Tidak dapat menghapus akun sendiri" },
        { status: 400 }
      )
    }

    // Delete user's emissions first
    await prisma.emissionRecord.deleteMany({
      where: { userId }
    })

    // Delete user
    await prisma.user.delete({
      where: { id: userId }
    })

    return NextResponse.json({
      message: "Pengguna berhasil dihapus"
    })

  } catch (error) {
    console.error("Error deleting user:", error)
    return NextResponse.json(
      { message: "Terjadi kesalahan saat menghapus pengguna" },
      { status: 500 }
    )
  }
}
