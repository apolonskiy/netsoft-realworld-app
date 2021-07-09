import { ROUTES } from '../constants'

// This is a type of  implementation I'm used to as it helps arrange
// page elements and functions for certain pageModel in one place, making it
// easier to work with and reuse code. I've implemented only one as example.
// However not sure if this is a good practice for CY, as I said to HR - I have
// much more background with TS and TestCafe.
export class LoginPage {
  constructor (testController) {
    this.testController = testController
    this.emailField = '[type="email"]'
    this.passwordField = '[type="password"]'
    this.submitButton = '[type="submit"]'
    this.formError = '.error-messages li'
    this.form = 'form'
    this.signUpRedirectButton = 'p[class="text-xs-center"] a'
  }

  getEmailField () {
    return this.testController.get(this.emailField)
  }

  getPasswordField () {
    return this.testController.get(this.passwordField)
  }

  getSignUpRedirectButton () {
    return this.testController.get(this.signUpRedirectButton)
  }

  getSubmitButton () {
    return this.testController.get(this.submitButton)
  }

  enterEmail (email) {
    this.getEmailField().type(email)
  }

  clearEmail (email) {
    this.getEmailField().clear(email)
  }

  enterPassword (password) {
    this.getPasswordField().type(password)
  }

  clearPassword (password) {
    this.getPasswordField().clear(password)
  }

  submitLogin () {
    this.getSubmitButton().click()
  }

  getFormErrors () {
    return this.testController.get(this.formError)
  }

  getForm () {
    return this.testController.get(this.form)
  }

  performLogin (username = 'plumrx', email = 'plumrx@example.com', password = '12345678') {
    this.testController.fixture('user.json').then(authResponse => {
      authResponse.user.username = username
      this.testController.intercept('POST', /users\/login$/, { statusCode: 200, body: authResponse })
    })

    this.testController.visit(ROUTES.LOGIN)

    this.testController.get(this.emailField).type(email)
    this.testController.get(this.passwordField).type(password)
    this.testController.get(this.submitButton).contains('Sign in').click()
  }
}
