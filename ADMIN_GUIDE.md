# 🔐 Panduan Admin TebusKarbon

## Sistem Admin Manual (Pendekatan 1)

Website TebusKarbon menggunakan sistem admin manual untuk keamanan maksimal. Admin tidak bisa mendaftar sendiri melalui form pendaftaran.

## 🚀 Kredensial Admin Default

Setelah menjalankan seeder, gunakan kredensial berikut untuk login sebagai admin:

**Admin:**
- Email: `admin@tebuskarbon.com`
- Password: `admin123`

**User Demo (untuk testing):**
- Email: `user1@example.com` / Password: `user123`
- Email: `user2@example.com` / Password: `user123`

## 📋 Cara Menjalankan Seeder

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Push database schema:**
   ```bash
   npx prisma db push
   ```

3. **Jalankan seeder:**
   ```bash
   npm run db:seed
   ```

4. **Reset database (jika diperlukan):**
   ```bash
   npm run db:reset
   ```

## 🔑 Menambah Admin Baru

### Metode 1: Melalui Seeder (Recommended)

Edit file `prisma/seed.ts` dan tambahkan admin baru:

```typescript
const newAdmin = await prisma.user.upsert({
  where: { email: 'admin2@tebuskarbon.com' },
  update: {},
  create: {
    name: 'Admin Kedua',
    email: 'admin2@tebuskarbon.com',
    hashedPassword: await bcrypt.hash('password123', 10),
    role: 'ADMIN',
  },
})
```

Kemudian jalankan seeder ulang:
```bash
npm run db:seed
```

### Metode 2: Melalui Database Langsung

Jika menggunakan database viewer (seperti Prisma Studio):

1. **Buka Prisma Studio:**
   ```bash
   npx prisma studio
   ```

2. **Buka tabel User dan tambah record baru:**
   - name: Nama admin
   - email: Email admin
   - hashedPassword: Hash dari password (gunakan bcrypt)
   - role: `ADMIN`

### Metode 3: Script Manual

Buat file script terpisah `scripts/add-admin.js`:

```javascript
const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt')

const prisma = new PrismaClient()

async function addAdmin() {
  const email = 'neradmin@tebuskarbon.com'
  const password = 'securepassword123'
  const name = 'Admin Baru'
  
  const hashedPassword = await bcrypt.hash(password, 10)
  
  const admin = await prisma.user.create({
    data: {
      name,
      email,
      hashedPassword,
      role: 'ADMIN',
    },
  })
  
  console.log('Admin baru berhasil dibuat:', admin.email)
}

addAdmin()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
```

Jalankan dengan:
```bash
node scripts/add-admin.js
```

## 🛡️ Keamanan

### Fitur Keamanan:
1. **Tidak ada pendaftaran admin publik** - Admin hanya bisa dibuat manual
2. **Password di-hash menggunakan bcrypt** - Keamanan password tinggi
3. **Role-based access control** - Pembatasan akses berdasarkan role
4. **Session management** - Autentikasi berbasis JWT

### Best Practices:
1. **Ganti password default** setelah login pertama
2. **Gunakan email corporate** untuk admin
3. **Audit log admin** (akan ditambahkan di versi mendatang)
4. **Backup database secara berkala**

## 🚪 Akses Admin

### Halaman Admin:
- **URL:** `/admin`
- **Requirement:** Role `ADMIN`
- **Fitur:**
  - Dashboard admin
  - Manajemen pengguna
  - Statistik website
  - Toggle role pengguna

### Navigasi:
- Admin akan melihat menu "Admin Panel" di navbar
- Dashboard admin terpisah dari dashboard pengguna biasa

## 🔄 Pemeliharaan

### Menghapus Admin:
1. Login sebagai admin lain
2. Akses database langsung
3. Hapus record dari tabel User

### Mereset Password Admin:
1. Edit seeder dengan password baru
2. Jalankan `npm run db:seed`
3. Atau update langsung di database

### Backup Admin:
Selalu pastikan ada minimal 2 admin aktif untuk menghindari lockout.

## 📞 Troubleshooting

### Tidak bisa login sebagai admin:
1. Pastikan seeder sudah dijalankan
2. Cek kredensial: `admin@tebuskarbon.com` / `admin123`
3. Cek database apakah user admin ada
4. Cek console browser untuk error

### Tidak bisa akses halaman admin:
1. Pastikan login dengan akun admin
2. Cek role di database: harus `ADMIN`
3. Clear browser cache dan cookies

### Error saat seeder:
1. Pastikan database connection string benar di `.env`
2. Jalankan `npx prisma db push` terlebih dahulu
3. Cek apakah dependencies terinstall: `npm install`

---

*Dokumentasi ini akan diupdate seiring perkembangan fitur admin.*
