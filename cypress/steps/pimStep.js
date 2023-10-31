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
  loginPage.loginSubmit(username, password);
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

Then(/^devo ser capaz de validar os detalhes do Colaborador$/, () => {
  page.validateEmployeeDetails(person);
});

When(/^pesquiso pelo Colaborador$/, () => {
  page.accessEmployeeList();
  page.searchEmployee(person);
});

Then(/^devo ser capaz de validar os dados do Colaborador na tabela$/, () => {
  page.validateEmployeeInTable(person);
  page.validateEmployeeDetails(person);
});