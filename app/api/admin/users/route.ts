import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/db"
import bcrypt from "bcryptjs"

// GET - List all users with their emission data
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { message: "Unauthorized - Admin access required" },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search') || ''
    const role = searchParams.get('role') || 'all'

    const skip = (page - 1) * limit

    // Build where clause
    const where: any = {}
    
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { email: { contains: search } }
      ]
    }
    
    if (role !== 'all') {
      where.role = role.toUpperCase()
    }

    // Get users with emissions
    const users = await prisma.user.findMany({
      where,
      include: {
        emissions: {
          select: {
            totalEmisi: true,
            pohonDibutuhkan: true,
            tanggal: true
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit
    })

    // Get total count
    const totalUsers = await prisma.user.count({ where })

    // Transform data
    const usersData = users.map(user => {
      const totalEmissions = user.emissions.reduce((sum, e) => sum + (e.totalEmisi || 0), 0)
      const totalTrees = user.emissions.reduce((sum, e) => sum + (e.pohonDibutuhkan || 0), 0)
      const lastActivity = user.emissions.length > 0 
        ? user.emissions.sort((a, b) => new Date(b.tanggal).getTime() - new Date(a.tanggal).getTime())[0]?.tanggal
        : user.createdAt
      
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        city: user.city,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        totalEmissions,
        totalTrees,
        calculationCount: user.emissions.length,
        lastActivity
      }
    })

    return NextResponse.json({
      users: usersData,
      pagination: {
        page,
        limit,
        totalUsers,
        totalPages: Math.ceil(totalUsers / limit)
      }
    })

  } catch (error) {
    console.error("Error fetching users:", error)
    return NextResponse.json(
      { message: "Terjadi kesalahan saat mengambil data pengguna" },
      { status: 500 }
    )
  }
}

// POST - Create new user
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { message: "Unauthorized - Admin access required" },
        { status: 401 }
      )
    }

    const body = await req.json()
    const { name, email, password, role } = body

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Nama, email, dan password wajib diisi" },
        { status: 400 }
      )
    }

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { message: "Email sudah terdaftar" },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = bcrypt.hashSync(password, 10)

    // Create user
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword,
        role: role?.toUpperCase() || 'USER'
      }
    })

    return NextResponse.json({
      message: "Pengguna berhasil dibuat",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    }, { status: 201 })

  } catch (error) {
    console.error("Error creating user:", error)
    return NextResponse.json(
      { message: "Terjadi kesalahan saat membuat pengguna" },
      { status: 500 }
    )
  }
}
