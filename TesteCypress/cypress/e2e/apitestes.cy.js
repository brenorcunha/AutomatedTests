/// <reference types="cypress"/>

it('Requisição GET', () => {
    cy.request({
        method: 'GET',
        url: '',
    }).then((response) =>{
        console.log('Response: ', response)
        expect(response.status).to.equal(200)
        expect(response.body.id)
    })
});
it('404 Error', () => {
    cy.request({
        method: 'GET',
        url: '',
        failOnStatusCode: false
    }).then((response) => {
        expect(response).to.equal(404)
        expect(response.body.error)
    })
});