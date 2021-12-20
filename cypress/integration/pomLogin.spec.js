import {authLogin} from '../page_objects/authLogin';
import { header } from '../page_objects/header';

const faker = require("faker");

describe('POM login', () => {
let validEmail = "anastasija.maksimovic21@gmail.com";
let validPass = 'anjaitoni111';

let userData = {
    randomEmail: faker.internet.email(),
    randomPassword: faker.datatype.number(),
};

    before('visit app', () => {
        cy.visit("/");
        cy.url().should("contains", "gallery-app");
    });

    it.only('login with invalid credentials', () => {
        header.loginBtn.click();
        authLogin.login(userData.randomEmail, userData.randomPassword);

        authLogin.errorMsg.should('be.visible');
        authLogin.errorMsg.should('have.text', 'Bad Credentials');
        authLogin.errorMsg.should('have.css', 'background-color', 'rgb(248, 215, 218)');
        header.loginBtn.should('exist');
        cy.url().should("contains", "/login");

    });

    it('login with valid credentials', () => {
        header.loginBtn.click();
        cy.url().should('contains', '/login');

        authLogin.login(validEmail, validPass);
        cy.url().should("not.contain", "/login");

    });

    it('logout',() => {
        header.logoutBtn.click();
    });

});