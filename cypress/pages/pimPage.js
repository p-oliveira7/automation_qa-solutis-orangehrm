import PimElements from '../elements/pimElements';
const el = new PimElements();
import Person from '../fixtures/person';

class pimPage {
    fillNewEmployeeForm = (person) => {
        cy.get(el.firstName()).should('be.visible').type(person.firstName);
        cy.get(el.middleName()).should('be.visible').type(person.middleName);
        cy.get(el.lastName()).should('be.visible').type(person.lastName);
        cy.get(el.employeeId()).should('be.visible').clear().type(person.id);
        cy.get(el.fileInput()).selectFile(person.image, {force: true});
        cy.get(el.saveButton()).contains('Save').click();
        cy.get(el.toastMessage()).should('be.visible').should('include.text', 'Successfully Saved');
        cy.url().should('include', 'pim/viewPersonalDetails');
    }

    validateEmployeeDetails = (person) => {
        cy.url().should('include', 'pim/viewPersonalDetails');
        cy.get(el.firstName()).should('have.value', person.firstName);
        cy.get(el.middleName()).should('have.value', person.middleName);
        cy.get(el.lastName()).should('have.value', person.lastName);
        cy.get(el.employeeId()).should('have.value', person.id);
    }

    searchEmployee = (person) => {
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

    // Método para verificar as células da linha
    verifyRow(row, person) {
        cy.wrap(row).within(() => {
        cy.get(el.idCell()).should('have.text', person.id);
        cy.get(el.nameCell()).should('have.text', `${person.firstName} ${person.middleName}`);
        cy.get(el.lastNameCell()).should('have.text', person.lastName);
        });
    }

    // Método para validar coloboradores na tabela
    validateEmployeesInTable(people) {
        if (!Array.isArray(people)) {
        people = [people];
        }

        cy.get(el.tableRow()).should('have.length', people.length).each(($row, index) => {
        const person = people[index];
        this.verifyRow($row, person);
        });
    }

    mockGetList() {
        cy.intercept('GET', '**/v2/pim/employees?**', { fixture: 'dynamicData.json' }).as('mockListPim');
    }
    intercepGetList() {
        cy.intercept('GET', '**/v2/pim/employees?**').as('ListPim')
    }
    
    waitGetListValidateData() {
        cy.wait('@mockListPim').then((res) => {
          let userData = res.response.body.data;
          
          // Crie objetos Person com base nos dados da resposta
            const people = userData.map((data) => {
                return new Person(
                data.firstName,
                data.middleName,
                data.lastName,
                data.employeeId
                );
          });
          // Chama o método para validar os colaboradores na tabela
          this.validateEmployeesInTable(people);
        });
      }

    visitEmployeeList = () => {
        cy.visit('opensource-demo.orangehrmlive.com/web/index.php/pim/viewEmployeeList')
    }

    accessPIM = () => {
        cy.get(el.mainMenu()).contains('PIM').click();
        cy.get(el.topbarText()).should('have.text', 'PIM');
        
    }

    accessAddEmployee = () => {
        cy.get(el.pimMenuOption()).contains('Add Employee').click();
        cy.url().should('include', 'pim/addEmployee');
        cy.get(el.addEmployeeCardText()).should('have.text', 'Add Employee');
    }

    accessEmployeeList = () => {
        cy.get(el.pimMenuOption()).contains('Employee List').click()
        cy.get(el.employeeListText()).should('have.text', 'Employee Information');
    }
}

export default pimPage;
