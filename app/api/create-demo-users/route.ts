import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/db";

async function createDemoUsers() {
  console.log('🌱 Membuat demo users...');

  try {
    // Admin user
    const adminPassword = await bcrypt.hash('admin123', 10);
    const admin = await prisma.user.upsert({
      where: { email: 'admin@tebuskarbon.com' },
      update: {},
      create: {
        name: 'Admin TebusKarbon',
        email: 'admin@tebuskarbon.com',
        hashedPassword: adminPassword,
        role: 'ADMIN',
      },
    });
    console.log('✅ Admin created:', admin.email);

    // Regular user 
    const userPassword = await bcrypt.hash('user123', 10);
    const user = await prisma.user.upsert({
      where: { email: 'user1@example.com' },
      update: {},
      create: {
        name: 'Demo User',
        email: 'user1@example.com',
        hashedPassword: userPassword,
        role: 'USER',
      },
    });
    console.log('✅ User created:', user.email);

    return { success: true, message: 'Demo users created successfully' };
  } catch (error) {
    console.error('❌ Error creating demo users:', error);
    return { success: false, error: error.message };
  }
}

export async function GET() {
  const result = await createDemoUsers();
  
  if (result.success) {
    return NextResponse.json({ 
      message: 'Demo users created successfully',
      credentials: {
        admin: { email: 'admin@tebuskarbon.com', password: 'admin123' },
        user: { email: 'user1@example.com', password: 'user123' }
      }
    });
  } else {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }
}
