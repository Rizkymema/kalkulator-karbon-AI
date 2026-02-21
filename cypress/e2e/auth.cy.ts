// ***********************************************************
// TebusKarbon E2E Testing - Authentication Flow
// Tests complete login/logout workflows for admin and user
// ***********************************************************

describe('Authentication Flow', () => {
  beforeEach(() => {
    // Create demo users before each test
    cy.request('GET', '/api/create-demo-users');
  });

  describe('Login Page', () => {
    it('should display login form correctly', () => {
      cy.visit('/login');
      cy.contains('Login').should('be.visible');
      cy.get('input[type="email"]').should('be.visible');
      cy.get('input[type="password"]').should('be.visible');
      cy.contains('admin@tebuskarbon.com').should('be.visible');
      cy.contains('user1@example.com').should('be.visible');
    });

    it('should show error for invalid credentials', () => {
      cy.visit('/login');
      cy.get('input[type="email"]').type('invalid@email.com');
      cy.get('input[type="password"]').type('wrongpassword');
      cy.get('button[type="submit"]').click();
      cy.contains('Email atau password salah').should('be.visible');
    });
  });

  describe('Admin Login Flow', () => {
    it('should login admin and redirect to admin dashboard', () => {
      cy.visit('/login');
      cy.get('input[type="email"]').type('admin@tebuskarbon.com');
      cy.get('input[type="password"]').type('admin123');
      cy.get('button[type="submit"]').click();
      
      // Should redirect to admin dashboard
      cy.url().should('include', '/admin');
      cy.contains('Dashboard Admin').should('be.visible');
    });

    it('should allow admin to access user management', () => {
      // Login as admin first
      cy.login('admin@tebuskarbon.com', 'admin123');
      
      cy.visit('/admin/users');
      cy.contains('Manajemen User').should('be.visible');
      cy.contains('admin@tebuskarbon.com').should('be.visible');
      cy.contains('user1@example.com').should('be.visible');
    });
  });

  describe('User Login Flow', () => {
    it('should login user and redirect to homepage', () => {
      cy.visit('/login');
      cy.get('input[type="email"]').type('user1@example.com');
      cy.get('input[type="password"]').type('user123');
      cy.get('button[type="submit"]').click();
      
      // Should redirect to homepage
      cy.url().should('eq', Cypress.config().baseUrl + '/');
      cy.contains('TebusKarbon').should('be.visible');
    });

    it('should block user from accessing admin routes', () => {
      // Login as user first
      cy.login('user1@example.com', 'user123');
      
      // Try to access admin route
      cy.visit('/admin');
      cy.url().should('include', '/login');
    });
  });

  describe('Protected Routes', () => {
    const protectedRoutes = ['/profil', '/riwayat', '/tebus', '/komunitas'];
    
    protectedRoutes.forEach((route) => {
      it(`should redirect unauthenticated user from ${route} to login`, () => {
        cy.visit(route);
        cy.url().should('include', '/login');
      });

      it(`should allow authenticated user to access ${route}`, () => {
        cy.login('user1@example.com', 'user123');
        cy.visit(route);
        cy.url().should('include', route);
      });
    });
  });

  describe('Logout Flow', () => {
    it('should logout user successfully', () => {
      cy.login('user1@example.com', 'user123');
      
      // Find and click logout button (adjust selector as needed)
      cy.get('[data-testid="logout-button"]').click();
      
      // Should redirect to login or homepage
      cy.url().should('satisfy', (url) => {
        return url.includes('/login') || url === Cypress.config().baseUrl + '/';
      });
    });
  });
});
