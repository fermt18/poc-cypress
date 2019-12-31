// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
var loggedIn = false

Cypress.Commands.add("visitCountryFromPreHome", (country, lang) => {
  cy.visit('/preHome.faces')
  cy.get('div[id="countrySelect_chosen"]').click()
  cy.get('input[type="text"]')
    .type(country)
    .type('{enter}')
  cy.get('div[class="phForm__langCnt phFormLangCnt on"]')
    .find('a')
    .contains(lang)
    .should('be.visible')
    .click()
})

Cypress.Commands.add("login", (countryCode, email, password) => {
  cy.visit('/' + countryCode + '/login?tab=login')
  cy.get('form[name="SVLoginCheck:FRegLogChk"]').within(() => {
    cy.get('input[name="SVLoginCheck:FRegLogChk:userMail"]')
	  .clear()
      .type(email)
      .should('have.value', email)
    cy.get('input[name="SVLoginCheck:FRegLogChk:chkPwd"]')
	  .clear()
      .type(password)
     .should('have.value', password)
    cy.get('input[type=submit]').click()
  })
  loggedIn = true
})

Cypress.Commands.add("logout", () => {
  cy.get('nav[id="userMenu"]').within(() => {
    cy.get('span[id^="SVBodyHeader:SVUserMenu:userMenuForm:"]')
      .filter('.userMenu__logout')
      .click({force:true})
  })
  loggedIn = false
})

Cypress.Commands.add("searchGartment", (countryCode, gartment) => {
  cy.visit('/' + countryCode)
  cy.get('div[class="menu-component"]').within(() => {
	  cy.get('span[class="menu-search-icon"]').click()
  })
  cy.get('.search-input')
    .type(gartment)
    .should('have.value', gartment).type('{enter}')
  cy.url().should('include', '/' + countryCode + '/search?')
})

Cypress.Commands.add("modifyWishlistItemsFromProductList", (itemNbr, action) => {
  // we alredy are on the product list
  cy.get('div[id=page1]').within(() => {
	cy.get('span[class="product-list-fav product-list-fav-js"]')
      .eq(itemNbr)
      .should('have.attr', 'data-fav', action)
      .click()
  })
})

Cypress.Commands.add("removeFirstItemFromWishList", () => {
  cy.visit('/favorites.faces')
  cy.get('span[class="close icofav-eliminar"]')
	  .first()
	  .click()
})

Cypress.Commands.add("checkWishlistItemNbr", (items) => {
  if(items == 0){
    cy.get('div[class="favorites-empty-container"]')
  }
  else if(items > 0){
	if(loggedIn == false){
	  items++ // due to content-separator when not logged in, not apply for empty list
	}
    cy.visit('/favorites.faces')
    cy.get('ul[id="contentDataFavs"]')
      .children()
	  .should('have.length', items) 
  }
})

Cypress.Commands.add("deleteFavorites", (items) => {
  cy.visit('/favorites.faces')
  cy.get('span[class="close icofav-eliminar"]').click({multiple:true})
})

// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
