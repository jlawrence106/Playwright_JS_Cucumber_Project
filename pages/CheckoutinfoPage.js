import page from "@playwright/test"; 
import { test, expect } from '@playwright/test';

export class CheckoutinfoPage{

    constructor(page) {
        this.page = page;
        this.firstname = page.locator('#first-name');
        this.lastname = page.locator('#last-name');
        this.zipcode = page.locator('#postal-code');
        this.continue = page.locator('#continue');
        this.cancel = page.locator('#cancel');
    
    }

    async submitContinue (fname, lname, zipcode) {
        await this.firstname.fill(fname);
        await this.lastname.fill(lname);
        await this.zipcode.fill(zipcode);
        await this.continue.click();
        expect(this.page.getByText('Checkout: Overview')).toBeVisible();
    }
}
