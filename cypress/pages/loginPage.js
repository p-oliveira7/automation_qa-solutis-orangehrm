import LoginElements from "../elements/loginElements";
const loginElements = new LoginElements();

class LoginPage {
    checkLoginImage = () => {
        cy.get(loginElements.imageLogin()).should('be.visible');
    }

    loginSubmit = (username, password) => {
        cy.session(`${username}`, () => {
          cy.visit('/');
          cy.get(loginElements.usernameField()).should('exist').type(username, { log: false });
          cy.get(loginElements.passwordField()).should('exist').type(password, { log: false });
          cy.get(loginElements.loginButton()).contains('Login').click();
        });
        cy.visit('/');
      }

    validateLoginSucessfull = () => {
        cy.get(loginElements.profilePicture()).should('be.visible').should('have.attr', 'alt', 'profile picture');
    }
}

export default LoginPage;
