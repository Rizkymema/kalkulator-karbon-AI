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

## 📋 Cara Menjalankan Seeder

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Reset data lokal (opsional jika ingin mulai bersih):**
   ```bash
   npm run db:reset
   ```

3. **Jalankan seeder:**
   ```bash
   npm run db:seed
   ```

4. **Data tersimpan di file lokal:** `data/local-db.json`

## 🔑 Menambah Admin Baru

### Metode 1: Melalui Seeder (Recommended)

Edit file `scripts/create-demo-users.js` atau tambahkan user admin langsung ke `data/local-db.json`:

```typescript
const newAdmin = {
   name: 'Admin Kedua',
   email: 'admin2@tebuskarbon.com',
   hashedPassword: await bcrypt.hash('password123', 10),
   role: 'ADMIN',
   status: 'active',
}
```

Kemudian jalankan seeder ulang:
```bash
npm run db:seed
```

### Metode 2: Melalui Database Langsung

Jika ingin menambah admin langsung tanpa API, edit file storage lokal:

1. **Buka file data lokal:**
   ```bash
   data/local-db.json
   ```

2. **Tambah object baru ke array `users`:**
   - name: Nama admin
   - email: Email admin
   - hashedPassword: Hash dari password (gunakan bcrypt)
   - role: `ADMIN`
   - status: `active`

### Metode 3: Script Manual

Buat file script terpisah `scripts/add-admin.js`:

```javascript
const fs = require('fs/promises')
const path = require('path')
const { randomUUID } = require('crypto')
const bcrypt = require('bcryptjs')

const dataFile = path.join(process.cwd(), 'data', 'local-db.json')

async function addAdmin() {
  const raw = await fs.readFile(dataFile, 'utf8').catch(() => '{"users":[],"emissions":[]}')
  const data = JSON.parse(raw)
  const email = 'neradmin@tebuskarbon.com'
  const password = 'securepassword123'
  const name = 'Admin Baru'
  
  const hashedPassword = await bcrypt.hash(password, 10)
  
  const admin = {
    id: randomUUID(),
    name,
    email,
    hashedPassword,
    role: 'ADMIN',
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  data.users.push(admin)
  await fs.mkdir(path.dirname(dataFile), { recursive: true })
  await fs.writeFile(dataFile, JSON.stringify(data, null, 2), 'utf8')
  
  console.log('Admin baru berhasil dibuat:', admin.email)
}

addAdmin().catch(console.error)
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
3. Cek file `data/local-db.json` apakah user admin ada
4. Cek console browser untuk error

### Tidak bisa akses halaman admin:
1. Pastikan login dengan akun admin
2. Cek role di `data/local-db.json`: harus `ADMIN`
3. Clear browser cache dan cookies

### Error saat seeder:
1. Pastikan file `data/local-db.json` bisa dibuat di folder project
2. Jalankan `npm run db:reset` lalu `npm run db:seed`
3. Cek apakah dependencies terinstall: `npm install`

---

*Dokumentasi ini akan diupdate seiring perkembangan fitur admin.*
