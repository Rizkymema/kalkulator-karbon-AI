import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function POST(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    // Cek autentikasi dan otorisasi
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const userId = params.userId;

    // Dapatkan user yang akan diubah
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        role: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    // Toggle role: ADMIN <-> USER
    const newRole = user.role === "ADMIN" ? "USER" : "ADMIN";

    // Update role pengguna
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        role: newRole,
      },
    });

    return NextResponse.json(
      { message: "Role updated successfully", newRole },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error toggling user role:", error);
    return NextResponse.json(
      { message: "An error occurred while updating user role" },
      { status: 500 }
    );
  }
}
