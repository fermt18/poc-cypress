describe('PreHome tests', function() {
  it('PreHome', function() {
    cy.visitCountryFromPreHome('España', 'Català')
    cy.url().should('include', '/es-ca')
	cy.get('p[class="gdpr-newsletter-register-text"]')
	  .should('be.visible')
	cy.get('div[id="modalClose"]').click()
  })
})