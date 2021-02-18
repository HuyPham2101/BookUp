describe("BookingsOfUser" , () => {
    it("can add Upcoming events ", ()=> {
        cy.loginNewUser({}).then((user) => {
            cy.visit("/meetings");
            cy.screenshot();
        })
    })
})