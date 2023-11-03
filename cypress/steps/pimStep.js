import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import pimPage from '../pages/pimPage';
import Person from '../fixtures/person';
import LoginPage from '../pages/loginPage';

const page = new pimPage();
const loginPage = new LoginPage
let person = new Person();

const username = Cypress.env("ORANGE_USERNAME");
const password = Cypress.env("ORANGE_PASSWORD");

Given(/^que o login é realizado com sucesso$/, () => {
  loginPage.loginSubmitSession(username, password);
});

Given(/^que acesso a área PIM$/, () => {
  page.accessPIM();
});

Given(/^acesso a área Adicionar Colaborador$/, () => {
  page.accessAddEmployee();
});

Given(/^que um novo Colaborador é cadastrado com sucesso$/, () => {
  person = new Person();
  page.accessPIM();
  page.accessAddEmployee();
  page.fillNewEmployeeForm(person);
});

When(/^preencho o formulário Novo Colaborador com dados válidos$/, () => {
  page.fillNewEmployeeForm(person);
});

Then(/^os detalhes do Colaborador devem ser exibidos corretamente$/, () => {
  page.validateEmployeeDetails(person);
});

When(/^pesquiso pelo Colaborador$/, () => {
  page.accessEmployeeList();
  page.searchEmployee(person);
});

Then(/^os detalhes do Colaborador devem ser exibidos corretamente na tabela$/, () => {
  page.validateEmployeeInTable(person);
});