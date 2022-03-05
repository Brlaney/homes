
// getListings.js variation no. 1
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const puppeteer = require('puppeteer-extra');
puppeteer.use(StealthPlugin()); // Enable stealth plugin

const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

(async () => {
  // Chromium browser (default)
  const browser = await puppeteer.launch({
    headless: false,   // In order to view the automated browser 
    slowMo: 60         // Simulate human typing by using slowMo
  });
  const page = await browser.newPage();
  data = [];
  let i = 0;

  await page.goto('https://www.zillow.com/homes/for_sale/Cookeville,-TN_rb/', {
    waitUntil: 'load'
  });

  const listings = await page.$$(
    'div.result-list-container > ul.photo-cards.photo-cards_wow.photo-cards_short.photo-cards_extra-attribution > li',
  );

  for (const listing of listings) {
    let address = 'Null';
    let link = 'Null';
    let realtor = 'Null';
    let price = 'Null';

    console.log(i);

    // Address
    try {
      address = await page.evaluate(
        (el) => el.querySelector('div.list-card-info > a > address.list-card-addr').textContent,
        listing
      );
      console.log('\n' + address) // Test the output
    } catch (error) { }

    // Link
    try {
      link = await page.evaluate(
        (el) => el.querySelector('div.list-card-info > a').getAttribute('href'),
        listing
      );
      console.log(link) // Test the output
    } catch (error) { }

    // Realtor/firm
    try {
      realtor = await page.evaluate(
        (el) => el.querySelector('div.list-card-info > div.list-card-footer > p').textContent,
        listing
      );
      console.log(realtor) // Test the output
    } catch (error) { }

    // Price
    try {
      price = await page.evaluate(
        (el) => el.querySelector('div.list-card-info > div.list-card-heading > div.list-card-price').textContent,
        listing
      );
      console.log(price) // Test the output
    } catch (error) { }
    
    sleep(2000);
    i++;
  }

  await browser.close(); // Ends Chromium instance
})();



