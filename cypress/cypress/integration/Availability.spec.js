describe("Availability" , () => {
    it("can update Weekly Hours ", ()=> {
        cy.loginNewUser({}).then((user) => {
            cy.visit("/Availability");
            cy.screenshot();
            // first Item Test
            cy.findAllByPlaceholderText(/Start Time/i).first().clear({force:true}).type('12:12',{force:true})
            cy.contains('Ok').click();
            cy.findAllByPlaceholderText(/End Time/i).first().clear({force:true}).type('18:12',{force:true})
            cy.contains('Ok').click();
            cy.findAllByPlaceholderText(/Start Time/i).first().should('have.value', '12:12')
            cy.findAllByPlaceholderText(/End Time/i).first().should('have.value', '18:12')

            //Last Item Test
            cy.findAllByPlaceholderText(/Start Time/i).last().clear({force:true}).type('12:12',{force:true})
            cy.get('button').last().click( );
            cy.findAllByPlaceholderText(/End Time/i).last().clear({force:true}).type('18:12',{force:true})
            cy.get('button').last().click( );
            cy.findAllByPlaceholderText(/Start Time/i).last().should('have.value', '12:12')
            cy.findAllByPlaceholderText(/End Time/i).last().should('have.value', '18:12')
            cy.screenshot();
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
})