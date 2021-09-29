import cypress from "cypress";

describe('Blog app', function () {
    beforeEach(function () {
        resetData()
    })

    it('Front page can be opened', function () {
        cy.contains('Blogs')
        cy.contains('Log into Application')
    })

    // it('Login form can be opened', function () {
    //     cy.contains('Login').click()
    // })
})


describe('Logging in', function () {

    beforeEach(function () {
        resetData()
    })

    it('Login fails with wrong password', function () {
        cy.contains('Login').click()

        cy.get('#username').type('kROSS')
        cy.get('#password').type('wrong')
        cy.get('#login-button').click()

        // TODO: Implement a toast notification
        // cy.get('.error').should('contain', 'Wrong Credentials')

    })

    it('User can log in', function () {
        cy.contains('Login').click()

        cy.get('#username').type('kROSS')
        cy.get('#password').type('qp!JgMQ8ALddLLb7sQxoAJe?HdPPPqjjq#94!SEn')
        cy.get('#login-button').click()

        cy.contains('Aditya Sharma logged-in')
    })
})

describe('New Blog creation', function () {
    beforeEach(function () {
        resetData()
        // TODO: Learn how to add custom commands to namespace
        // @ts-ignore
        cy.login({username: 'kROSS', password: 'qp!JgMQ8ALddLLb7sQxoAJe?HdPPPqjjq#94!SEn'})
    })

    it.only('User can create a new Blog', function () {
        cy.contains('Create New Blog').click()
        cy.get('#title').type("Hello")
        cy.get('#author').type('Adele')
        cy.get('#url').type('https://www.youtube.com/watch?v=YQHsXMglC9A')
        cy.contains<HTMLButtonElement>('Submit').click()

        cy.contains('View').click()
        cy.contains('Hello By Adele')
    })

    it.only('User can like a new Blog', function () {
        cy.contains('Create New Blog').click()
        cy.get('#title').type("Hello")
        cy.get('#author').type('Adele')
        cy.get('#url').type('https://www.youtube.com/watch?v=YQHsXMglC9A')
        cy.contains<HTMLButtonElement>('Submit').click()

        cy.contains('View').click()
        cy.contains('Hello By Adele')

        cy.contains<HTMLButtonElement>('Like').click()
        cy.contains('1 Likes')

        // TODO: Start from 5.20


    })
})



// describe('When logged in', function () {
//     describe('and several notes exist', function () {
//         beforeEach(function () {
//             resetData()
//             // @ts-ignore
//             cy.login({username: 'kROSS', password: 'qp!JgMQ8ALddLLb7sQxoAJe?HdPPPqjjq#94!SEn'})
//             // @ts-ignore
//             cy.createNote({content: 'first note', important: false})
//             // @ts-ignore
//             cy.createNote({content: 'second note', important: false})
//             // @ts-ignore
//             cy.createNote({content: 'third note', important: false})
//         })
//
//         it('One of those can be made important', function () {
//             cy.contains('Show All').click()
//             cy.contains('second note').parent().find('button').as('theButton')
//             cy.get('@theButton').click()
//             cy.get('@theButton').should('contain', 'Make not important')
//         })
//     })
// })

function resetData() {
    cy.request('POST', 'http://localhost:3000/api/testing/reset')
    const user = {
        name: 'Aditya Sharma',
        username: 'kROSS',
        password: 'qp!JgMQ8ALddLLb7sQxoAJe?HdPPPqjjq#94!SEn'
    }
    cy.request('POST', 'http://localhost:3000/api/users/', user)
    cy.visit('http://localhost:3000')
}
