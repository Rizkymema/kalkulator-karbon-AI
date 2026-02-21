import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Memulai seeder untuk TebusKarbon...')

  // Hash password untuk admin
  const adminPassword = bcrypt.hashSync('admin123', 10)
  
  // Buat admin utama
  const admin = await prisma.user.upsert({
    where: { email: 'admin@tebuskarbon.com' },
    update: {
      hashedPassword: adminPassword,
    },
    create: {
      name: 'Admin TebusKarbon',
      email: 'admin@tebuskarbon.com',
      hashedPassword: adminPassword,
      role: 'ADMIN',
    },
  })

  console.log('✅ Admin berhasil dibuat:', admin.email)

  // Buat beberapa user contoh untuk testing
  const userPassword = bcrypt.hashSync('user123', 10)
  
  const user1 = await prisma.user.upsert({
    where: { email: 'user1@example.com' },
    update: {
      hashedPassword: userPassword,
    },
    create: {
      name: 'Pengguna Demo 1',
      email: 'user1@example.com',
      hashedPassword: userPassword,
      role: 'USER',
    },
  })

  const user2 = await prisma.user.upsert({
    where: { email: 'user2@example.com' },
    update: {
      hashedPassword: userPassword,
    },
    create: {
      name: 'Pengguna Demo 2',
      email: 'user2@example.com',
      hashedPassword: userPassword,
      role: 'USER',
    },
  })

  console.log('✅ User demo berhasil dibuat:', user1.email, user2.email)

  // Buat beberapa data emisi contoh untuk user demo (sesuai schema)
  await prisma.emissionRecord.createMany({
    data: [
      {
        userId: user1.id,
        totalEmisi: 286.0,
        pohonDibutuhkan: 13,
        aksiTebus: 'tanam',
        emissionData: JSON.stringify({
          transportasi: { jenisKendaraan: 'mobil_pribadi', jarakTempuh: 30, frekuensi: 5 },
          listrik: { kwh: 350, jenisListrik: 'pln_standar' },
          makanan: { polaMakan: 'omnivora', dagingMerah: 3, dagingPutih: 4 },
          sampah: { volumenSampah: 'sedang', memilahSampah: false, kantongPlastik: 5 },
        }),
      },
      {
        userId: user1.id,
        totalEmisi: 245.5,
        pohonDibutuhkan: 11,
        aksiTebus: 'donasi',
        emissionData: JSON.stringify({
          transportasi: { jenisKendaraan: 'motor', jarakTempuh: 20, frekuensi: 6 },
          listrik: { kwh: 280, jenisListrik: 'pln_standar' },
          makanan: { polaMakan: 'flexitarian', dagingMerah: 1, dagingPutih: 3 },
          sampah: { volumenSampah: 'kecil', memilahSampah: true, kantongPlastik: 2 },
        }),
      },
      {
        userId: user2.id,
        totalEmisi: 360.0,
        pohonDibutuhkan: 16,
        aksiTebus: 'tantangan',
        emissionData: JSON.stringify({
          transportasi: { jenisKendaraan: 'mobil_pribadi', jarakTempuh: 50, frekuensi: 5 },
          listrik: { kwh: 450, jenisListrik: 'pln_standar' },
          makanan: { polaMakan: 'omnivora', dagingMerah: 5, dagingPutih: 5 },
          sampah: { volumenSampah: 'besar', memilahSampah: false, kantongPlastik: 10 },
        }),
      },
    ],
  })

  console.log('✅ Data emisi contoh berhasil dibuat')
  console.log('🎉 Seeder selesai!')
  console.log('')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('📝 Kredensial Login:')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('👑 Admin: admin@tebuskarbon.com / admin123')
  console.log('👤 User 1: user1@example.com / user123')
  console.log('👤 User 2: user2@example.com / user123')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ Error dalam seeder:', e)
    await prisma.$disconnect()
    process.exit(1)
  })
