import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    // Check authentication and authorization
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const userId = params.userId;
    const body = await req.json();
    const { role, status } = body;

    // Validate inputs
    if (role && !['USER', 'ADMIN', 'MODERATOR'].includes(role)) {
      return NextResponse.json(
        { message: "Invalid role" },
        { status: 400 }
      );
    }

    if (status && !['active', 'inactive', 'suspended'].includes(status)) {
      return NextResponse.json(
        { message: "Invalid status" },
        { status: 400 }
      );
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, role: true, email: true }
    });

    if (!existingUser) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    // Prevent admin from demoting themselves
    if (existingUser.id === session.user.id && role && role !== 'ADMIN') {
      return NextResponse.json(
        { message: "Cannot change your own admin role" },
        { status: 400 }
      );
    }

    // Update user
    const updateData: any = {};
    if (role) updateData.role = role;
    if (status) updateData.status = status;

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true
      }
    });

    return NextResponse.json({
      message: "User updated successfully",
      user: updatedUser
    });

  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    // Check authentication and authorization
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const userId = params.userId;

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true }
    });

    if (!existingUser) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    // Prevent admin from deleting themselves
    if (existingUser.id === session.user.id) {
      return NextResponse.json(
        { message: "Cannot delete your own account" },
        { status: 400 }
      );
    }

    // Delete user and related data
    await prisma.$transaction(async (tx) => {
      // Delete related emissions data first
      await tx.emission.deleteMany({
        where: { userId: userId }
      });

      // Delete the user
      await tx.user.delete({
        where: { id: userId }
      });
    });

    return NextResponse.json({
      message: "User deleted successfully"
    });

  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
