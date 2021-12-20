class AuthRegister {
    get firstNameInput () {
        return cy.get("a[href='/register']");
    }
    get lastNameInput () {
        return cy.get("input[id='first-name']");
    }
    get emailAddressInput () {
        return cy.get("#email");
    }
    get passwordInput () {
        return cy.get("#password");
    }
    get passwordConfirmationInput () {
        return cy.get("#password-confirmation");
    }
    get acceptTermsCheckbox () {
        return cy.get("input[class='form-check-input']");
    }
    get submitButton () {
        return cy.get("button[type='submit']");
    }
    get errorMsg () {
        return cy.get('.alert');
    }
get registerPageHeading (){
    return cy.get('h1');
}

    register(firstName, lastName, email, password, confirmedPassword) {
        this.firstNameInput.type(firstName);
        this.lastNameInput.type(lastName);
        this.emailAddressInput.type(email);
        this.passwordInput.type(password);
        this.passwordConfirmationInput.type(confirmedPassword);
    }
}

export const authRegister = new AuthRegister();