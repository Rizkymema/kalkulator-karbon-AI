const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Memulai seeder untuk Karwanua...');

  try {
    // Hash password untuk admin
    const adminPassword = await bcrypt.hash('admin123', 10);
    
    // Buat admin utama
    const admin = await prisma.user.upsert({
      where: { email: 'admin@karwanua.com' },
      update: {},
      create: {
        name: 'Admin Karwanua',
        email: 'admin@karwanua.com',
        hashedPassword: adminPassword,
        role: 'ADMIN',
      },
    });

    console.log('✅ Admin berhasil dibuat:', admin.email);

    // Buat beberapa user contoh untuk testing
    const userPassword = await bcrypt.hash('user123', 10);
    
    const user1 = await prisma.user.upsert({
      where: { email: 'user1@example.com' },
      update: {},
      create: {
        name: 'Budi Karbon',
        email: 'user1@example.com',
        hashedPassword: userPassword,
        role: 'USER',
      },
    });

    console.log('✅ User 1 berhasil dibuat:', user1.email);

    const user2 = await prisma.user.upsert({
      where: { email: 'sari@example.com' },
      update: {},
      create: {
        name: 'Sari Hijau',
        email: 'sari@example.com',
        hashedPassword: userPassword,
        role: 'USER',
      },
    });

    console.log('✅ User 2 berhasil dibuat:', user2.email);

    // Buat data emisi contoh untuk user
    const emissionData = [
      { userId: user1.id, type: 'TRANSPORT', amount: 2.5, description: 'Perjalanan ke kantor', date: new Date('2024-01-15') },
      { userId: user1.id, type: 'ENERGY', amount: 1.8, description: 'Konsumsi listrik rumah', date: new Date('2024-01-16') },
      { userId: user1.id, type: 'FOOD', amount: 0.9, description: 'Makan di restoran', date: new Date('2024-01-17') },
      { userId: user2.id, type: 'TRANSPORT', amount: 3.2, description: 'Liburan ke Bandung', date: new Date('2024-01-18') },
      { userId: user2.id, type: 'ENERGY', amount: 2.1, description: 'AC rumah', date: new Date('2024-01-19') },
    ];

    for (const emission of emissionData) {
      await prisma.emissionRecord.upsert({
        where: { id: `${emission.userId}-${emission.type}-${emission.date.getTime()}` },
        update: {},
        create: emission,
      });
    }

    console.log('✅ Data emisi contoh berhasil dibuat');

    console.log('\n🎉 Seeder selesai! Akun yang tersedia:');
    console.log('📧 Admin: admin@karwanua.com | Password: admin123');
    console.log('📧 User 1: user1@example.com | Password: user123');
    console.log('📧 User 2: sari@example.com | Password: user123');

  } catch (error) {
    console.error('❌ Error saat menjalankan seeder:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
