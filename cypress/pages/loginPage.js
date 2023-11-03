import LoginElements from "../elements/loginElements";
const loginElements = new LoginElements();

class LoginPage {
    checkLoginImage = () => {
        cy.get(loginElements.imageLogin()).should('be.visible');
    }

    loginSubmitSession = (username, password) => {
        cy.session(`${username}`, () => {
          cy.visit('/');
          this.loginSubmit(username, password)
        });
        cy.visit('/');
      }

    loginSubmit = (username, password) =>{
      cy.get(loginElements.usernameField()).should('exist').optionalType(username);
      cy.get(loginElements.passwordField()).should('exist').optionalType(password);
      cy.get(loginElements.loginButton()).click();
    }

    validateLoginSucessfull = () => {
        cy.get(loginElements.profilePicture()).should('be.visible').should('have.attr', 'alt', 'profile picture');
    }

    validateErrorLoginAlert() {
      cy.get(loginElements.errorLoginAlert()).should('have.text', 'Invalid credentials')
    }

    validateSpanErrorRequired() {
      cy.get(loginElements.requiredLabel()).contains('Required')
    }
}

export default LoginPage;
