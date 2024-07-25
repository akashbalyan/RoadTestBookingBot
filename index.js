import puppeteer from 'puppeteer';
// Or import puppeteer from 'puppeteer-core';

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
await page.locator('input').fill('Balyan');


//9616271
await page.locator('input[aria-label="driver-licence"]').fill('9616271');



// // Locate the full title with a unique string.
// const textSelector = await page
//   .locator('text/Customize and automate')
//   .waitHandle();
// const fullTitle = await textSelector?.evaluate(el => el.textContent);

// // Print the full title.
// console.log('The title of this blog post is "%s".', fullTitle);

//await browser.close();