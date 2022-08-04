/// <reference types="cypress" />

describe('Test SignUp page', () => {
    before(() => {
        //Make a POST request to localhost:8800/api/auth/delete
        cy.request('POST', 'http://localhost:8800/api/auth/delete', {
            email: 'legitUser@gmail.com'
        })
        // remove user from local storage before each test
        localStorage.removeItem('user');
        cy.visit('/signup');
    })
    it("should have a title 'CV easy'", () => {
        cy.title().should('eq', 'CV easy');
    });
    // form should exist
    it('should have a form', () => {
        cy.get('form').should('exist');
    })
    // should have input for email, password, name, confirm password
    it('should have input for email, password, name, confirm password', () => {
        cy.get('input[type=email]').should('exist');
        cy.get('input[type=password]').should('exist');
        cy.get('input[type=text]').should('exist');
        cy.get('input[type=password]').should('exist');
    }   // should have a button "Submit"
    )
    it('should have a button "Submit"', () => {
        cy.get('button').should('exist');
        // text in button should be "Submit"
        cy.get('button').should('have.text', 'Submit');
    }   // it should have a link "Sign up here"
    )
    it('should have a link "Sign up here"', () => {
        cy.get('a').should('exist');
        cy.get('a').should('have.text', 'Sign in here');
    }   // it should have a link "Sign up here"
    )
    // it should sign up by entering email, password, name, confirm password
    it('should sign up by entering email, password, name, confirm password', () => {
        cy.get('input[type=email]').type('legitUser@gmail.com');
        cy.get('#password').type('Lucky@11082001');
        cy.get('input[type=text]').type('Lucky');
        cy.get('#confirmPassword').type('Lucky@11082001');
        cy.get('button').click();
        cy.url().should('eq', 'http://localhost:3000/signin');
        cy.login('legitUser@gmail.com', 'Lucky@11082001');
        cy.url().should('eq', 'http://localhost:3000/about');
    })
})

describe('Test SignIn page', () => {
    beforeEach(() => {
        // remove user from local storage before each test
        localStorage.removeItem('user');
        cy.visit('/signin');
    })
    it('should have a title "CV easy"', () => {
        cy.title().should('eq', 'CV easy');
    });
    // form should exist
    it('should have a form', () => {
        cy.get('form').should('exist');
    });
    // should have input for email and password
    it('should have input for email and password', () => {
        cy.get('input[type=email]').should('exist');
        cy.get('input[type=password]').should('exist');
    })
    // should have a button "Submit"
    it('should have a button "Submit"', () => {
        cy.get('button').should('exist');
        // text in button should be "Submit"
        cy.get('button').should('have.text', 'Submit');
    })
    // it should have a link "Sign up here"
    it('should have a link "Sign up here"', () => {
        cy.get('a').should('exist');
        cy.get('a').should('have.text', 'Sign up here');
    })
    // it should sign in by entering email and password
    it('should sign in by entering email and password', () => {
        cy.login('legitUser@gmail.com', 'Lucky@11082001');
        cy.url().should('eq', 'http://localhost:3000/about');
    })

})

// Test /about page
describe('Test About page', () => {
    before(() => {
        // remove user from local storage before each test
        localStorage.removeItem('user');
        cy.visit('/signin');
        cy.login('legitUser@gmail.com', 'Lucky@11082001');

    }   // it should have a title "CV easy"
    )

    // test side bar
    it('should have a side bar', () => {
        cy.get('div.sidebar').should('exist');
    }   // it should have a link "About"
    )

    // it should contain edit button
    it('should contain edit button', () => {
        cy.get('[data-testid="EditIcon"]').should('exist');
    }   // it should have a link "Sign up here"
    )

    it('Should edit the content on clicking edit button', () => {
        cy.get('[data-testid="EditIcon"]').click();
        // input with id "name" should exist
        cy.get('#name').should('exist').and('have.value', 'Lucky');
        // input with id "email" should exist with default value "legitUser@gmail.com
        cy.get('#email').should('exist').and('have.value', 'legitUser@gmail.com');
        cy.get('#contact').should('exist');
        cy.get('#about').should('exist');

        // edit content
        // clear the input with id "name"
        cy.get('#name').clear();
        cy.get('#name').type('Lucky kumar');
        cy.get('#email').clear();
        cy.get('#email').type('legitUser@gmail.com');
        cy.get('#save-btn').click();

        // check if the content has been edited
        cy.get('#name').should('have.text', 'Lucky kumar');
        cy.get('#email').should('have.text', 'legitUser@gmail.com');
    })
})

describe('Test Skills page', () => { 
    before(() => {
        // remove user from local storage before each test
        localStorage.removeItem('user');
        cy.visit('/signin');
        cy.login('legitUser@gmail.com', 'Lucky@11082001');
    })

    // test side bar
    it('should have a side bar', () => {
        cy.get('div.sidebar').should('exist');
    }   
    )
})


