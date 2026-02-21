// Script untuk membuat user demo
// Jalankan dengan: node scripts/create-demo-users.js

const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt')

const prisma = new PrismaClient()

async function createDemoUsers() {
  console.log('🌱 Membuat user demo...')

  try {
    // Hash password
    const adminPassword = await bcrypt.hash('admin123', 10)
    const userPassword = await bcrypt.hash('user123', 10)
    
    // Buat admin
    const admin = await prisma.user.upsert({
      where: { email: 'admin@tebuskarbon.com' },
      update: {},
      create: {
        name: 'Admin TebusKarbon',
        email: 'admin@tebuskarbon.com',
        hashedPassword: adminPassword,
        role: 'ADMIN',
      },
    })

    console.log('✅ Admin berhasil dibuat:', admin.email)

    // Buat user demo
    const user1 = await prisma.user.upsert({
      where: { email: 'user1@example.com' },
      update: {},
      create: {
        name: 'User Demo 1',
        email: 'user1@example.com',
        hashedPassword: userPassword,
        role: 'USER',
      },
    })

    console.log('✅ User demo berhasil dibuat:', user1.email)

    console.log('🎉 Selesai!')
    console.log('')
    console.log('📝 Kredensial Login:')
    console.log('Admin: admin@tebuskarbon.com / admin123')
    console.log('User: user1@example.com / user123')

  } catch (error) {
    console.error('❌ Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

createDemoUsers()
