describe('View', () => {
  beforeEach(() => {
    cy.intercept('https://www.myposter.de/web-api/job-interview', {
      fixture: 'api-response.json'
    })
    cy.visit('/')
  }),
    it('Should fetch data from an API URL in Pinia Store', () => {
      // Abfangen der Netzwerkanfrage und Senden einer gefälschten Antwort
      cy.intercept('https://www.myposter.de/web-api/job-interview', {
        fixture: 'api-response.json'
      })
      cy.visit('/')
    })

  it('should have a searchbar', () => {
    cy.get('.searchbar').should('be.visible')
  })

  it('should have a main section', () => {
    cy.get('main').should('be.visible')
  })

  it('main section should have a width of 920px', () => {
    cy.window().then((win) => {
      cy.get('.container').then(($element) => {
        expect(win.getComputedStyle($element[0]).width).to.eq('920px')
      })
    })
  })
})

describe('Button', () => {
  beforeEach(() => {
    cy.intercept('https://www.myposter.de/web-api/job-interview', {
      fixture: 'api-response.json'
    })
    cy.visit('/')
  }),
    it('should have a button', () => {
      cy.get('button').should('be.visible')
    })

  it('should change color after click', () => {
    cy.get('button').click({ multiple: true })
    cy.get('button').should('have.css', 'background-color', 'rgb(0, 164, 224)')
  })
})
