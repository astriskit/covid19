describe("Route: /login, /signup", () => {
  const prefix = "/covid19";
  it("create user account", () => {
    cy.visit(`${prefix}/login-signup`);
    const testAccount = `testtest39+covid19app+${Number.parseInt(
      Math.random() * 1000
    )}@abc.xyz.334.test`;
    const testPassword = `test-password-1234567`;
    cy.get('[data-cy="username"]')
      .type(testAccount)
      .should("have.value", testAccount);
    cy.get('[data-cy="password"]')
      .type(testPassword)
      .should("have.value", testPassword);
    cy.get('[data-cy="signup"]').click();
    cy.wait(2000);
    cy.get('[data-cy="login"]').click();
    cy.wait(2000);
    cy.get('[data-cy="logout"]').click();
    cy.wait(2000);
    cy.location().should(({ pathname }) =>
      expect(pathname).to.eq(`${prefix}/login-signup`)
    );
  });
});
