import {Given, When, Then } from '@cucumber/cucumber';
import { test, expect } from '@playwright/test';
import { chromium } from '@playwright/test';
import page from '@playwright/test';
import {LoginPage} from '../../pages/LoginPage.js';
import {HomePage} from '../../pages/HomePage.js';
import {MycartPage} from '../../pages/MycartPage.js';
import {ProductPage} from '../../pages/ProductPage.js';
import {CheckoutinfoPage} from '../../pages/CheckoutinfoPage.js';
import {CheckoutoverviewPage} from '../../pages/CheckoutoverviewPage.js';
import {CheckoutcompletePage} from '../../pages/CheckoutcompletePage.js';
import * as utils from '../../utils/commonUtils.js';
//import * as envdetails from '../../env-config/envdetails.cjs'
import menuItemsjson from '../../test-data/menu-item.json' with { type: 'json' };
import homeproductItemsjson from '../../test-data/home-products.json' with { type: 'json' };
import custdetailsjson from '../../test-data/cust-details.json' with { type: 'json' };


//Import Data
const menuItems = JSON.parse(JSON.stringify(menuItemsjson));
const homeproductItems = JSON.parse(JSON.stringify(homeproductItemsjson));
const custdetails = JSON.parse(JSON.stringify(custdetailsjson));

//Scenario: Validate Menu items
Given('When a user login to the application with {string} and {string}', async function (username, password) {
        const browser = await chromium.launch();
        const context = await browser.newContext();
        this.page = await context.newPage();
        await this.page.goto('https://www.saucedemo.com/');
        const loginObj = new LoginPage(this.page);
        await loginObj.login(username, password);    
        });

Then('the following menu items must be displayed', async function (dataTable) {
        const menuItemsText = dataTable.raw()[0][0];
        const expectedItems = menuItemsText.split(',').map(item => item.trim());
        const homepageObj = new HomePage(this.page);
        await homepageObj.menuValidate(expectedItems);
        });

//Scenario: TEST02 - Validate Product Items # features\saucetest.feature:8
Then('the following product items and price must be displayed', async function (dataTable) {

    const allproducts = dataTable.hashes(); //Convert Datatable to js object
    const homepageObj = new HomePage(this.page);
    await homepageObj.productValidate(allproducts);

    });

//Scenario: TEST03 - Validate Product Pages # features\saucetest.feature:18
When('the user opens a product from {string} file', async function (string) {
    //Home Page
        const homepageObj = new HomePage(this.page);
        await homepageObj.openProduct(homeproductItems[0].productname);     
        });

Then('the product must have the productname, productprice, productdesc as per the {string} file', async function (string) {s
           //Product Page
        const productpageObj = new ProductPage(this.page);
        await productpageObj.validatepageDetails(homeproductItems[0]);
        });

//Scenario: TEST04 - End-to-end Checkout Single Item # features\saucetest.feature:23

When('the user opens a random product', async function () {
           // Write code here that turns the phrase above into concrete actions
           this.product = homeproductItems[0];
            const homepageObj = new HomePage(this.page);
            await homepageObj.openProduct(this.product.productname);
         });

Then('the product must have the productname, productprice productdesc as per the {string} file', async function (string) {
           // Write code here that turns the phrase above into concrete actions
            this.productpageObj = new ProductPage(this.page);
            await this.productpageObj.validatepageDetails(this.product);
         });

When('the user clicks the Add to cart Button', async function () {
           // Write code here that turns the phrase above into concrete actions
           await this.productpageObj.addCart();
         });

Then('the product is added to the cart', function () {
           
         });

When('the user clicks on the cart icon', async function () {
           // Write code here that turns the phrase above into concrete actions
           await this.productpageObj.navigateCart();
         });

Then('the cart page is opened with productname, productprice productdesc as per the {string} file', function (string) {
           // Write code here that turns the phrase above into concrete actions
    
         });

When('the user clicks on the Checkout page', async function () {
           // Write code here that turns the phrase above into concrete actions
            this.yourcartObj = new MycartPage(this.page);
            await this.yourcartObj.checkout();
         });

Then('Checkout: Your Information is displayed', function () {
           // Write code here that turns the phrase above into concrete actions
         });

Given('the user fills the checkout information with First Name {string}, Last Name {string}, Zip code {string}', async function (fname, lname, zip) {
           // Write code here that turns the phrase above into concrete actions
             
           const checkoutinfoObj = new CheckoutinfoPage(this.page);
           await checkoutinfoObj.submitContinue(fname, lname, zip);
         });


When('the Continue button is clicked', async function () {
           // Write code here that turns the phrase above into concrete actions
            this.youroverviewObj = new CheckoutoverviewPage(this.page);
         });

Then('Checkout: Overview page is displayed with the correct Item Price, Tax and Total Price', async function () {
           // Write code here that turns the phrase above into concrete actions
        await this.youroverviewObj.checkpriceoneproduct(this.product);
         });

When('the Finish button is clicked', async function () {
           // Write code here that turns the phrase above into concrete actions
          await this.youroverviewObj.completeorder();
         });

Then('Checkout: Complete! Page is displayed with the message {string}', async function (string) {
           // Write code here that turns the phrase above into concrete actions
            const orderconfirmObj = new CheckoutcompletePage(this.page);
            await orderconfirmObj.backhomepage();
         });
