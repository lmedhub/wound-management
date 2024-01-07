describe("Your Test Suite", () => {
  it("should visit the home page", () => {
    cy.visit("/");
    cy.get("h4").should("contain.text", "Unauthorized");
  });

  // Add more tests as needed
});
