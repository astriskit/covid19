describe("Route:/", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("Lands on sign-in page", () => {
    cy.location("pathname").should("be.a", "/login");
  });
});
