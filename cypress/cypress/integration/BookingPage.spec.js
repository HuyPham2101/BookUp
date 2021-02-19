describe("BookingsOfUser" , () => {

    it("can add Bookings", ()=> {
        cy.loginNewUser({}).then((user) => {
        //first add an EventType
            cy.visit("/dashboard")
            cy.get('[data-cy=Offer-button-Testing]').click();
            cy.findByLabelText(/Titel/i).type("testingTitle")
            cy.findByLabelText(/Description/i).type("TestingDescription")
            cy.get('[data-cy=Select-Minute-Testing]').clear().type(15)
            cy.findByText("Submit").click();

            cy.findByText("Copy Link").click();
            alert("Copied");
            // get link from CLipboard then isolate the id then fetch to the visit test
            cy.task('getClipboard').then(($clip) => {
                const url = $clip;
                console.log('this is what was in clipboard', url);
                const eventId = url.split('/')[4]
                cy.visit('/booking/' + eventId);
            });

            cy.findByText(/28/i).click();
            cy.get('.time-btn').findByText('10:00am').click();
            cy.get('.confirm-btn').first().click();
        //Create a booking then redirect to our bookingofUserPage
            cy.findByLabelText(/Firstname/i).type("testInvitee")
            cy.findByLabelText(/Lastname/i).type("testInviteeLastname")
            cy.findByLabelText(/Email/i).type("Test@gmail.com")
            cy.findByText(/Schedule Event/i).click();
            cy.findByText(/Confirmed/i).should('exist')
            cy.screenshot();
        })
    })
})