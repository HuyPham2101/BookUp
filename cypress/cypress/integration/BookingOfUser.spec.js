describe("BookingsOfUser" , () => {
    it("can render Meeting Page ", ()=> {
        cy.loginTestUser({}).then((user) => {
            cy.visit("/meetings");
            cy.findByText(/Upcoming/i).should('exist');
            cy.findByText(/Past/i).should('exist');
            cy.findByText(/All/i).should('exist');
            cy.screenshot();
        })
    })
    it("can add Upcoming events", ()=> {
        cy.loginTestUser({}).then((user) => {
        //first add an EventType
            cy.visit("/dashboard")
            cy.get('[data-cy=Offer-button-Testing]').click();
            cy.findByLabelText(/Titel/i).type("testingTitle")
            cy.findByLabelText(/Description/i).type("TestingDescription")
            cy.get('[data-cy=Select-Minute-Testing]').clear().type(15)
            cy.findByText("Submit").click();
            cy.screenshot();

        // then copy link to redirect to booking page // Todo
        })
    })
})