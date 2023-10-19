const username = Cypress.env("ORANGE_USERNAME");
const password = Cypress.env("ORANGE_PASSWORD");

describe('Validações relacionadas a tela de login', () => {
    it('Deve realizar o login no sistema com sucesso', () => {
        cy.visit("/");
        
        // Verifica se o campo de nome de usuário existe e preenche.
        cy.get('input[name="username"]')
        .should('exist')
        .type(username, {log: false});

        // Verifica se o campo de senha existe e preenche.
        cy.get('input[name="password"]')
        .should('exist')
        .type(password, {log: false});

        // Clicar no botão de login.
        cy.get('button.oxd-button[data-v-10d463b7]')
        .contains('Login')
        .click();

        // Verifique se o elemento da foto de perfil é visível no final da operação
        cy.get('img.oxd-userdropdown-img')
        .should('be.visible')
        .should('have.attr', 'alt', 'profile picture');
    });
});