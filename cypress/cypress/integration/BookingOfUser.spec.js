describe("BookingsOfUser" , () => {
    it("can add Upcoming events ", ()=> {
        cy.loginNewUser({}).then((user) => {
            cy.visit("/meetings");
            cy.findByText(/Upcoming/i).should('exist');
            cy.findByText(/Past/i).should('exist');
            cy.findByText(/All/i).should('exist');
            cy.screenshot();
        })
    })
})