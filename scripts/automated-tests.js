/**
 * 🧪 Automated Testing Script untuk TebusKarbon Website
 * Menjalankan test otomatis untuk semua fitur utama
 */

// Test Configuration
const BASE_URL = 'http://localhost:3001';
const ADMIN_CREDENTIALS = {
  email: 'admin@tebuskarbon.com',
  password: 'admin123'
};
const USER_CREDENTIALS = {
  email: 'user1@example.com',
  password: 'user123'
};

/**
 * Test Suite: Authentication & Authorization
 */
async function testAuthentication() {
  console.log('🔐 Testing Authentication...');
  
  // Test 1: Demo Users Creation
  try {
    const response = await fetch(`${BASE_URL}/api/create-demo-users`);
    const result = await response.json();
    console.log('✅ Demo users creation:', response.ok ? 'SUCCESS' : 'FAILED');
    console.log('   Result:', result.message || result.error);
  } catch (error) {
    console.log('❌ Demo users creation failed:', error.message);
  }

  // Test 2: Login Page Accessibility
  try {
    const response = await fetch(`${BASE_URL}/login`);
    console.log('✅ Login page access:', response.ok ? 'SUCCESS' : 'FAILED');
  } catch (error) {
    console.log('❌ Login page access failed:', error.message);
  }

  // Test 3: Admin Login (requires browser simulation)
  console.log('ℹ️  Admin login test requires manual verification');
  console.log('   Credentials: admin@tebuskarbon.com / admin123');
  
  // Test 4: User Login (requires browser simulation)
  console.log('ℹ️  User login test requires manual verification');
  console.log('   Credentials: user1@example.com / user123');
}

/**
 * Test Suite: API Endpoints
 */
async function testAPIEndpoints() {
  console.log('🔌 Testing API Endpoints...');
  
  const endpoints = [
    '/api/auth/signin',
    '/api/auth/session',
    '/api/register',
    '/api/create-demo-users'
  ];

  for (const endpoint of endpoints) {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: endpoint === '/api/auth/signin' || endpoint === '/api/register' ? 'POST' : 'GET'
      });
      
      console.log(`✅ ${endpoint}:`, response.status);
    } catch (error) {
      console.log(`❌ ${endpoint}:`, error.message);
    }
  }
}

/**
 * Test Suite: Page Accessibility
 */
async function testPageAccessibility() {
  console.log('📄 Testing Page Accessibility...');
  
  const pages = [
    '/',
    '/login',
    '/register',
    '/kalkulator',
    '/edukasi',
    '/tentang',
    '/komunitas'
  ];

  for (const page of pages) {
    try {
      const response = await fetch(`${BASE_URL}${page}`);
      console.log(`✅ ${page}:`, response.ok ? 'ACCESSIBLE' : `ERROR ${response.status}`);
    } catch (error) {
      console.log(`❌ ${page}:`, error.message);
    }
  }
}

/**
 * Test Suite: Protected Routes (requires authentication)
 */
async function testProtectedRoutes() {
  console.log('🛡️ Testing Protected Routes...');
  
  const protectedPages = [
    '/profil',
    '/riwayat',
    '/tebus',
    '/admin',
    '/admin/users'
  ];

  for (const page of protectedPages) {
    try {
      const response = await fetch(`${BASE_URL}${page}`);
      // Protected routes should redirect to login (302) or show unauthorized (401)
      const isProtected = response.status === 302 || response.status === 401 || response.url.includes('/login');
      console.log(`✅ ${page}:`, isProtected ? 'PROTECTED' : 'NOT PROTECTED');
    } catch (error) {
      console.log(`❌ ${page}:`, error.message);
    }
  }
}

/**
 * Test Suite: Database Connectivity
 */
async function testDatabaseConnectivity() {
  console.log('🗄️ Testing Database Connectivity...');
  
  try {
    // Test database through user creation endpoint
    const testUser = {
      name: 'Test User Auto',
      email: `test-${Date.now()}@example.com`,
      password: 'test123'
    };

    const response = await fetch(`${BASE_URL}/api/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testUser)
    });

    const result = await response.json();
    console.log('✅ Database connectivity:', response.ok ? 'SUCCESS' : 'FAILED');
    console.log('   Result:', result.message || result.error);
  } catch (error) {
    console.log('❌ Database connectivity failed:', error.message);
  }
}

/**
 * Performance Testing
 */
async function testPerformance() {
  console.log('⚡ Testing Performance...');
  
  const pages = ['/', '/kalkulator', '/login'];
  
  for (const page of pages) {
    const startTime = Date.now();
    try {
      const response = await fetch(`${BASE_URL}${page}`);
      const endTime = Date.now();
      const loadTime = endTime - startTime;
      
      console.log(`✅ ${page}: ${loadTime}ms ${loadTime < 3000 ? '(GOOD)' : '(SLOW)'}`)
    } catch (error) {
      console.log(`❌ ${page}:`, error.message);
    }
  }
}

/**
 * Main Test Runner
 */
async function runAllTests() {
  console.log('🚀 Starting TebusKarbon Automated Tests...\n');
  console.log(`🌐 Base URL: ${BASE_URL}\n`);
  
  await testAuthentication();
  console.log('');
  
  await testAPIEndpoints();
  console.log('');
  
  await testPageAccessibility();
  console.log('');
  
  await testProtectedRoutes();
  console.log('');
  
  await testDatabaseConnectivity();
  console.log('');
  
  await testPerformance();
  console.log('');
  
  console.log('✨ Automated tests completed!');
  console.log('📋 Please complete manual tests using TESTING_CHECKLIST.md');
}

// Run tests if this script is executed directly
if (typeof window === 'undefined') {
  // Node.js environment
  const fetch = require('node-fetch');
  runAllTests().catch(console.error);
} else {
  // Browser environment
  console.log('🌐 Browser environment detected');
  console.log('ℹ️  Open browser console and run: runAllTests()');
}

// Export for manual execution
if (typeof module !== 'undefined') {
  module.exports = {
    runAllTests,
    testAuthentication,
    testAPIEndpoints,
    testPageAccessibility,
    testProtectedRoutes,
    testDatabaseConnectivity,
    testPerformance
  };
}
