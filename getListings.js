
// getListings.js
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
    slowMo: 30         // Simulate human typing by using slowMo
  });
  const page = await browser.newPage();
  data = [];

  await page.goto('https://www.zillow.com/homes/for_sale/Cookeville,-TN_rb/', {
    waitUntil: 'load'
  });


  const listings = await page.$$(
    'ul.photo-cards.photo-cards_wow.photo-cards_short.photo-cards_extra-attribution > li > article.list-card.list-card-additional-attribution.list-card-additional-attribution-space.list-card_not-saved',
  );

  for (const listing of listings) {
    let address = 'Null';
    let link = 'Null';
    let realtor = 'Null';
    let price = 'Null';
    let nbeds = 'Null';
    let nbaths = 'Null';
    let sqFt = 'Null';
    let listType = 'Null';
    let nListed = 'Null';

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

    // No. of bedrooms
    try {
      nbeds = await page.evaluate(
        (el) => el.querySelector('div.list-card-info > div.list-card-heading > ul.list-card-details > li:nth-child(1)').textContent,
        listing
      );
      console.log(nbeds) // Test the output
    } catch (error) { }

    // No. of baths
    try {
      nbaths = await page.evaluate(
        (el) => el.querySelector('div.list-card-info > div.list-card-heading > ul.list-card-details > li:nth-child(2)').textContent,
        listing
      );
      console.log(nbaths) // Test the output
    } catch (error) { }

    // Square feet
    try {
      sqFt = await page.evaluate(
        (el) => el.querySelector('div.list-card-info > div.list-card-heading > ul.list-card-details > li:nth-child(3)').textContent,
        listing
      );
      console.log(sqFt) // Test the output
    } catch (error) { }

    // Listing type
    try {
      listType = await page.evaluate(
        (el) => el.querySelector('div.list-card-info > div.list-card-heading > ul.list-card-details > li.list-card-statusText').textContent,
        listing
      );
      console.log(listType) // Test the output
    } catch (error) { }

    // Days (time) listed on Zillow
    try {
      nListed = await page.evaluate(
        (el) => el.querySelector('div.list-card-top > div').textContent,
        listing
      );
      console.log(nListed) // Test the output
    } catch (error) { }
  }

  await browser.close(); // Ends Chromium instance
})();
