const username = Cypress.env("ORANGE_USERNAME");
const password = Cypress.env("ORANGE_PASSWORD");

describe('Acessar o PIM pelo menu', () => {

    beforeEach(() => {
    cy.login(username, password);
    });

    it('Deve acessar a área PIM', () => {
    // Clica em PIM no menu lateral 
    cy.clickInMainMenu('PIM');

    // Verifica se o texto na topbar é igual a PIM
    cy.get('.oxd-topbar-header-breadcrumb > .oxd-text')
    .should('have.text', 'PIM')
    });

    it('Deve acessar a área de adicionar funcionário', () => {
    // Clica em PIM no menu lateral 
    cy.clickInMainMenu('PIM');
    
    // Clica em Add Employee 
    cy.get('.oxd-topbar-body-nav')
    .contains('Add Employee')
    .click();

    // Verifica se o texto exibido no cart corresponde a Add Employee
    cy.get('.orangehrm-card-container > .oxd-text--h6')
    .should('have.text', 'Add Employee')
    });

    it('Deve acessar a lista funcionários', () => {
    // Clica em PIM no menu lateral 
    cy.clickInMainMenu('PIM');

    // Verifica se o texto exibido no cart corresponde a Employee List
    cy.get('.oxd-table-filter-header-title > .oxd-text')
    .should('have.text', 'Employee Information')
    });
})