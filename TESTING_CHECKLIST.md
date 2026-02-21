# 🔍 Testing Checklist Komprehensif - TebusKarbon Website

**Status Server:** Running on http://localhost:3001

## **Phase 1: Authentication & Authorization Testing**

### ✅ Demo Users Setup
- **Admin:** admin@tebuskarbon.com / admin123
- **User:** user1@example.com / user123

### 🔐 Authentication Flow Tests

#### Test Case 1: Login Page Accessibility
- [ ] Akses http://localhost:3001/login
- [ ] Form login muncul dengan benar
- [ ] Demo credentials terlihat
- [ ] "Buat Demo Users" button berfungsi

#### Test Case 2: Admin Login Flow
```bash
1. Buka http://localhost:3001/login
2. Input: admin@tebuskarbon.com
3. Input: admin123
4. Click Login
5. Expected: Redirect ke /admin
6. Verify: Admin layout terlihat
```

#### Test Case 3: User Login Flow
```bash
1. Logout dari admin (jika login)
2. Login dengan: user1@example.com / user123
3. Expected: Redirect ke / (beranda)
4. Verify: User navbar terlihat
```

#### Test Case 4: Invalid Login
```bash
1. Input email salah
2. Input password salah
3. Expected: Error message muncul
4. No redirect terjadi
```

### 🛡️ Role-Based Access Control Tests

#### User Access Tests (Login as user1@example.com)
- [ ] ✓ Akses / (beranda) - ALLOWED
- [ ] ✓ Akses /profil - ALLOWED  
- [ ] ✓ Akses /kalkulator - ALLOWED
- [ ] ✓ Akses /komunitas - ALLOWED
- [ ] ✓ Akses /riwayat - ALLOWED
- [ ] ✓ Akses /tebus - ALLOWED
- [ ] ✗ Akses /admin - BLOCKED (redirect expected)

#### Admin Access Tests (Login as admin@tebuskarbon.com)
- [ ] ✓ Akses /admin - ALLOWED
- [ ] ✓ Akses /admin/users - ALLOWED
- [ ] ✓ Akses semua halaman user - ALLOWED

---

## **Phase 2: UI Components & Responsiveness Testing**

### 📱 Responsive Design Tests

#### Mobile Testing (320px - 768px)
```bash
1. Open Chrome DevTools
2. Toggle device toolbar (Ctrl+Shift+M)
3. Select Mobile device (iPhone SE, etc.)
4. Test pages:
   - [ ] / (beranda) - responsive layout
   - [ ] /login - form tidak overflow
   - [ ] /kalkulator - inputs accessible
   - [ ] /profil - tabs stack properly
```

#### Tablet Testing (768px - 1024px)
```bash
1. Select iPad in DevTools
2. Test:
   - [ ] Navigation horizontal
   - [ ] Cards dalam 2 kolom
   - [ ] Sidebar behavior
```

#### Desktop Testing (1024px+)
```bash
1. Full screen browser
2. Test:
   - [ ] Full grid layout
   - [ ] All elements visible
   - [ ] Optimal spacing
```

### 🎨 UI Components Tests

#### Button Component Testing
Test all button variants di berbagai halaman:
- [ ] Default button - primary actions
- [ ] Destructive button - delete actions
- [ ] Outline button - secondary actions
- [ ] Secondary button - tertiary actions
- [ ] Ghost button - minimal actions
- [ ] Link button - navigation

#### Alert Component Testing
- [ ] Default alert - informational
- [ ] Destructive alert - error messages
- [ ] Proper ARIA roles
- [ ] Screen reader compatibility

---

## **Phase 3: Fitur-Fitur Utama Testing**

### 🧮 Kalkulator Jejak Karbon Tests

#### Test Case: Transportation Calculation
```bash
1. Akses /kalkulator
2. Pilih jenis kendaraan: Mobil
3. Input jarak: 50 km
4. Expected: Kalkulasi otomatis
5. Verify: Nilai emisi > 0
```

#### Test Case: Energy Calculation
```bash
1. Input konsumsi listrik: 200 kWh
2. Expected: Faktor konversi applied
3. Verify: Update total emisi
```

#### Test Case: Food Calculation
```bash
1. Pilih: Daging sapi, 3x/minggu
2. Expected: Kalkulasi protein hewani
3. Verify: Higher emission than nabati
```

#### Test Case: Final Results
```bash
1. Complete all categories
2. Click "Hitung Total"
3. Expected: 
   - Total emisi dalam ton CO₂
   - Breakdown per kategori
   - Pohon dibutuhkan calculation
4. Click "Simpan ke Riwayat"
5. Expected: Data saved to database
```

### 👤 Profil User Management Tests

#### Test Case: Profile Tab
```bash
1. Login as user, akses /profil
2. Update nama: "Test User Updated"
3. Click Save
4. Expected: Success message
5. Refresh page
6. Verify: Name persisted
```

#### Test Case: Security Tab
```bash
1. Click tab "Keamanan"
2. Input password lama: user123
3. Input password baru: newpass123
4. Konfirmasi password: newpass123
5. Click "Ubah Password"
6. Expected: Success message
7. Logout dan login dengan password baru
```

