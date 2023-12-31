import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';

import LoginPage from '../pages/loginPage';
const loginPage = new LoginPage

const username = Cypress.env("ORANGE_USERNAME");
const password = Cypress.env("ORANGE_PASSWORD");


Given(/^acesso a pagina de login$/, () => {
	cy.visit('/')
    loginPage.checkLoginImage();
});

When(/^realizo o login com dados válidos$/, () => {
    loginPage.loginSubmit(username,password);
});

Then(/^login é realizado com sucesso$/, () => {
	loginPage.validateLoginSucessfull();
});

When(/^realizo login com "([^"]*)" e "([^"]*)"$/, (name,secret) => {
	loginPage.loginSubmit(name,secret);
});

Then(/^alerta de dados incorretos é exibido$/, () => {
	loginPage.validateErrorLoginAlert()
});

Then(/^alerta de "([^"]*)" é exibido com sucesso$/, (test) => {
	
    loginPage.validateSpanErrorRequired()
});

