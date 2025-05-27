import { Page } from "@playwright/test"; 
import { test, expect } from '@playwright/test';
import * as utils from '../utils/commonUtils';

class CheckoutoverviewPage {

    constructor (page) {

        this.page = page;
        this.qty = page.locator('[data-test=item-quantity]');
        this.itemname = page.locator('[data-test=inventory-item-name]');
        this.itemdesc = page.locator('[data-test=inventory-item-desc]');
        this.price = page.locator('[data-test=inventory-item-price]');
        this.itemtotal = page.locator('[data-test=subtotal-label]');
        this.tax = page.locator('[data-test=tax-label]');
        this.total = page.locator('[data-test="total-label"]');
        this.finish = page.locator('#finish');
    }

    async checkpriceoneproduct (itemdetails) {

        const taxvalue = utils.getTaxCalc(itemdetails.productprice);
        const totalprice = utils.sumDollarValues([itemdetails.productprice,taxvalue]);
        expect(await this.itemname.textContent()).toBe(itemdetails.productname);
        expect(await this.price.textContent()).toBe(itemdetails.productprice);
        expect(await this.tax.textContent()).toBe('Tax: ' + taxvalue);
        expect(await this.total.textContent()).toBe('Total: ' + totalprice);
        
    }

    async checkpricemultiproduct (itemdetails, rndindex) {
        let totalvalue = '$0';
        for (let i=0; i < rndindex; i++) {
            totalvalue = utils.sumDollarValues([totalvalue, itemdetails[i].productprice]);
        }
        const taxvalue = utils.getTaxCalc(totalvalue);
        const totalprice = utils.sumDollarValues([totalvalue,taxvalue]);

        for (let i=0; i < rndindex; i++) {
        expect(await this.itemname.nth(i).textContent()).toBe(itemdetails[i].productname);
        expect(await this.price.nth(i).textContent()).toBe(itemdetails[i].productprice);
        }
        expect(await this.tax.textContent()).toBe('Tax: ' + taxvalue);
        expect(await this.total.textContent()).toBe('Total: ' + totalprice);
    }

    async completeorder () {
        await this.finish.click();
        expect(await this.page.getByText('Thank you for your order!')).toBeVisible();

    }

}

module.exports = {CheckoutoverviewPage};