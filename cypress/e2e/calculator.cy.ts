// ***********************************************************
// TebusKarbon E2E Testing - Calculator Features
// Tests carbon footprint calculator functionality
// ***********************************************************

describe('Kalkulator Jejak Karbon', () => {
  beforeEach(() => {
    // Login as user before each test
    cy.login('user1@example.com', 'user123');
    cy.visit('/kalkulator');
  });

  describe('Calculator Page Load', () => {
    it('should display calculator form correctly', () => {
      cy.contains('Kalkulator Jejak Karbon').should('be.visible');
      cy.contains('Transportasi').should('be.visible');
      cy.contains('Konsumsi Listrik').should('be.visible');
      cy.contains('Makanan').should('be.visible');
    });
  });

  describe('Transportation Calculation', () => {
    it('should calculate transportation emissions correctly', () => {
      // Select vehicle type
      cy.get('[data-testid="vehicle-select"]').select('mobil');
      
      // Input distance
      cy.get('[data-testid="distance-input"]').type('100');
      
      // Verify calculation appears
      cy.get('[data-testid="transport-emission"]').should('contain', 'kg CO₂');
    });

    it('should update total when transportation changes', () => {
      cy.get('[data-testid="vehicle-select"]').select('mobil');
      cy.get('[data-testid="distance-input"]').type('50');
      
      // Get initial total
      cy.get('[data-testid="total-emission"]').invoke('text').then((initialTotal) => {
        // Change distance
        cy.get('[data-testid="distance-input"]').clear().type('100');
        
        // Verify total changed
        cy.get('[data-testid="total-emission"]').should('not.contain', initialTotal);
      });
    });
  });

  describe('Energy Calculation', () => {
    it('should calculate energy emissions correctly', () => {
      cy.get('[data-testid="electricity-input"]').type('300');
      cy.get('[data-testid="energy-emission"]').should('contain', 'kg CO₂');
    });
  });

  describe('Food Calculation', () => {
    it('should calculate food emissions correctly', () => {
      cy.get('[data-testid="food-beef"]').type('3');
      cy.get('[data-testid="food-chicken"]').type('2');
      cy.get('[data-testid="food-emission"]').should('contain', 'kg CO₂');
    });

    it('should show higher emissions for meat vs vegetables', () => {
      // Input meat consumption
      cy.get('[data-testid="food-beef"]').type('5');
      cy.get('[data-testid="food-emission"]').invoke('text').then((meatEmission) => {
        
        // Clear and input vegetables
        cy.get('[data-testid="food-beef"]').clear();
        cy.get('[data-testid="food-vegetables"]').type('5');
        
        cy.get('[data-testid="food-emission"]').invoke('text').then((vegEmission) => {
          // Parse and compare (meat should be higher)
          const meatValue = parseFloat(meatEmission);
          const vegValue = parseFloat(vegEmission);
          expect(meatValue).to.be.greaterThan(vegValue);
        });
      });
    });
  });

  describe('Final Calculation', () => {
    it('should calculate total emissions and trees needed', () => {
      // Fill all categories
      cy.get('[data-testid="vehicle-select"]').select('mobil');
      cy.get('[data-testid="distance-input"]').type('100');
      cy.get('[data-testid="electricity-input"]').type('200');
      cy.get('[data-testid="food-beef"]').type('2');
      
      // Click calculate
      cy.get('[data-testid="calculate-button"]').click();
      
      // Verify results
      cy.get('[data-testid="total-emission"]').should('contain', 'ton CO₂');
      cy.get('[data-testid="trees-needed"]').should('contain', 'pohon');
      cy.get('[data-testid="breakdown-transport"]').should('be.visible');
      cy.get('[data-testid="breakdown-energy"]').should('be.visible');
      cy.get('[data-testid="breakdown-food"]').should('be.visible');
    });

    it('should save calculation to history', () => {
      // Complete calculation
      cy.get('[data-testid="vehicle-select"]').select('motor');
      cy.get('[data-testid="distance-input"]').type('50');
      cy.get('[data-testid="calculate-button"]').click();
      
      // Save to history
      cy.get('[data-testid="save-history-button"]').click();
      
      // Verify success message
      cy.contains('Berhasil disimpan').should('be.visible');
      
      // Check in history page
      cy.visit('/riwayat');
      cy.get('[data-testid="history-item"]').should('have.length.at.least', 1);
    });
  });

  describe('Form Validation', () => {
    it('should show validation errors for invalid inputs', () => {
      cy.get('[data-testid="distance-input"]').type('abc');
      cy.get('[data-testid="calculate-button"]').click();
      cy.contains('Input harus berupa angka').should('be.visible');
    });

    it('should show validation for negative numbers', () => {
      cy.get('[data-testid="distance-input"]').type('-50');
      cy.get('[data-testid="calculate-button"]').click();
      cy.contains('Nilai tidak boleh negatif').should('be.visible');
    });
  });

  describe('Responsive Design', () => {
    const viewports = [
      { device: 'iphone-6', width: 375, height: 667 },
      { device: 'ipad-2', width: 768, height: 1024 },
      { device: 'macbook-15', width: 1440, height: 900 }
    ];

    viewports.forEach(({ device, width, height }) => {
      it(`should be responsive on ${device}`, () => {
        cy.viewport(width, height);
        cy.reload();
        
        // Check key elements are visible
        cy.contains('Kalkulator Jejak Karbon').should('be.visible');
        cy.get('[data-testid="vehicle-select"]').should('be.visible');
        cy.get('[data-testid="calculate-button"]').should('be.visible');
        
        // Check no horizontal scroll
        cy.get('body').should('have.css', 'overflow-x').and('match', /hidden|auto/);
      });
    });
  });
});
