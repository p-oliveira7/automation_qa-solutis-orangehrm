/**
 * Login na conta do usuário.
 * {String} username
 * {String} password
 */
Cypress.Commands.add('login', (username, password) => {
    cy.session(username, () => {
        cy.visit("/");
        // Verifica se o campo de nome de usuário existe e preenche.
        cy.get('input[name="username"]').should('exist').type(username, {log: false});

        // Verifica se o campo de senha existe e preenche.
        cy.get('input[name="password"]').should('exist').type(password, {log: false});

        // Clicar no botão de login.
        cy.get('button.oxd-button[data-v-10d463b7]').contains('Login').click();

        // Verifique se o elemento da foto de perfil é visível no final da operação
        cy.get('img.oxd-userdropdown-img')
        .should('be.visible')
        .should('have.attr', 'alt', 'profile picture');
    })
    cy.visit('/')
});

// Clica na label passada no menu lateral
Cypress.Commands.add('clickInMainMenu', (label) => {
    cy.get('.oxd-main-menu-item').contains(label).click();
});

// Preenche os campos de nome no cadastro do funcionário
Cypress.Commands.add('fillNameFields', (firstName, middleName, lastName) => {
    // Preenche o campo "First Name"
    cy.get('input[name="firstName"]').should('be.visible').invoke('val', firstName);

    // Preenche o campo "Middle Name"
    cy.get('input[name="middleName"]').should('be.visible').invoke('val', middleName);

    // Preenche o campo "Last Name"
    cy.get('input[name="lastName"]').should('be.visible').invoke('val', lastName);
});
