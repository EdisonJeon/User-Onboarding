describe("USER REGISTRATION APP", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3003");
  });

  // SELECT ELEMENTS HERE AS VARIABLES, DRY CODE

  it("SANITY CHECK", () => {
    expect(1 + 2).to.equal(3);
    expect("Edison").to.not.equal("Alex");
    cy.url().should("include", "localhost");
  });

  it("RENDERS ELEMENTS", () => {
    cy.get("input[name=username]").should("exist");
    cy.get("input[type=radio]").should("exist");
    cy.get("#favFood").should("exist");
    cy.get("input[type=checkbox]").should("exist");
    cy.get("input[type=submit]");
  });

  it("CHECKING FORM LOGIC", () => {
    cy.get("input[type=submit]").should("be.disabled");
    cy.get("input[name=username]")
      .should("have.value", "")
      .type("testingUsername")
      .should("have.value", "testingUsername");
    cy.get("input[value=javascript]")
      .should("not.be.checked")
      .check()
      .should("be.checked");
    cy.get("input[value=rust]")
      .should("not.be.checked")
      .check()
      .should("be.checked");
    cy.get("#favFood")
      .should("have.value", "")
      .select("spaghetti")
      .should("have.value", "spaghetti");
    cy.get("input[type=checkbox]")
      .should("not.be.checked")
      .check()
      .should("be.checked");
    cy.get("input[type=submit]").should("not.be.disabled").click();
  });
});

/*
npm i -D cypress
npx cypress open

cy.contains(/submit quote/i) === looking for characters regardless of casing
*/
