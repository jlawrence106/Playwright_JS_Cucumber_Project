import { After,AfterStep,  AfterAll, Before, BeforeAll, BeforeStep, setDefaultTimeout} from '@cucumber/cucumber';
import * as fs from 'fs';
import * as path from 'path';
import page from "@playwright/test"; 

setDefaultTimeout(6000);

AfterStep(async function ({result}) {
  if (result.status === 'FAILED') {
    const screenshot = await page.screenshot();
    this.attach(screenshot, 'image/png');
  }
});