// src/index.ts
// const fs = require('fs');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

puppeteer.use(StealthPlugin());

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 30,
    // args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  
  await page.goto('https://www.zillow.com/', {
    waitUntil: 'load'
  });
  
  await page.click('#search-box-input');
  await page.type('#search-box-input', 'Cookeville, TN');
  await page.keyboard.press('Enter', { delayed: 10 });

  await page.waitFor(2000);

  const elements = await page.$x('/html/body/div[9]/div/div[1]/div/div/div/ul/li[1]/button');
  await elements[0].click();

  await page.waitFor(2000);


  /* If you do not use StealthPlugin(), then implement the following:
  await page.mouse.click(392, 271, { delay: 10000 });
  await page.waitFor(2000);
  */

  await page.screenshot({ path: 'amazing.png' })


})();
