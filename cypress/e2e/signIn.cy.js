/// <reference types="cypress" />

const username = 'tomsmith';
const pw = 'SuperSecretPassword!';

describe('Sign In page', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should sign in with correct creds', () => {
    cy.get('#username').type(username);
    cy.get('#password').type(pw);
    cy.get('.radius').click();

    cy.url().should('include', '/secure');

    cy.get('.flash.success')
      .should('be.visible')
      .and('contain', 'You logged into a secure area!');
  });

  it(`shouldn't sign in with incorrect creds`, () => {
    cy.get('#username').type('tom');
    cy.get('#password').type('tom');
    cy.get('.radius').click();

    cy.url().should('include', '/login');

    cy.get('.flash.error')
      .should('be.visible')
      .and('contain', 'Your username is invalid!');
  });
});

describe('Sign Out page', () => {
  beforeEach(() => {
    cy.visit('/login');
    cy.get('#username').type(username);
    cy.get('#password').type(pw);
    cy.get('.radius').click();

    cy.url().should('include', '/secure');

    cy.get('.flash.success')
      .should('be.visible')
      .and('contain', 'You logged into a secure area!');
  });

  it('should sign out', () => {
    cy.url().should('include', '/secure');
    cy.get('.button.secondary.radius').click();

    cy.get('.flash.success')
      .should('be.visible')
      .and('contain', 'You logged out of the secure area!');
  });
});
