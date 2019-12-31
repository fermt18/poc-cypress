describe('Salesforce tests', function() {
  it('login', function() {
	  cy.visit("https://mangoservice--uat.lightning.force.com/lightning/r/Case/5001w000002TZZiAAO/view")
	  cy.wait(5000)
	  cy.get('#username').type("victor.parera@mango.com.uat")
      cy.get('#password').type("Cardedeu1996")
	  cy.get('input[id="Login"]').click()
      //cy.get('div[class="slds-icon-waffle"]')
	//	.should('be.visible')
	//	.click()
  })
})