#### Test Case: Activity Tab
```bash
1. Click tab "Aktivitas"
2. Verify:
   - Total emisi displayed
   - Riwayat perhitungan list
   - Tanggal sorted correctly
```

### 👑 Admin Dashboard Tests

#### Test Case: Dashboard Statistics
```bash
1. Login as admin, akses /admin
2. Verify dashboard shows:
   - Total users count
   - Total emission records
   - Recent users list
   - System statistics
```

#### Test Case: User Management
```bash
1. Akses /admin/users
2. Verify:
   - List semua users
   - User roles displayed
   - Edit button functional
   - Delete/toggle role options
```

---

## **Phase 4: Database & API Testing**

### 🗄️ Database Operations Tests

#### Test Case: User Registration
```bash
1. Akses /register
2. Register new user:
   - Name: Test User
   - Email: test@example.com
   - Password: test123
3. Expected: User created with role USER
4. Login with new credentials
```

#### Test Case: Data Persistence
```bash
1. Complete kalkulator form
2. Save to history
3. Navigate to /riwayat
4. Verify: Data appears in list
5. Click detail
6. Verify: All data correct
```

### 🔌 API Endpoints Tests

#### Test Case: API Authentication
```bash
# Test with browser developer tools
1. Open Network tab
2. Login as user
3. Verify: POST /api/auth/signin returns 200
4. Verify: Session cookie set
```

#### Test Case: Protected API Access
```bash
1. Access /api/user/profile (logged in)
2. Expected: User data returned
3. Logout
4. Access same endpoint
5. Expected: 401 Unauthorized
```

---

## **Phase 5: Performance & Security Testing**

### ⚡ Performance Tests

#### Page Load Testing
```bash
1. Open Chrome DevTools → Performance
2. Record page loads:
   - [ ] / (beranda) < 3 seconds
   - [ ] /kalkulator < 2 seconds  
   - [ ] /admin < 5 seconds
3. Check Lighthouse scores:
   - [ ] Performance > 80
   - [ ] Accessibility > 90
   - [ ] Best Practices > 80
   - [ ] SEO > 80
```

#### Browser Compatibility
Test di browsers:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Chrome
- [ ] Mobile Safari

### 🔒 Security Tests

#### Authentication Security
```bash
1. Verify passwords hashed in database
2. Test session expiration
3. Test CSRF protection
4. Verify role boundaries
```

#### Input Validation
```bash
1. Test SQL injection in forms
2. Test XSS in text inputs
3. Test file upload security (if any)
4. Verify environment variables secure
```

---

## **Phase 6: Fitur Tambahan Testing**

### 🎮 Gamifikasi Features Tests

#### Test Case: Achievement System
```bash
1. Complete multiple calculations
2. Verify: Badges awarded
3. Check: Progress tracking
4. View: Leaderboard updates
```

### 🌍 Community Features Tests

#### Test Case: Community Page
```bash
1. Akses /komunitas
2. Verify:
   - Community posts display
   - Environmental challenges
   - User interactions possible
   - Campaign information
```

---

## **Phase 7: Manual Testing Execution**

### 🕹️ Step-by-Step Manual Testing

#### Round 1: Basic Functionality
1. **Start:** http://localhost:3001
2. **Test:** Navigation links
3. **Test:** Login/logout flow
4. **Test:** Role-based access
5. **Test:** Basic form submissions

#### Round 2: Deep Functionality
1. **Test:** Complete calculator workflow
2. **Test:** Profile management
3. **Test:** Admin operations
4. **Test:** Data persistence
5. **Test:** Error handling

#### Round 3: Edge Cases
1. **Test:** Invalid inputs
2. **Test:** Network errors
3. **Test:** Browser refresh scenarios
4. **Test:** Multiple tabs behavior

---

## **Bug Tracking Template**

### 🐛 Bug Report Format
```markdown
**Bug Title:** [Clear description]
**Priority:** High/Medium/Low
**Steps to Reproduce:**
1. Step 1
2. Step 2
3. Step 3

**Expected Result:** [What should happen]
**Actual Result:** [What actually happens]
**Browser/Device:** [Chrome, Mobile, etc.]
**Screenshot:** [If applicable]
**Status:** Open/In Progress/Fixed
```

---

## **Testing Status Overview**

### ✅ Completed Tests
- [ ] Authentication Flow
- [ ] Role-Based Access
- [ ] UI Components
- [ ] Responsive Design
- [ ] Kalkulator Features
- [ ] Profile Management
- [ ] Admin Dashboard
- [ ] Database Operations
- [ ] API Endpoints
- [ ] Performance
- [ ] Security
- [ ] Gamifikasi
- [ ] Community Features

### 🐛 Known Issues
- [ ] Issue 1: [Description]
- [ ] Issue 2: [Description]
- [ ] Issue 3: [Description]

### 🚀 Next Actions
1. [ ] Complete all manual tests
2. [ ] Fix critical bugs
3. [ ] Optimize performance
4. [ ] Security audit
5. [ ] Deploy to production

---

**Last Updated:** July 18, 2025
**Tester:** [Your Name]
**Environment:** Development (localhost:3001)
