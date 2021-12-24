
import {authLogin} from '../page_objects/authLogin';
import { header } from '../page_objects/header';

const faker = require("faker");
let validEmail = "anastasija.maksimovic21@gmail.com";
let validPass = 'anjaitoni111';

describe('POM login', () => {


let userData = {
    randomEmail: faker.internet.email(),
    randomPassword: faker.datatype.number(),
};

    before('visit app', () => {
        cy.visit("/");
        cy.url().should("contains", "gallery-app");
    });

    // it.only('login with invalid credentials', () => {
    //     header.loginBtn.click();
    //     authLogin.login(userData.randomEmail, userData.randomPassword);

    //     authLogin.errorMsg.should('be.visible');let validEmail = "anastasija.maksimovic21@gmail.com";
    it('login with valid credentials', () => {
        cy.intercept({
            method: 'POST',
            url: 'https://gallery-api.vivifyideas.com/api/auth/login'
        }).as('login');
            

        header.loginBtn.click();
        cy.url().should('contains', '/login');

        authLogin.login(validEmail, validPass);

        cy.wait('@login').then((interception) => {
            console.log(interception);
            expect(interception.response.statusCode).eq(200);
        });

        cy.url().should("not.contain", "/login");

    });

    // it('logout',() => {
    //     header.logoutBtn.click();
    // });
});