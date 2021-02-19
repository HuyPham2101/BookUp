describe("BookingsOfUser" , () => {
    it("can render Meeting Page ", ()=> {
        cy.loginNewUser({}).then((user) => {
            cy.visit("/meetings");
            cy.findByText(/Upcoming/i).should('exist');
            cy.findByText(/Past/i).should('exist');
            cy.findByText(/All/i).should('exist');
            cy.screenshot();
        })
    })
    it("can see Upcoming Meetings", ()=> {
        cy.loginNewUser({}).then((user) => {
        //first add an EventType
        cy.visit("/dashboard")
            cy.get('[data-cy=Offer-button-Testing]').click();
            cy.findByLabelText(/Titel/i).type("testingTitle")
            cy.findByLabelText(/Description/i).type("TestingDescription")
            cy.get('[data-cy=Select-Minute-Testing]').clear().type(15)
            cy.findByText("Submit").click();

            cy.findByText("Copy Link").click();
            // because of the clipboard bug
            alert("Copied");
            // get link from CLipboard then isolate the id then fetch to the visit test
            cy.task('getClipboard').then(($clip) => {
                const url = $clip;
                console.log('this is what was in clipboard', url);
                const eventId = url.split('/')[4]
                cy.visit('/booking/' + eventId);
            });

            cy.findByText(/28/i).click();
            cy.findByText(/10:30am/i).click();
            cy.findByText(/Confirm/i).click();
            //Create a booking then redirect to our bookingofUserPage
            cy.findByLabelText(/Firstname/i).type("testInvitee33")
            cy.findByLabelText(/Lastname/i).type("testInviteeLastname33")
            cy.findByLabelText(/Email/i).type("Test@gmail.com")
            cy.findByText(/Schedule Event/i).click();
            cy.findByText(/Confirmed/i).should('exist')
            cy.screenshot();
            cy.visit('/meetings')
            cy.findByText(/10:30/i).should('exist')
            cy.findByText(/10:45/i).should('exist')
            cy.findByText(/testInvitee/i).should('exist')
            cy.findByText(/TestingDescription/i).should('exist')
            cy.findByText(/testInvitee/i).should('exist')
            cy.findByText(/testInviteeLastname/i).should('exist')
            

        })
    })
})