import { ROUTES } from '../constants'

import { LoginPage } from '../pageModels/login.page'

const loginPage = new LoginPage(cy)

describe('Login and logout', () => {
  it('should render login page with all inputs and buttons', () => {
    // Test done for sake of techTask, this should be covered by FE unit tests in a perfect world
    cy.visit(ROUTES.LOGIN)
    cy.get(`[href="${ROUTES.HOME}"]`).should('be.visible')
    cy.get(`[href="${ROUTES.LOGIN}"]`)
      .should('be.visible')
      .and('have.class', 'active')
    cy.get(`[href="${ROUTES.REGISTER}"]`).should('be.visible')
    loginPage.getSignUpRedirectButton()
      .should('be.visible')
      .and('have.attr', 'href', '#/register')
    loginPage.getEmailField().should('have.attr', 'placeholder', 'Email')
    loginPage.getPasswordField().should('have.attr', 'placeholder', 'Password')
    loginPage.getSubmitButton().should('be.disabled')

    loginPage.enterEmail('some@email.com')
    loginPage.getSubmitButton().should('be.disabled')

    loginPage.enterPassword('password')
    loginPage.getSubmitButton().should('be.enabled')
  })
  it('should login success when submit a valid login form', () => {
    loginPage.performLogin()

    cy.url().should('match', /\/#\/$/)
  })

  it('should logout when click logout button', () => {
    cy.get(`[href="${ROUTES.SETTINGS}"]`).click()

    cy.get('button.btn-outline-danger')
      .contains('logout')
      .click()

    cy.get('ul.navbar-nav')
      .should('contain', 'Sign in')
      .should('contain', 'Sign up')
  })

  it('should display error when submit an invalid form (password not match)', () => {
    cy.intercept('POST', /users\/login/, {
      statusCode: 422,
      body: { errors: { 'email or password': ['is invalid'] } },
    }).as('failedLogin')
    cy.visit(ROUTES.LOGIN)

    loginPage.enterEmail('foo@example.com')
    loginPage.enterPassword('foo@example.com')
    loginPage.submitLogin()

    cy.wait('@failedLogin')
    loginPage.getFormErrors().should('have.text', 'email or password is invalid')
  })

  it('should display format error without API call when submit an invalid format', () => {
    cy.intercept('POST', /users\/login/).as('loginRequest')
    cy.visit(ROUTES.LOGIN)

    loginPage.enterEmail('foo')
    loginPage.enterPassword('123456')
    loginPage.submitLogin()

    loginPage.getForm().then(([$el]) => {
      cy.wrap($el.checkValidity()).should('be.false')
    })
    cy.isRouteCalled('@loginRequest').should('be.false')
  })
})
