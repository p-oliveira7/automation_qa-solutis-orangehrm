import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import pimPage from '../pages/pimPage';
import Person from '../fixtures/person';

const page = new pimPage();
const person = new Person();

const username = Cypress.env("ORANGE_USERNAME");
const password = Cypress.env("ORANGE_PASSWORD");

Given('O usuário está logado', () => {
    cy.login(username, password);
});

Given('que acesso a área PIM', () => {
  page.accessPIM();
});

Given('acesso a área Adicionar Colaborador', () => {
  page.accessAddEmployee();
});

When('preencho o formulário Novo Colaborador com dados válidos', () => {
  page.fillNewEmployeeForm(person);
});

Then('devo ser capaz de validar os detalhes do Colaborador', () => {
  page.validateEmployeeDetails(person);
});

When('procuro por um Colaborador', () => {
  page.searchEmployee(person);
});

Then('devo ser capaz de validar os dados do Colaborador na tabela', () => {
  page.validateEmployeeInTable(person);
  page.validateEmployeeDetails(person);
});
