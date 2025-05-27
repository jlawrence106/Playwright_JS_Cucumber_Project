import {Given, When, Then } from '@cucumber/cucumber';
import { test, expect } from '@playwright/test';
import { chromium } from '@playwright/test';
import page from '@playwright/test';
import {LoginPage} from '../../pages/LoginPage.js';
import {HomePage} from '../../pages/HomePage.js';
//import {MycartPage} from '../pages/MycartPage';
//import {ProductPage} from '../pages/ProductPage';
//import {CheckoutinfoPage} from '../pages/CheckoutinfoPage';
//import {CheckoutoverviewPage} from '../pages/CheckoutoverviewPage';
//import {CheckoutcompletePage} from '../pages/CheckoutcompletePage';
//const utils = require('../utils/commonUtils');
//import * as envdetails from '../../env-config/envdetails.cjs'
    

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