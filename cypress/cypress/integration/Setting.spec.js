describe("Setting" , () => {
    it("can render setting Page and edit username", ()=> {
        cy.loginNewUser({}).then((user) => {
            cy.visit("/settings");
            cy.screenshot()
            cy.get('[data-cy=userName-Input-Test]').clear().type("UpdatedUserNameTest")
            cy.findByText(/Save/i).click()
            cy.findByText(/UpdatedUserNameTest/i).should('exist')
            cy.findByText(/Changes saved!/i).should('exist')
            cy.screenshot()
        })
    })

    it("can render setting Page and edit password", ()=> {
        cy.loginNewUser({}).then((user) => {
            cy.visit("/settings");
            cy.findAllByPlaceholderText(/new password/i).clear().type("UpdatedPassword")
            cy.findAllByPlaceholderText(/repeat password/i).clear().type("UpdatedPassword")
            cy.findByText(/Save/i).click()
            cy.findByText(/Changes saved!/i).should('exist')
            cy.screenshot()
            // cy.findByText(/UpdatedUserNameTest/i).should('exist')
        })
    })

    it("can redirect to DashBoard", ()=> {
        cy.loginNewUser({}).then((user) => {
            cy.visit("/Availability");
            cy.screenshot();
            cy.findByText(/Dashboard/i).click();
            cy.url().should("contain", "/dashboard");
            cy.screenshot();
        })
    })

    it("can redirect to Meetings", ()=> {
        cy.loginNewUser({}).then((user) => {
            cy.visit("/Availability");
            cy.screenshot();
            cy.findByText(/Meetings/i).click();
            cy.url().should("contain", "/meetings");
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
})