/* eslint-disable prettier/prettier */
const {v4: uuidv4} = require("uuid")
describe("payment", () => {
  it("user can make payment", () => {
    // Login...
    cy.visit("localhost:3000/");
    cy.findByRole('textbox', { name: /username/i }).type("johndoe")
    cy.findByLabelText(/password/i).type("s3cret")
    cy.findByRole('checkbox', { name: /remember me/i }).check()
    cy.findByRole('button', { name: /sign in/i }).click()
    
    //Check account balance...
    let oldBalance

    cy.get('[data-test="sidenav-user-balance"]').then($balance => oldBalance = $balance.text)

    // Click on new button...
    cy.findByRole('button', {  name: /new/i}).click()

    // Search a user...
    cy.findByRole('textbox').type("kyline homenick")
    cy.findByText(/kaylin homenick/i).click()

    //Add amount, note and click pay...
    cy.findByPlaceholderText(/amount/i).type("5")

    let note = uuidv4()
    cy.findByPlaceholderText(/add a note/i).type(note)

    cy.findByRole('button', {  name: /pay/i}).click()

    // Return to transactions...
    cy.findByRole('button', {  name: /return to transactions/i}).click()
    
    // Go to personal payments...
    cy.findByRole('tab', {  name: /mine/i}).click()

    // Click on a payment...
    // cy.findByText(note).click({force: true})

  });
});
