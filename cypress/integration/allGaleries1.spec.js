import {  header  } from '../page_objects/header';

describe('all galleries page test', () => {
    before('login via backend', () => {
        cy.loginViaBackend();
    });

    it('assert login', () => {
        cy.visit('/');
        header.loginBtn.should('not.exist');
    });
});
