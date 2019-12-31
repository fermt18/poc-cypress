// LOCAL FUNCTIONS
// starts in step 1, leads to step 2
function registerStep1(email, isContactable) {
  cy.get('form[class="customFormIdSTEP1 customForms customFormLangES customFormCountryCode001"]').within(() => {
    cy.fillField("cfName", "John")
    cy.fillField("cfSname", "Doe")
    cy.fillField("cfEmail", email)
    cy.fillField("cfPassw", "mango123")
    cy.fillField("cfTelf", "666777888")
    cy.fillField("cfCp", "08001")
    if(isContactable == true){
        cy.xpath('//input[contains(@id, "cfPubli")]')
          .click()
          .check()
    }
    cy.get('input[type="submit"]')
      .focus()
      .click()
  })
}

// starts in step 2, leads to step 3 
function registerStep2(isContactable) {
  if(isContactable == true){
    cy.get('form[class="customFormIdSTEP2 customForms customFormLangES customFormCountryCode001"]').within(() => {
      cy.get('input[type="submit"]')
        .focus()
        .click()
    })
  }
}

// starts in step 3, leads to step 4
function registerStep3() {
  cy.get('form[class="customFormIdSTEP3 customForms customFormLangES customFormCountryCode001"]').within(() => {
    cy.fillField("cfDir1", "Calle 1")
    cy.get('input[type="submit"]')
      .focus()
      .click()
  })
}

// starts in step 4, leads to home
function registerStep4() {
  cy.get('div[class="submitContent ir-de-shopping-js"]').within(() => {
    cy.get('input[type="submit"]')
      .focus()
      .click()
  })
}

// starts if search bar visible, leads to garment
function searchGarment(garment) {
  cy.get('div[id="search_icon_button"]').click()
  cy.get('.search-input')
    .type(garment)
    .should('have.value', garment)
    .type('{enter}')
}

// stats in garment, leads to garment
function addCurrentGarmentToCart() {
  // add to cart and shop (cart appears when adding)
  cy.get('div[id="addCartContainer"]').within(() => {
    cy.get('button[id="productFormAdd"]').click()  
  })
  cy.get('div[class="selector-list selector-list--opened"]').within(() => {
    cy.get('span[class="size-available"]')
      .first()
      .click()
  })
  cy.get('div[id="addCartContainer"]').within(() => {
    cy.get('button[id="productFormAdd"]').click()  
  })
}

// GLOBAL FUNCTIONS
Cypress.Commands.add("fillField", (id, value) => {
    cy.xpath('//input[contains(@id, "' + id + '")]')
      .focus()  
      .clear()
      .type(value)
      .should('have.value', value)
    cy.wait(500)
})

// starts anywhere, leads to home as logged in user
Cypress.Commands.add("register", (email, isContactable) => {
    cy.visit('/login.faces')
    cy.get('.tab-title.registerTab').click()
    registerStep1(email, isContactable)
    registerStep2(isContactable)
    registerStep3()
    registerStep4()
})


// starts in garment, leads to checkout
Cypress.Commands.add("addGarmentAndShopCart", (garment) => {
    searchGarment(garment)
    addCurrentGarmentToCart()
    cy.get('span[id="bolsaComprar"]').click()
})


// starts in checkout, leads to purchase confirmation
Cypress.Commands.add("fillPaymentForm", () => {
  cy.get('form[id="SVBody:panelTarjetasForm"]').within(() => {
    cy.get("iframe").then(function($iframe){
      const $body = $iframe.contents().find('body')
      cy.wrap($body)
        .find('input[name="cardNumber"]')
        .type("5555 5555 5555 4444")
        .should('have.value', "5555 5555 5555 4444")
      cy.wrap($body)
        .find('input[name="cardHolder"]')
        .focus()
        .type("John Doe")
        .should('have.value', "John Doe")
      cy.wrap($body)
        .find('select[name="expirationMonth"]')
        .select("10")
      cy.wrap($body)
        .find('select[name="expirationYear"]')
        .select("2020")
      cy.wrap($body)
        .find('input[name="cvc"]')
        .focus()
        .type("737")
        .should('have.value', "737")
    })
    cy.get('span[id="btnCheckout"]')
      .dblclick()
  })
})

