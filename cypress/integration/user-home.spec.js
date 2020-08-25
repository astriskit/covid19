describe("Route:/, /login", () => {
  const prefix = "/covid19"; //using a sub-directory to host

  it("A new user lands on sign-in page or home-page depending on auth", () => {
    cy.visit(`${prefix}/`);
    cy.wait(2000);
    cy.location().should(({ pathname }) => {
      expect(pathname).to.be.eq(`${prefix}/login-signup`);
    });
  });

  it("sign-in/sign-out and covid-dashboard-data", () => {
    const testEmail = "testtest39+covid19app+482@abc.xyz.334.test";
    const testPwd = "test-password-1234567";
    cy.visit(`${prefix}/login-signup`);
    cy.wait(2000);
    cy.get('[data-cy="username"]')
      .type(testEmail)
      .should("have.value", testEmail);
    cy.get('[data-cy="password"]').type(testPwd).should("have.value", testPwd);
    cy.get('[data-cy="login"]').click();
    cy.wait(2000);
    cy.location().should(({ pathname }) =>
      expect(pathname).to.eq(`${prefix}/`)
    );
    cy.wait(2000);
    cy.get('[data-row-key="Andaman and Nicobar Islands"]').should((el) => {
      expect(el).to.exist;
      // if data-loaded - will have this row in table
    });
    cy.get('[data-cy="logout"]').click();
    cy.location().should(({ pathname }) =>
      expect(pathname).to.eq(`${prefix}/login-signup`)
    );
  });
});
