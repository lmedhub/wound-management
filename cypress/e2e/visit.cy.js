describe("User flow", () => {
  it("User has active session", () => {
    cy.setCookie(
      "next-auth.session-token",
      "82f51512-1c94-43e7-9374-98e32307624b"
    );

    cy.visit("/mywounds");

    cy.contains("All wounds").should("be.visible");

    cy.contains("New wound").click();

    cy.url().should("include", "/wound/create");

    cy.get("#selectTypeId")
      .parent()
      .click()
      .get('ul > li[data-value="Contusion"]')
      .click();

    cy.get('g[name="frontHead"]').click({ multiple: true, force: true });

    cy.get('.MuiInputBase-root textarea[name="note"]').type(
      "cypress wound create"
    );

    cy.get('button[type="submit"]').click({ multiple: true });

    cy.url().should("include", "/mywounds");

    cy.contains("cypress wound create").click();

    cy.contains("Edit").click();

    cy.get('.MuiInputBase-root textarea[name="note"]')
      .clear()
      .type("cypress wound edit");

    cy.get('button[type="submit"]').click({ multiple: true }).click();

    cy.url().should("include", "/mywounds");

    cy.contains("cypress wound edit").click();

    cy.contains("Delete").click();

    cy.url().should("include", "/mywounds");

    cy.contains("cypress wound edit").should("not.exist");
  });
});
