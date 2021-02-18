describe("Dashboard" , () => {
    it("can create a new Offer", ()=> {
        cy.loginNewUser({}).then((user) => {
            cy.visit("/dashboard");
            cy.screenshot();
            cy.get('[data-cy=Offer-button-Testing]').click();
            cy.findByLabelText(/Titel/i).type("testingTitle")
            cy.findByLabelText(/Description/i).type("TestingDescription")
            cy.get('[data-cy=Select-Minute-Testing]').clear().type(15)
            cy.findByText("Submit").click();
            cy.findByText("Copy Link").should('exist')
            cy.screenshot();
        })
    })
})