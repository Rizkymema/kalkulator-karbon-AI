import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/db"

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      )
    }

    // Ambil data emisi user sesuai schema yang benar
    const emissions = await prisma.emissionRecord.findMany({
      where: {
        userId: session.user.id
      },
      orderBy: {
        tanggal: 'desc'
      },
      select: {
        id: true,
        totalEmisi: true,
        pohonDibutuhkan: true,
        aksiTebus: true,
        tanggal: true,
        emissionData: true,
        createdAt: true
      }
    })

    // Parse emissionData JSON dan format untuk frontend
    const formattedEmissions = emissions.map(emission => {
      let parsedData = {}
      try {
        if (emission.emissionData) {
          parsedData = JSON.parse(emission.emissionData)
        }
      } catch (e) {
        console.error('Error parsing emissionData:', e)
      }
      
      return {
        id: emission.id,
        totalEmisi: emission.totalEmisi,
        pohonDibutuhkan: emission.pohonDibutuhkan,
        aksiTebus: emission.aksiTebus,
        tanggal: emission.tanggal,
        createdAt: emission.createdAt,
        ...parsedData
      }
    })

    return NextResponse.json(formattedEmissions)

  } catch (error) {
    console.error("Error fetching emissions:", error)
    return NextResponse.json(
      { message: "Terjadi kesalahan saat mengambil data emisi" },
      { status: 500 }
    )
  }
}

// POST - Simpan data emisi baru
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Unauthorized. Silakan login terlebih dahulu." },
        { status: 401 }
      )
    }

    const body = await req.json()
    const { totalEmisi, pohonDibutuhkan, aksiTebus, emissionData } = body

    // Validasi input
    if (totalEmisi === undefined || pohonDibutuhkan === undefined) {
      return NextResponse.json(
        { message: "Data emisi tidak lengkap" },
        { status: 400 }
      )
    }

    // Simpan ke database
    const newEmission = await prisma.emissionRecord.create({
      data: {
        userId: session.user.id,
        totalEmisi: parseFloat(totalEmisi) || 0,
        pohonDibutuhkan: parseInt(pohonDibutuhkan) || 0,
        aksiTebus: aksiTebus || null,
        tanggal: new Date(),
        emissionData: emissionData ? JSON.stringify(emissionData) : null,
      }
    })

    return NextResponse.json({
      message: "Data emisi berhasil disimpan",
      data: {
        id: newEmission.id,
        totalEmisi: newEmission.totalEmisi,
        pohonDibutuhkan: newEmission.pohonDibutuhkan,
        aksiTebus: newEmission.aksiTebus,
        tanggal: newEmission.tanggal,
      }
    }, { status: 201 })

  } catch (error) {
    console.error("Error saving emission:", error)
    return NextResponse.json(
      { message: "Terjadi kesalahan saat menyimpan data emisi" },
      { status: 500 }
    )
  }
}
