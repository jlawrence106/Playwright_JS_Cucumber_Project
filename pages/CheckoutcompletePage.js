import { Page } from "@playwright/test"; 
import { test, expect } from '@playwright/test';

class CheckoutcompletePage {

    constructor (page) {
        this.page = page;
        this.backhome = page.locator('#back-to-products');
    }

    async backhomepage () {

        await this.backhome.click();
        expect(this.page.getByText('Products')).toBeVisible();
    }

}

module.exports = {CheckoutcompletePage}