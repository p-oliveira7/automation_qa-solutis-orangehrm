import PimElements from '../elements/pimElements';
const el = new PimElements();

class pimPage {
    visitEmployeePage() {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/pim/addEmployee');
    }

    fillNewEmployeeForm = (person) => {
        cy.get(el.firstName()).should('be.visible').type(person.firstName);
        cy.get(el.middleName()).should('be.visible').type(person.middleName);
        cy.get(el.lastName()).should('be.visible').type(person.lastName);
        cy.get(el.employeeId()).should('be.visible').clear().type(person.id);
        cy.get(el.fileInput()).selectFile(person.image, {force: true});
        cy.get(el.saveButton()).contains('Save').click();
        cy.get(el.toastMessage()).should('be.visible').contains('Successfully Saved');
    }

    validateEmployeeDetails = (person) => {
        cy.url().should('include', 'pim/viewPersonalDetails');
        cy.get(el.firstName()).should('have.value', person.firstName);
        cy.get(el.middleName()).should('have.value', person.middleName);
        cy.get(el.lastName()).should('have.value', person.lastName);
        cy.get(el.employeeId()).should('have.value', person.id);
    }

    searchEmployee = (person) => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewEmployeeList');
        cy.intercept({
            method: 'GET',
            url: '/web/index.php/api/v2/pim/employees*includeEmployees=onlyCurrent',
        }).as('getEmployees');
        cy.get(el.searchNameField()).parent().next().find('input')
            .should('exist')
            .type(`${person.firstName} ${person.middleName} ${person.lastName}`);
        cy.get(el.searchIdField()).parent().next().find('input')
            .should('exist')
            .type(person.id);
        cy.get(el.searchButton())
            .should('be.visible')
            .click();
        cy.wait('@getEmployees');
    }

    validateEmployeeInTable = (person) => {
        cy.get(el.tableRow()).should('have.length', 1).then((row) => {
            cy.wrap(row).within(() => {
                cy.get(el.idCell()).as('idCell');
                cy.get('@idCell')
                .should('have.text', person.id);

                cy.get(el.nameCell()).as('nameCell');
                cy.get('@nameCell')
                .should('have.text', `${person.firstName} ${person.middleName}`);

                cy.get(el.lastNameCell()).as('lastNameCell');
                cy.get('@lastNameCell')
                .should('have.text', person.lastName);
            });

            cy.wrap(row).click();
        });
    }
    accessPIM = () => {
        cy.get(el.mainMenu()).contains('PIM').click();
        cy.get(el.topbarText()).should('have.text', 'PIM');
    }

    accessAddEmployee = () => {
        cy.get(el.addEmployeeMenuOption()).contains('Add Employee').click();
        cy.get(el.addEmployeeCardText()).should('have.text', 'Add Employee');
    }

    accessEmployeeList = () => {
        cy.get(el.addEmployeeMenuOption()).contains('Employee List').click()
        cy.get(el.employeeListText()).should('have.text', 'Employee Information');
    }
}

export default pimPage;
