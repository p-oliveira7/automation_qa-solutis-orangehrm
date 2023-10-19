/**
 * Login na conta do usuário.
 * {String} username
 * {String} password
 */
Cypress.Commands.add('login', (username, password) => {
    cy.session(username, () => {
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
    })
    cy.visit('/')
});

// Clica na label passada no menu lateral
Cypress.Commands.add('clickInMainMenu', (label) => {
    cy.get('.oxd-main-menu-item').contains(label).click();
});
/**
 * Dados pessoais do funcionário.
 * {String} firstName
 * {String} middleName
 * {String} lastName
 * {String} id
 * {filePath} image
 */
Cypress.Commands.add('fillNewEmployeeForm', (person) => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/pim/addEmployee')

    // Preenche o campo "First Name"
    cy.get('input[name="firstName"]')
    .should('be.visible')
    .type(person.firstName);

// Preenche o campo "Middle Name"
    cy.get('input[name="middleName"]')
    .should('be.visible')
    .type(person.middleName);

// Preenche o campo "Last Name"
    cy.get('input[name="lastName"]')
    .should('be.visible')
    .type(person.lastName);

// Preenche o campo "Employee Id"
    cy.get('.oxd-input-group:has(label:contains("Employee Id")) input')
    .should('be.visible')
    .clear()
    .type(person.id);

    // Use o comando selectFile no elemento `<input type="file>` para fazer o upload da imagem
    cy.get('input[type="file"]').selectFile(person.image, {force: true});

    // Clica no botão de salvar o funcionário
    cy.get('.oxd-button--secondary')
    .contains('Save')
    .click();
});

Cypress.Commands.add('validateEmployeeDetails', (person) => {
    cy.url().should('include', 'pim/viewPersonalDetails')

    // Verifique o campo "First Name"
    cy.get('input[name="firstName"]')
    .should('have.value', person.firstName);

    // Verifique o campo "Middle Name"
    cy.get('input[name="middleName"]')
    .should('have.value', person.middleName);

    // Verifique o campo "Last Name"
    cy.get('input[name="lastName"]')
    .should('have.value', person.lastName);

    // Verifique o campo "Employee Id"
    cy.get('.oxd-input-group:has(label:contains("Employee Id")) input')
    .should('have.value', person.id);
});

Cypress.Commands.add('searchEmployee', (person) => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewEmployeeList')

    // Intercepta a requisição GET de carregamento dos funcionários
    cy.intercept({
        method: 'GET',
        url: '/web/index.php/api/v2/pim/employees*includeEmployees=onlyCurrent',
    }).as('getEmployees');
    
    // Preencha o campo "Employee Name" com o nome do funcionário que você deseja procurar
    cy.get(':nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-autocomplete-wrapper > .oxd-autocomplete-text-input > input')
    .should('exist')
    .type(`${person.firstName} ${person.middleName} ${person.lastName}`);

    // Preencha o campo "Employee Id" com o id o funcionário
    cy.get(':nth-child(2) > .oxd-input')
    .should('exist')
    .type(person.id);

    // Clica em pesquisar
    cy.get('.oxd-form-actions > .oxd-button--secondary')
    .should('be.visible')
    .click();

    cy.wait('@getEmployees')
    // Verifica se o card contém o nome e id correspondente com o da pessoa cadastrada
    cy.get('.orangehrm-container .oxd-table-card .oxd-table-row').each((row) => {
        cy.wrap(row).within(() => {

          // Verifique a célula de Id
          cy.get('.oxd-table-cell').eq(1).as('idCell');
          cy.get('@idCell')
          .should('contain', person.id);

          // Verifique a célula de Nome (FirstName e MiddleName)
          cy.get('.oxd-table-cell').eq(2).as('nameCell');
          cy.get('@nameCell')
          .should('contain', `${person.firstName} ${person.middleName}`);

          // Verifique a célula de Sobrenome (LastName)
          cy.get('.oxd-table-cell').eq(3).as('lastNameCell');
          cy.get('@lastNameCell')
          .should('contain', person.lastName);
        });

        // Clique na linha após a verificação
        cy.wrap(row).click();
    });
});
