import {fakerPT_BR} from '@faker-js/faker'

const username = Cypress.env("ORANGE_USERNAME");
const password = Cypress.env("ORANGE_PASSWORD");
let person;



describe('Acessar o menu e realizar o cadastro de um novo funcionário', () => {

  beforeEach(() => {
    person = {
      firstName: fakerPT_BR.person.firstName(),
      middleName: fakerPT_BR.person.middleName(),
      lastName: fakerPT_BR.person.lastName(),
      id: fakerPT_BR.random.numeric(7),
      image: 'cypress/images/caneta.png'
    };

    cy.login(username, password);
  });
  it('Deve acessar a área PIM', () => {
    // Clica em PIM no menu lateral 
    cy.clickInMainMenu('PIM');

    // Verifica se o texto na topbar é igual a PIM
    cy.get('.oxd-topbar-header-breadcrumb > .oxd-text')
    .should('have.text', 'PIM')
  });

  it('Deve acessar a área de adicionar funcionario', () => {
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

  it('Deve adicionar um funcionário e validar mensagem de sucesso', () => {
    // Preenche os campos de nome e id do funcionário
    cy.fillNewEmployeeForm(person);

    // Verifica mensagem de sucesso
    cy.get('.oxd-toast')
    .should('be.visible')
    .contains('Successfully Saved');
  });

  it('Deve adicionar um funcionário e validar as informações', () => {
    // Preenche os campos de nome e id do funcionário
    cy.fillNewEmployeeForm(person);

    // Verifica se os dados batem com os exibidos nos detalhes do funcionário
    cy.validateEmployeeDetails(person);
  });

  it('Deve adiciona um funcionario e validar os detalhes pela lista de funcionários', () => {
    
    // Preenche os campos de nome e id do funcionário
    cy.fillNewEmployeeForm(person);

    // Pesquisa pelo funcionario passando nome completo e Id
    cy.searchEmployee(person);

    // Verifica se os dados batem com os exibidos nos detalhes do funcionário
    cy.validateEmployeeDetails(person);
  });
})