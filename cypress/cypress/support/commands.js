
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
import { userBuilder } from "../builder/User";

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
  const tokenData = window.localStorage.getItem("access-token");
  return JSON.parse(tokenData);
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
