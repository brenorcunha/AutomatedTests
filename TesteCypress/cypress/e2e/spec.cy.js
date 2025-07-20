/// <reference types="cypress"/>

describe('template spec', () => {
  it('Teste de login e localização de elementos no HealingAPP', () => {
    cy.visit('https://brenorcunha.pythonanywhere.com')
    cy.get('[type="text"]').type('brenorc')
    cy.get('[type="password"]').type('Breno@123')
    cy.get('.btn-success').click()
    cy.viewport(723,781)
    cy.get('.color-dark').contains('brenorc')
    cy.get(':nth-child(3) > .btn').click()
    cy.get('.navbar-toggler-icon').click()
    cy.get(':nth-child(3) > .nav-link').click()
  })
})