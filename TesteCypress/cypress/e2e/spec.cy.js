/// <reference types="cypress"/>

describe('Especificações de teste com o site HealingAPP', () => {
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
  it('Teste de login sem inserção de dados', () => {
    cy.visit('https://brenorcunha.pythonanywhere.com')
    cy.get('[type="text"]')
    cy.get('[type="password"]')
    cy.get('.btn-success').click()
    cy.get('.alert-danger').contains('An authentication error ocurred. Check user and password.')
  });
  it('Teste de login com inserção de usuário apenas', () => {
    cy.visit('https://brenorcunha.pythonanywhere.com')
    cy.get('[type="text"]').type('brenorc')
    cy.get('[type="password"]')
    cy.get('.btn-success').click()
    cy.get('.alert-danger').contains('An authentication error ocurred. Check user and password.')
  });
  it('Teste de login com inserção de senha apenas', () => {
    cy.visit('https://brenorcunha.pythonanywhere.com')
    cy.get('[type="text"]')
    cy.get('[type="password"]').type('Breno@123')
    cy.get('.btn-success').click()
    cy.get('.alert-danger').contains('An authentication error ocurred. Check user and password.')
  });
  it('Teste de login com inserção de usuário inexistente', () => {
    cy.visit('https://brenorcunha.pythonanywhere.com')
    cy.get('[type="text"]').type('andreall')
    cy.get('[type="password"]').type('1234')
    cy.get('.btn-success').click()
    cy.get('.alert-danger').contains('An authentication error ocurred. Check user and password.')
  });
  it('Teste de login com inserção de senha incorreta', () => {
    cy.visit('https://brenorcunha.pythonanywhere.com')
    cy.get('[type="text"]').type('brenorc')
    cy.get('[type="password"]').type('1234')
    cy.get('.btn-success').click()
    cy.get('.alert-danger').contains('An authentication error ocurred. Check user and password.')
  });
  // Testes com página de registro
  it('Teste de tentativa de cadastro sem inserção de dados', () => {
    cy.visit('https://brenorcunha.pythonanywhere.com')
    cy.get('.btn-dark-color-outline').contains("I don't have an account.").click()
    cy.get('#username')
    cy.get('#email')
    cy.get('#password')
    cy.get('#password_confirm')
    cy.get('.btn-success').contains('Register').click()
    cy.get('.alert-danger').contains("The username must have at least, 6 digits")
  });
  it('Teste de tentativa de cadastro com inserção de senha apenas', () => {
    cy.visit('https://brenorcunha.pythonanywhere.com')
    cy.get('.btn-dark-color-outline').contains("I don't have an account.").click()
    cy.get('#username')
    cy.get('#email')
    cy.get('#password').type('123456')
    cy.get('#password_confirm').type('123456')
    cy.get('.btn-success').contains('Register').click()
    cy.get('.alert-danger').contains("The username must have at least, 6 digits")
  });
  it('Teste de tentativa de cadastro com inserção de senhas divergentes', () => {
    cy.visit('https://brenorcunha.pythonanywhere.com')
    cy.get('.btn-dark-color-outline').contains("I don't have an account.").click()
    cy.get('#username').type('carlall')
    cy.get('#email').type('carlall@email.com')
    cy.get('#password').type('123456')
    cy.get('#password_confirm').type('12345')
    cy.get('.btn-success').contains('Register').click()
    cy.get('.alert-danger').contains('The passwords did not MATCH!')
  });
  it('Teste de tentativa de cadastro com inserção de senha e e-mail apenas', () => {
    cy.visit('https://brenorcunha.pythonanywhere.com')
    cy.get('.btn-dark-color-outline').contains("I don't have an account.").click()
    cy.get('#username')
    cy.get('#email').type('brenorc@email.com')
    cy.get('#password').type('123456')
    cy.get('#password_confirm').type('123456')
    cy.get('.btn-success').contains('Register').click()
    cy.get('.alert-danger').contains("The username must have at least, 6 digits")
  });
  it('Teste de tentativa de cadastro com inserção de e-mail em formato inválido', () => {
    cy.visit('https://brenorcunha.pythonanywhere.com')
    cy.get('.btn-dark-color-outline').contains("I don't have an account.").click()
    cy.get('#username').type('carlall')
    cy.get('#email').type('12345687')
    cy.get('#password').type('123456')
    cy.get('#password_confirm').type('123456')
    cy.get('.btn-success').contains('Register').click()
    cy.get('.alert-danger').contains('The e-mail is invalid!')
  });
  it('Teste de tentativa de cadastro com inserção de usuário inválido-5 digitos', () => {
    cy.visit('https://brenorcunha.pythonanywhere.com')
    cy.get('.btn-dark-color-outline').contains("I don't have an account.").click()
    cy.get('#username').type('carla')
    cy.get('#email').type('carlall@email.com')
    cy.get('#password').type('123456')
    cy.get('#password_confirm').type('123456')
    cy.get('.btn-success').contains('Register').click()
    cy.get('.alert-danger').contains('The username must have at least, 6 digits')
  });
  it('Teste de tentativa de cadastro com inserção de usuário inválido-Começa em numero', () => {
    cy.visit('https://brenorcunha.pythonanywhere.com')
    cy.get('.btn-dark-color-outline').contains("I don't have an account.").click()
    cy.get('#username').type('6carla')
    cy.get('#email').type('carlall@email.com')
    cy.get('#password').type('123456')
    cy.get('#password_confirm').type('123456')
    cy.get('.btn-success').contains('Register').click()
    cy.get('.alert-danger').contains("The username must start with a letter!")
  });
})