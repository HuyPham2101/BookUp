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
            cy.findByText("testingTitle").should('exist')
            cy.findByText("TestingDescription").should('exist')
            cy.screenshot();
        })
    })
    it("can redirect to Availability Page", ()=> {
        cy.loginNewUser({}).then((user) => {
            cy.visit("/dashboard");
            cy.screenshot();
            cy.findByText(/Availability/i).click();
            cy.url().should("contain", "/Availability");
            cy.screenshot();
        })
    })
    it("can redirect to Meeting Page" , ()=> {
        cy.loginNewUser({}).then((user) => {
            cy.visit("/dashboard");
            cy.screenshot();
            cy.findByText(/Meetings/i).click();
            cy.url().should("contain", "/meetings");
            cy.screenshot();
        })
    })
})