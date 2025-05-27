import { Page } from "@playwright/test"; 
import { test, expect } from '@playwright/test';

class CheckoutinfoPage{

    constructor(page) {
        this.page = page;
        this.firstname = page.locator('#first-name');
        this.lastname = page.locator('#last-name');
        this.zipcode = page.locator('#postal-code');
        this.continue = page.locator('#continue');
        this.cancel = page.locator('#cancel');
    
    }

    async submitContinue (buyerdetails) {
        await this.firstname.fill(buyerdetails.fname);
        await this.lastname.fill(buyerdetails.lname);
        await this.zipcode.fill(buyerdetails.zipcode);
        await this.continue.click();
        expect(this.page.getByText('Checkout: Overview')).toBeVisible();
    }
}

module.exports = {CheckoutinfoPage}