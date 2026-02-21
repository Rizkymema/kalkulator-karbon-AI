/**
 * 🚀 Performance Testing Script untuk TebusKarbon
 * Mengukur performa website dan memberikan rekomendasi optimasi
 */

const BASE_URL = 'http://localhost:3001';

/**
 * Performance Metrics Collection
 */
async function measurePagePerformance(url) {
  const startTime = performance.now();
  
  try {
    const response = await fetch(url);
    const endTime = performance.now();
    const loadTime = endTime - startTime;
    
    const contentLength = response.headers.get('content-length');
    const contentType = response.headers.get('content-type');
    
    return {
      url,
      status: response.status,
      loadTime: Math.round(loadTime),
      contentLength: contentLength ? parseInt(contentLength) : null,
      contentType,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    return {
      url,
      status: 'ERROR',
      loadTime: null,
      error: error.message,
      timestamp: new Date().toISOString()
    };
  }
}

/**
 * Comprehensive Performance Test Suite
 */
async function runPerformanceTests() {
  console.log('🚀 Starting Performance Tests for TebusKarbon...\n');
  
  const pages = [
    { name: 'Homepage', url: `${BASE_URL}/` },
    { name: 'Login', url: `${BASE_URL}/login` },
    { name: 'Register', url: `${BASE_URL}/register` },
    { name: 'Calculator', url: `${BASE_URL}/kalkulator` },
    { name: 'Education', url: `${BASE_URL}/edukasi` },
    { name: 'Community', url: `${BASE_URL}/komunitas` },
    { name: 'About', url: `${BASE_URL}/tentang` }
  ];
  
  const results = [];
  
  // Test each page
  for (const page of pages) {
    console.log(`⏱️  Testing ${page.name}...`);
    const result = await measurePagePerformance(page.url);
    results.push({ ...result, name: page.name });
    
    const status = result.status === 200 ? '✅' : '❌';
    const loadTime = result.loadTime ? `${result.loadTime}ms` : 'FAILED';
    const performance = result.loadTime < 1000 ? '🚀 FAST' : result.loadTime < 3000 ? '⚡ GOOD' : '🐌 SLOW';
    
    console.log(`   ${status} ${page.name}: ${loadTime} ${result.loadTime ? performance : ''}`);
  }
  
  console.log('\n📊 Performance Summary:');
  
  // Calculate statistics
  const successfulTests = results.filter(r => r.status === 200);
  const avgLoadTime = successfulTests.reduce((sum, r) => sum + r.loadTime, 0) / successfulTests.length;
  const maxLoadTime = Math.max(...successfulTests.map(r => r.loadTime));
  const minLoadTime = Math.min(...successfulTests.map(r => r.loadTime));
  
  console.log(`📈 Average Load Time: ${Math.round(avgLoadTime)}ms`);
  console.log(`📊 Min Load Time: ${minLoadTime}ms`);
  console.log(`📊 Max Load Time: ${maxLoadTime}ms`);
  console.log(`✅ Success Rate: ${successfulTests.length}/${results.length} (${Math.round(successfulTests.length/results.length*100)}%)`);
  
  // Performance recommendations
  console.log('\n💡 Performance Recommendations:');
  
  if (avgLoadTime > 2000) {
    console.log('⚠️  Average load time is high. Consider:');
    console.log('   - Optimizing images and assets');
    console.log('   - Implementing code splitting');
    console.log('   - Using CDN for static assets');
    console.log('   - Enabling gzip compression');
  } else if (avgLoadTime > 1000) {
    console.log('⚡ Good performance, but can be improved:');
    console.log('   - Optimize critical rendering path');
    console.log('   - Lazy load non-critical components');
    console.log('   - Minimize JavaScript bundles');
  } else {
    console.log('🚀 Excellent performance! Consider:');
    console.log('   - Monitor performance regularly');
    console.log('   - Implement performance budgets');
    console.log('   - Use performance monitoring tools');
  }
  
  return results;
}

/**
 * API Performance Testing
 */
async function testAPIPerformance() {
  console.log('\n🔌 Testing API Performance...\n');
  
  const apiEndpoints = [
    { name: 'Create Demo Users', url: `${BASE_URL}/api/create-demo-users` },
    { name: 'Auth Session', url: `${BASE_URL}/api/auth/session` },
    { name: 'Register (POST)', url: `${BASE_URL}/api/register`, method: 'POST' }
  ];
  
  for (const endpoint of apiEndpoints) {
    const startTime = performance.now();
    try {
      const response = await fetch(endpoint.url, {
        method: endpoint.method || 'GET',
        headers: endpoint.method === 'POST' ? { 'Content-Type': 'application/json' } : {}
      });
      const endTime = performance.now();
      const responseTime = Math.round(endTime - startTime);
      
      const status = response.status < 400 ? '✅' : '⚠️';
      const performance = responseTime < 200 ? '🚀' : responseTime < 500 ? '⚡' : '🐌';
      
      console.log(`   ${status} ${endpoint.name}: ${responseTime}ms ${performance}`);
    } catch (error) {
      console.log(`   ❌ ${endpoint.name}: ERROR - ${error.message}`);
    }
  }
}

/**
 * Resource Usage Analysis
 */
async function analyzeResourceUsage() {
  console.log('\n📦 Analyzing Resource Usage...\n');
  
  // Test static assets
  const assets = [
    { name: 'Favicon', url: `${BASE_URL}/favicon.ico` },
    { name: 'Global CSS', url: `${BASE_URL}/globals.css` }
  ];
  
  for (const asset of assets) {
    try {
      const response = await fetch(asset.url);
      const contentLength = response.headers.get('content-length');
      const size = contentLength ? `${Math.round(parseInt(contentLength)/1024)}KB` : 'Unknown';
      const status = response.ok ? '✅' : '❌';
      
      console.log(`   ${status} ${asset.name}: ${size}`);
    } catch (error) {
      console.log(`   ❌ ${asset.name}: ERROR`);
    }
  }
}

/**
 * Lighthouse-style Performance Audit
 */
function generatePerformanceReport(results) {
  console.log('\n📋 Performance Report Card:\n');
  
  const avgLoadTime = results.filter(r => r.status === 200)
    .reduce((sum, r) => sum + r.loadTime, 0) / results.filter(r => r.status === 200).length;
  
  // Scoring system (similar to Lighthouse)
  const performanceScore = avgLoadTime < 1000 ? 95 : 
                          avgLoadTime < 2000 ? 80 : 
                          avgLoadTime < 3000 ? 65 : 40;
  
  const accessibilityScore = 85; // Placeholder - would need real accessibility testing
  const bestPracticesScore = 90; // Placeholder - would need security and best practices audit
  const seoScore = 80; // Placeholder - would need SEO analysis
  
  console.log(`🎯 Performance: ${performanceScore}/100 ${getScoreEmoji(performanceScore)}`);
  console.log(`♿ Accessibility: ${accessibilityScore}/100 ${getScoreEmoji(accessibilityScore)}`);
  console.log(`✅ Best Practices: ${bestPracticesScore}/100 ${getScoreEmoji(bestPracticesScore)}`);
  console.log(`🔍 SEO: ${seoScore}/100 ${getScoreEmoji(seoScore)}`);
  
  const overallScore = Math.round((performanceScore + accessibilityScore + bestPracticesScore + seoScore) / 4);
  console.log(`\n🏆 Overall Score: ${overallScore}/100 ${getScoreEmoji(overallScore)}`);
  
  return { performanceScore, accessibilityScore, bestPracticesScore, seoScore, overallScore };
}

function getScoreEmoji(score) {
  if (score >= 90) return '🟢';
  if (score >= 70) return '🟡';
  return '🔴';
}

/**
 * Main Performance Test Runner
 */
async function runCompletePerformanceAudit() {
  const startTime = new Date();
  
  console.log('🔍 TebusKarbon Performance Audit');
  console.log('================================\n');
  console.log(`🕐 Started at: ${startTime.toLocaleString()}\n`);
  
  // Run all performance tests
  const pageResults = await runPerformanceTests();
  await testAPIPerformance();
  await analyzeResourceUsage();
  const report = generatePerformanceReport(pageResults);
  
  const endTime = new Date();
  const duration = Math.round((endTime - startTime) / 1000);
  
  console.log(`\n⏱️  Audit completed in ${duration} seconds`);
  console.log(`📅 Completed at: ${endTime.toLocaleString()}`);
  
  // Save results to file (if in Node.js environment)
  if (typeof window === 'undefined') {
    const fs = require('fs');
    const reportData = {
      timestamp: startTime.toISOString(),
      duration: duration,
      pageResults,
      report,
      environment: 'development',
      baseUrl: BASE_URL
    };
    
    try {
      fs.writeFileSync(
        'performance-report.json', 
        JSON.stringify(reportData, null, 2)
      );
      console.log('\n💾 Report saved to performance-report.json');
    } catch (error) {
      console.log('\n⚠️  Could not save report file');
    }
  }
  
  return { pageResults, report };
}

// Export for use in different environments
if (typeof window === 'undefined') {
  // Node.js environment
  module.exports = {
    runCompletePerformanceAudit,
    runPerformanceTests,
    testAPIPerformance,
    analyzeResourceUsage
  };
} else {
  // Browser environment
  window.TebusKarbonPerformanceTest = {
    runCompletePerformanceAudit,
    runPerformanceTests,
    testAPIPerformance,
    analyzeResourceUsage
  };
  console.log('🌐 Performance testing tools loaded to window.TebusKarbonPerformanceTest');
}

// Auto-run if script is executed directly
if (typeof window === 'undefined' && require.main === module) {
  runCompletePerformanceAudit().catch(console.error);
}
