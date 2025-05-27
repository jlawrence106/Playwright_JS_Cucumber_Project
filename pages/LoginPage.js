import page from "@playwright/test"; 
import { test, expect } from '@playwright/test';

export class LoginPage {

    constructor(page)
    {
        this.usernameTxt = page.locator('#user-name');
        this.passwordTxt = page.locator('#password');
        this.loginBtn = page.locator('#login-button');
        this.applogoImg = page.locator('[class=app_logo]');
      
    }

    async login(username, password)
    {
        await this.usernameTxt.fill(username);
        await this.passwordTxt.fill(password);
        await this.loginBtn.click();
        await expect(this.applogoImg).toBeVisible({ timeout: 30_000 });
    } 

}

//module.exports = {LoginPage}