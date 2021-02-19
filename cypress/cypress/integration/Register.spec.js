import { userBuilder } from "../builder/User";

describe("RegisterPage", () => {
  it("User can register", () => {
    const user = userBuilder({})();
    cy.visit("/register");
    cy.screenshot();
    cy.findByLabelText(/User Name/i).type(user.userName);
    cy.findByLabelText(/Email Address/i).type(user.email);
    cy.findByLabelText(/Password/i).type(user.password);
    cy.contains('Sign Up').click()
    cy.url().should("contain", "/dashboard");
    cy.screenshot();
  });
  
  it("Can move to login Page", ()=> {
    cy.visit("/register");
    cy.contains("Already have an account? Sign in").click()
    cy.url().should("contain", "/login");
  });
})
