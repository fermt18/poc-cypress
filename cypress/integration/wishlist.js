// https://docs.cypress.io/guides/references/best-practices.html
// Run in PRO: manually access account and clean wishlist
// Run in PRE: TODO: access DDBB and clean wishlist
describe('Wishlist tests', function() {
  it('Wishlist logged out', function() {
	// Test preprocessing
	const countryCode='es'
	cy.visit('/' + countryCode)
	cy.get('div[id="modalClose"]').click()
	
	cy.searchGartment('es', 'vestidos')
    cy.modifyWishlistItemsFromProductList(0, 'add')
	cy.modifyWishlistItemsFromProductList(1, 'add')
	cy.modifyWishlistItemsFromProductList(1, 'remove')
	cy.searchGartment('es', 'corbatas')
	cy.modifyWishlistItemsFromProductList(2, 'add')
	cy.checkWishlistItemNbr(2)

	cy.removeFirstItemFromWishList()
	cy.checkWishlistItemNbr(1)
		cy.removeFirstItemFromWishList()
	cy.checkWishlistItemNbr(0)
  })
  it('Wishlist logged in', function() {
	// Test preprocessing
	//const countries = Cypress.env("countries") const countryCode='es'
	// foreach(contry)
	cy.visit('/' + countryCode)
	cy.get('div[id="modalClose"]').click()
	
	cy.searchGartment('es', 'corbatas')
    cy.modifyWishlistItemsFromProductList(0, 'add')
	cy.checkWishlistItemNbr(1)
    cy.login("es", ${user}, ${password})
	cy.url().should('include', '/favorites.faces')
	cy.checkWishlistItemNbr(1)

	cy.searchGartment('es', 'camisas')
	cy.modifyWishlistItemsFromProductList(5, 'add')
	cy.modifyWishlistItemsFromProductList(6, 'add')
	cy.modifyWishlistItemsFromProductList(7, 'add')
	cy.checkWishlistItemNbr(4)

    cy.logout()
	cy.url().should('include', '/favorites.faces')
    cy.checkWishlistItemNbr(0)

	// test postprocessing
	cy.login("es", ${user}, ${password})
	cy.deleteFavorites()
	cy.logout()
  })
})
