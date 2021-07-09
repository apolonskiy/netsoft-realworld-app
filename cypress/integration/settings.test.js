import { ROUTES } from '../constants'
import { randomName } from '../support/utils'
describe('Update Settings page tests', () => {
  beforeEach(() => {
    cy.apiLogin()
  })
  afterEach(() => {
    cy.get('@userResponse').then(resp => {
      cy.request({
        method: 'PUT',
        url: 'https://conduit.productionready.io/api/user',
        body: resp.user,
        headers: {
          authorization: `Token ${resp.user.token}`,
        },
      })
    })
  })

  it('should update user settings with valid data an d redirect to profile', function () {
    cy.visit(ROUTES.SETTINGS)
    const url = 'https://some-url'
    const username = randomName(`${this.userData.user.username}{}`)
    const email = randomName('email{}@example.com')
    cy.get('[placeholder="URL of profile picture"]').clear().type(url)
    cy.get('[placeholder="Your name"]').clear().type(username)
    cy.get('[placeholder="Email"]').clear().type(email)
    cy.get('button[type="submit"]').click()

    cy.url().should('match', /\/#\/profile\//)

    cy.get('[class="user-info"]').contains(username)
    cy.get('a.action-btn').click()

    cy.get('[placeholder="URL of profile picture"]').should('have.value', url)
    cy.get('[placeholder="Your name"]').should('have.value', username)
    cy.get('[placeholder="Email"]').should('have.value', email)
  })

  it('should respond in network error for update profile with existing username', function () {
    cy.intercept('PUT', /user$/).as('updateProfileRequest')
    cy.visit(ROUTES.SETTINGS)
    cy.get('[placeholder="Your name"]').clear().type(this.userData.user.username)
    cy.get('button[type="submit"]').click()

    cy.wait('@updateProfileRequest').then(interception => {
      expect(interception.response.body.errors.username).to.eql(['has already been taken'])
    })
    cy.url().should('match', /#\/settings/)
  })
})
