
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
import "@testing-library/cypress/add-commands";
import { userBuilder,testUserBuilder } from "../builder/User";
import jwt_decode from "jwt-decode";


Cypress.Commands.add("createUser", (override = {}) => {
  const user = userBuilder(override)();
  return cy
    .request({
      body: user,
      method: "POST",
      url: "/api/user/register"
    })
    .then(() => user);
});

const getAccessToken = () => {
  const token = window.localStorage.getItem("access-token");
  return JSON.parse(atob(token.split(".")[1]));
};

Cypress.Commands.add("loginNewUser", (override = {}) =>
  cy.createUser(override).then(user => {
    cy.request({
      body: {
        email: user.email,
        password: user.password
      },
      method: "POST",
      url: "/api/user/token"
    }).then(resp => {
      window.localStorage.setItem("access-token", resp.body.data);
      return user;
    });
  })
);

Cypress.Commands.add("createTestUser", (override = {}) => {
  const user = testUserBuilder(override)();
  return cy
    .request({
      body: user,
      method: "POST",
      url: "/api/user/register"
    })
    .then(() => user);
});

Cypress.Commands.add("loginTestUser", (override = {}) =>
  cy.createTestUser(override).then(user => {
    cy.request({
      body: {
        email: user.email,
        password: user.password
      },
      method: "POST",
      url: "/api/user/token"
    }).then(resp => {
      window.localStorage.setItem("access-token",  resp.body.data);
      return user;
    });
  })
);

// Cypress.Commands.add("AddEventTypeToUser", (override = {}) =>
//   cy.loginTestUser(override).then(user => {
//     const userid = getAccessToken()
    
//     cy.request({
//       body: {
//         title: "example",
//         description: "examdescription",
//         duration : 15,
//         link : "Google.com"
//       },
//       method: "POST",
//       url: "/api/user/" + userid.id + "/eventType"
//     }).then(resp => {
//       window.localStorage.setItem("access-token", resp.body.data);
//       return user;
//     });
//   })
// );


// Cypress.add("AddBooking", () =>
//   {
//     cy.request({
//       body: {
//         email: user.email,
//         password: user.password
//       },
//       method: "POST",
//       url: "/api/booking"
//     }).then(resp => {
//       window.localStorage.setItem("access-token", resp.body.data);
//       return user;
//     });
//   }
// );