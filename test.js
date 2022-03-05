// test.js
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

puppeteer.use(StealthPlugin()); // Enable stealth plugin
const url = 'https://www.zillow.com/homes/for_sale/Cookeville,-TN_rb/';

async function StartScraping() {
  await puppeteer
    .launch({
      headless: false,
    })
    .then(async (browser) => {
      const page = await browser.newPage();

      await page.setViewport({
        width: 1366,
        height: 768,
      });

      page.on('response', async (response) => {

        console.log(await response);

        /*
        console.log(await response._request._resourceType);
        if (response._request._resourceType == 'image') {
          console.log(await response._url);
        }
        if (response.url().includes('log')) {
          console.log(await response.json());
        } 
        */
      });

      await page.goto(url, {
        waitUntil: 'load',
        timeout: 0,
      });
    });
}
StartScraping();
