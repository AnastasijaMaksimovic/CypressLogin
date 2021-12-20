import {  authRegister  } from '../page_objects/authRegister';
import { header } from '../page_objects/header';
import {  validacionMessages  } from "../fixtures/validacionMessages.json";

const faker = require("faker");

describe('POM register', () => {
    let validEmail1 = "milevaDjurisic12345@gmail.com";
    let validPassword1 = "mileva12345";
    let validConfirmedPassword = "mileva12345";
    let validFirstName = "Mileva";
    let validLastName = "Djurisic";


    let userData = {
        randomName: faker.name.findName(),
        randomLastName: faker.name.lastName(),
        randomEmail: faker.internet.email(),
        randomPassword: faker.internet.password(),
        randomNewPassword: faker.internet.password(),
        randomShortPassword: faker.internet.password(5)
    };

    beforeEach('visit app page', () => {
        cy.visit('/');
        cy.url().should("contains", "gallery-app");
        header.registerBtn.click();
        cy.url().should("contains", "/register")
    });

    it('register with invalid credentials', () => {
        header.registerBtn.click();
        authRegister.registerPageHeading.should('have.text', 'Register');
        authRegister.register(userData.randomName, userData.randomLastName, userData.randomEmail, userData.randomPassword, userData.randomShortPassword);

        authRegister.errorMsg.should('be.visible');
        authRegister.errorMsg.should('have.text', 'The password must be at least 8 characters.');
        authRegister.errorMsg.should('have.css', 'background-color', 'rgb(248, 215, 218)');
        authRegister.errorMsg.should('have.css', 'border-color', 'rgb(245, 198, 203)');
        authRegister.submitButton.should('be.visible');
        cy.url().should("contains", "/register");
        authRegister.errorMsg.should('have.text', validacionMessages.confMismatch);

    });

    it('register with valid credentials', () => {
        header.registerBtn.click();
        cy.url().should("contains", "/register");

        authRegister.register(validFirstName, validLastName, validEmail1, validPassword1, validConfirmedPassword)
        cy.wait(1000);
        cy.url().should("contains", "/register");
    });

    //validation.errorMsg.should('have.text', validationMessages.confMismatch);
});
