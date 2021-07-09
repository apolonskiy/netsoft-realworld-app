import { ROUTES } from '../constants'
import { randomName } from '../support/utils'

describe('Register', () => {
  it('should call register API and jump to home page when submit a valid form', () => {
    // I guess this is done for reliability sake, but I'd go with proper randomString
    // generator for this purpose
    cy.intercept('POST', /users$/, { fixture: 'user.json' }).as('registerRequest')
    cy.visit(ROUTES.REGISTER)

    cy.get('[placeholder="Your Name"]').type('foo')
    cy.get('[placeholder="Email"]').type('foo@example.com')
    cy.get('[placeholder="Password"]').type('12345678')

    cy.get('[type="submit"]').click()

    cy.wait('@registerRequest')
    // This is done in order to check that function works for true and false case
    cy.isRouteCalled('@registerRequest').should('be.true')
    cy.url().should('match', /\/#\/$/)
  })

  it('should display error message when submit the form that username and email already exist', () => {
    cy.intercept('POST', /users$/, {
      statusCode: 422,
      body: { errors: { email: ['has already been taken'], username: ['has already been taken'] } },
    }).as('registerRequest')

    cy.visit(ROUTES.REGISTER)

    cy.get('[placeholder="Your Name"]').type('foo')
    cy.get('[placeholder="Email"]').type('foo@example.com')
    cy.get('[placeholder="Password"]').type('12345678')

    cy.get('[type="submit"]').click()

    cy.wait('@registerRequest')
    cy.get('.error-messages li').then($els => {
      expect($els[0]).to.have.text('email has already been taken')
      expect($els[1]).to.have.text('username has already been taken')
    })
  })

  it('should display error message when submit the form that username already exist', () => {
    cy.intercept('POST', /users$/, {
      statusCode: 422,
      body: { errors: { username: ['has already been taken'] } },
    }).as('registerRequest')

    cy.visit(ROUTES.REGISTER)

    cy.get('[placeholder="Your Name"]').type('foo')
    cy.get('[placeholder="Email"]').type(randomName('foo{}@example.com'))
    cy.get('[placeholder="Password"]').type('12345678')

    cy.get('[type="submit"]').click()

    cy.wait('@registerRequest')
    cy.get('.error-messages li').then(([$el]) => {
      expect($el).to.have.text('username has already been taken')
    })
  })

  it('should display error message when submit the form that email already exist', () => {
    cy.intercept('POST', /users$/, {
      statusCode: 422,
      body: { errors: { email: ['has already been taken'] } },
    }).as('registerRequest')

    cy.visit(ROUTES.REGISTER)

    cy.get('[placeholder="Your Name"]').type(randomName('foo{}'))
    cy.get('[placeholder="Email"]').type('foo@example.com')
    cy.get('[placeholder="Password"]').type('12345678')

    cy.get('[type="submit"]').click()

    cy.wait('@registerRequest')
    cy.get('.error-messages li').then(([$el]) => {
      expect($el).to.have.text('email has already been taken')
    })
  })

  it('should display error message when submit the form that username is too long', () => {
    cy.intercept('POST', /users$/, {
      statusCode: 422,
      body: { errors: { username: ['is too long (maximum is 20 characters)'] } },
    }).as('registerRequest')

    cy.visit(ROUTES.REGISTER)

    cy.get('[placeholder="Your Name"]').type(randomName('foo{}', 18))
    cy.get('[placeholder="Email"]').type(randomName('foo{}@example.com'))
    cy.get('[placeholder="Password"]').type('12345678')

    cy.get('[type="submit"]').click()

    cy.wait('@registerRequest')
    cy.get('.error-messages li').then(([$els]) => {
      expect($els).to.have.text('username is too long (maximum is 20 characters)')
    })
  })

  it('should display error message when submit the form when password is less than 8 symbols', () => {
    // this one behaves inconsistently on manual and automation run
    // for manual it has form check available for input length, but CY can send request with less than 8 symbols
    cy.intercept('POST', /users$/, {
      statusCode: 422,
      body: { errors: { password: ['is too short (minimum is 8 characters)'] } },
    }).as('registerRequest')

    cy.visit(ROUTES.REGISTER)

    cy.get('[placeholder="Your Name"]').type(randomName('foo{}'))
    cy.get('[placeholder="Email"]').type(randomName('foo{}@example.com'))
    cy.get('[placeholder="Password"]').type('1234567')

    cy.get('[type="submit"]').click()

    cy.wait('@registerRequest')
    cy.get('.error-messages li').then(([$els]) => {
      expect($els).to.have.text('password is too short (minimum is 8 characters)')
    })
  })

  it('should have invalid form when email is invalid', () => {
    cy.intercept('POST', /users$/).as('registerRequest')

    cy.visit(ROUTES.REGISTER)

    cy.get('[placeholder="Your Name"]').type(randomName('foo{}'))
    cy.get('[placeholder="Email"]').type('foo@@@@example.com')
    cy.get('[placeholder="Password"]').type('12345678')

    cy.get('[type="submit"]').click()

    cy.get('form').then(([$el]) => {
      cy.wrap($el.checkValidity()).should('be.false')
    })
    cy.isRouteCalled('@registerRequest').should('be.false')
  })
})
