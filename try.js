
// try.js
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const GetDate = require('./lib/utils/GetDate');
const puppeteer = require('puppeteer-extra');
const fs = require('fs');

puppeteer.use(StealthPlugin()); // Enable stealth plugin

// Immediately-invoked anon. async function
(async () => {
  // Chromium browser (default)
  const browser = await puppeteer.launch({
    headless: false,   // In order to view the automated browser 
    slowMo: 30         // Simulate human typing by using slowMo
  });
  const page = await browser.newPage();
  data = [];

  await page.goto('https://www.zillow.com/homes/for_sale/Cookeville,-TN_rb/', {
    waitUntil: 'load'
  });

  // Get todays date (custom function)
  currentDateTime = GetDate.obtainDate();

  // Define & wait for total no. of homes selector
  const total_selector = '.category-options > button.active-option > .total-text';
  await page.waitForSelector(total_selector);
  const total = await page.$eval(total_selector, e => e.innerHTML);

  const card_selector = '//*[@id="grid-search-results"]/ul/li[1]/script/text()';
  await page.waitForXPath(card_selector);
  const card = await page.$x(card_selector);
  // const card = await page.$x(card_selector, e => e.innerHTML);


  /*
    Page 1.
    //*[@id="grid-search-results"]/ul/li[1]/script/text(),
    //*[@id="grid-search-results"]/ul/li[2]/script/text(), ...
    //*[@id="grid-search-results"]/ul/li[41]/script/text()


    Page 2.
    //*[@id="grid-search-results"]/ul/li[1]/script/text(), ...
    //*[@id="grid-search-results"]/ul/li[41]/script/text()


    Page 3.
    //*[@id="grid-search-results"]/ul/li[11]/script/text(), ...
    //*[@id="grid-search-results"]/ul/li[41]/script/text()


    Page 7.
    //*[@id="grid-search-results"]/ul/li[1]/script/text(), ...
    //*[@id="grid-search-results"]/ul/li[14]/script/text()


    div #grid-search-results .result-list-container
      #grid-search-results > ul.photo-cards photo-cards_wow photo-cards_short photo-cards_extra-attribution

    div .search-pagination
      nav


  */


})();
