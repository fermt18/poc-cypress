describe('Home Multi Marca tests', function() {
  it('Header', function() {
	const countryCode='es'
	
    cy.visit('/' + countryCode)
	cy.get('div[id="modalClose"]').click()

	cy.get('ul[class="menu-section-brands"]').within(($ul) => {
		cy.get('li[id="sections_nuevo"]')
		  .should('have.class', 'menu-item-brands')
		  .and('be.visible')
		cy.get('li[id="she"]')
		  .should('have.class', 'menu-item-brands')
		  .and('be.visible')
		cy.get('li[id="he"]')
		  .should('have.class', 'menu-item-brands')
		  .and('be.visible')
		cy.get('li[id="nina"]')
		  .should('have.class', 'menu-item-brands')
          .and('be.visible')		  
		cy.get('li[id="nino"]')
		  .should('have.class', 'menu-item-brands')
		  .and('be.visible')		  
		cy.get('li[id="violeta"]')
		  .should('have.class', 'menu-item-brands')
		  .and('be.visible')		  
		cy.get('li[id="sections_edits"]')
		  .should('have.class', 'menu-item-brands')
		  .and('be.visible')		  
	})
  })
})