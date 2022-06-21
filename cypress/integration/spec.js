/// <reference types="Cypress" />

const url = Cypress.env("baseUrl");
const maxBoxToAdd = Cypress.env("maxBoxCanBeAdded");

describe(`The Home Page`, () => {
    it(`Successfully loads the homepage`, () => {
      cy.visit(url);
      cy.log(`After page load "Add Box" and "Remove Box" buttons should be a visible`);
      cy.get('.addBtn').contains('Add Box').should('be.visible');
      cy.get('.removeBtn').contains('Remove Box').should('be.visible');
    });

    it(`Verify Header text`, () => {
      cy.log(`Header text should be "QA Exercise".`);
      cy.get('h1').should('contain', 'QA Exercise');
    });

    it(`It can add a box`, () => {
      cy.log(`Adding two boxes`);
      cy.get('.addBtn').click();
      cy.get('.addBtn').click();

      cy.log(`Latest box added should have a value of 1`);
      cy.get('.boxes > :nth-child(2)').should('contain', '1');
    });

    it(`It can remove a box`, () => {
      cy.visit(url);
      cy.log(`Adding two boxes`);
      cy.get('.addBtn').click();
      cy.get('.addBtn').click();

      cy.log(`Removing one box`);
      cy.get('.removeBtn').click();
      
      cy.log(`One box should remain with a value of 0`);
      cy.get('.boxes > :nth-child(1)').should('contain', '0')
    });

    it(`It can add upto ${maxBoxToAdd} boxes`, () => {
      
      cy.visit(url);
      
      for (let index = 0; index < maxBoxToAdd; index++) {
        cy.log(`Clicking on "Add Box button to add a  box number: ${index + 1}`);
        cy.get('.addBtn').click();
        cy.log(`Verifying box number: ${index + 1} is added with correct label.`);
        cy.log(`The label should be ${index}`);
        cy.get(`.boxes > :nth-child(${index + 1})`).contains(index);
      }

      cy.log(`Validating after adding ${maxBoxToAdd} boxes, the "Add Box" button is disabled`);
      cy.get('.addBtn').should('be.disabled');
    });

    it(`"Remove Box" button should be disabled when there are no boxes present.`, () => {

      cy.visit(url);
      cy.log('Ensure there are no boxes present on the screen');
      cy.get('.boxes').children('.box').should('not.exist');
      
      cy.log(`Validate "Remove Box" button is disabled on the screen`);
      cy.get('.removeBtn').should('be.disabled');
    });

    it(`Error message should not be visible when at least one box is created`, ()=>{
      cy.visit(url);
      
      // cy.get('.removeBtn').click();

      /* Ideally the steps for this test should have been the following
        1. visit the page
        2. click on the Remove Box button, which would trigger the error message to appear // this only happens when bug is present in the app
        3. validate error message shows on screen
        4. click on Add Box button to add a box
        5. Validate error message is not shown

        however this would cause test developer to keep an eye on the bug fix where the "Remove Box" button should be disabled
        when there are no boxes on the screen. and if he forgets to update the test case after the bug fix by the developer, this steps would
        fail on the wrong step

        to make sure the test always works and it does not require maintenance, we would simply validate 
        that no error message shown when there is a box added on the screen 
      */

      cy.get('.addBtn').click();
      cy.get('.errorMsg').should('not.exist');

    })
});
