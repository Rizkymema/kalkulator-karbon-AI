// ***********************************************************
// Cypress Custom Commands for TebusKarbon Testing
// Reusable commands for common testing actions
// ***********************************************************

// Custom command for login
Cypress.Commands.add('login', (email: string, password: string) => {
  cy.session([email, password], () => {
    cy.visit('/login');
    cy.get('input[type="email"]').type(email);
    cy.get('input[type="password"]').type(password);
    cy.get('button[type="submit"]').click();
    
    // Wait for redirect
    cy.url().should('not.include', '/login');
  });
});

// Custom command for logout
Cypress.Commands.add('logout', () => {
  cy.get('[data-testid="logout-button"]').click();
  cy.url().should('satisfy', (url) => {
    return url.includes('/login') || url === Cypress.config().baseUrl + '/';
  });
});

// Custom command for creating demo users
Cypress.Commands.add('createDemoUsers', () => {
  cy.request('GET', '/api/create-demo-users').then((response) => {
    expect(response.status).to.eq(200);
  });
});

// Custom command for filling calculator form
Cypress.Commands.add('fillCalculatorForm', (options: {
  vehicle?: string;
  distance?: number;
  electricity?: number;
  beef?: number;
  chicken?: number;
  vegetables?: number;
}) => {
  if (options.vehicle) {
    cy.get('[data-testid="vehicle-select"]').select(options.vehicle);
  }
  if (options.distance) {
    cy.get('[data-testid="distance-input"]').type(options.distance.toString());
  }
  if (options.electricity) {
    cy.get('[data-testid="electricity-input"]').type(options.electricity.toString());
  }
  if (options.beef) {
    cy.get('[data-testid="food-beef"]').type(options.beef.toString());
  }
  if (options.chicken) {
    cy.get('[data-testid="food-chicken"]').type(options.chicken.toString());
  }
  if (options.vegetables) {
    cy.get('[data-testid="food-vegetables"]').type(options.vegetables.toString());
  }
});

// Custom command for checking responsive design
Cypress.Commands.add('checkResponsive', (selector: string) => {
  // Check element is visible and not overflowing
  cy.get(selector).should('be.visible');
  cy.get(selector).then(($el) => {
    const element = $el[0];
    const rect = element.getBoundingClientRect();
    expect(rect.right).to.be.at.most(Cypress.config().viewportWidth);
  });
});

// Custom command for waiting for loading states
Cypress.Commands.add('waitForLoading', () => {
  cy.get('[data-testid="loading"]').should('not.exist');
  cy.get('.loading').should('not.exist');
});

// Custom command for checking accessibility
Cypress.Commands.add('checkA11y', () => {
  // Basic accessibility checks
  cy.get('img').each(($img) => {
    cy.wrap($img).should('have.attr', 'alt');
  });
  
  cy.get('input').each(($input) => {
    cy.wrap($input).should('have.attr', 'aria-label').or('have.attr', 'aria-labelledby');
  });
  
  cy.get('button').each(($button) => {
    cy.wrap($button).should('not.be.empty').or('have.attr', 'aria-label');
  });
});

// Declare custom commands for TypeScript
declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>;
      logout(): Chainable<void>;
      createDemoUsers(): Chainable<void>;
      fillCalculatorForm(options: {
        vehicle?: string;
        distance?: number;
        electricity?: number;
        beef?: number;
        chicken?: number;
        vegetables?: number;
      }): Chainable<void>;
      checkResponsive(selector: string): Chainable<void>;
      waitForLoading(): Chainable<void>;
      checkA11y(): Chainable<void>;
    }
  }
}
