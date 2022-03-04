// src/index.ts
// const fs = require('fs');
const puppeteer = require('puppeteer');


(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 30,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  
  await page.goto('https://www.zillow.com/', {
    waitUntil: 'load'
  });
  
  await page.click('#search-box-input');
  await page.type('#search-box-input', 'Cookeville, TN');
  await page.keyboard.press('Enter', { delayed: 10 });

  await page.waitFor(5000);
  await page.screenshot({ path: 'amazing.png' })

})();
