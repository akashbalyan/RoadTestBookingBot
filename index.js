
import puppeteer from 'puppeteer';
import { config }  from './config.js';

const creds = {
  surname: config.roadtestcreds.surname,
  licensenumber: config.roadtestcreds.licensenumber,
  keyword: config.roadtestcreds.keyword,
};
console.log(creds);
// Launch the browser and open a new blank page
//const browser = await puppeteer.launch();
//visible ui
const browser = await puppeteer.launch({ headless: false });

const page = await browser.newPage();

// Navigate the page to a URL.
await page.goto('https://onlinebusiness.icbc.com/webdeas-ui/home');

// Set screen size.
await page.setViewport({width: 1080, height: 1024});

// Type into search box.
// await page.locator('button.Next').fill('automate beyond recorder');

// Wait and click on first result.
await page.locator('text=Next').click();

//await page.locator('button.Next').fill('automate beyond recorder');
// 'input' is a CSS selector.
await page.locator('input').fill(`${creds.surname}`);


await page.locator('input[aria-label="driver-licence"]').fill(`${creds.licensenumber}`);

await page.locator('input[aria-label="keyword"]').fill(`${creds.keyword}`);
//await page.locator('input[type="checkbox"]').click();

// Runs the `//h2` as the XPath expression.
const element = await page.waitForSelector('::-p-xpath(/html/body/app-root/app-login/mat-card/mat-card-content/form/span[2]/div[3]/mat-checkbox/label/span[1]/input)');

await element.click();
//console.log(element);

const sigInButton = await page.waitForSelector('::-p-xpath(/html/body/app-root/app-login/mat-card/mat-card-content/form/div[2]/div[2]/button)');

await sigInButton.click()
//await page.locator('text=Sign in').click();
// // Locate the full title with a unique string.
// const textSelector = await page
//   .locator('text/Customize and automate')
//   .waitHandle();
// const fullTitle = await textSelector?.evaluate(el => el.textContent);

// // Print the full title.
// console.log('The title of this blog post is "%s".', fullTitle);

//await browser.close();