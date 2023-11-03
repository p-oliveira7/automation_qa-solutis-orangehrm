Cypress.Commands.add('optionalType', { prevSubject: 'element' }, (element, value) => {
    if (value === "") {
      cy.wrap(element).clear();
    } else {
      cy.wrap(element).type(value);
    }
});
