
// getListings.js variation no. 2
// Condensed trys nested into the for loop on line 32
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
    'ul.photo-cards.photo-cards_wow.photo-cards_short.photo-cards_extra-attribution > li > article.list-card.list-card-additional-attribution.list-card-additional-attribution-space.list-card_not-saved',
    // div.result-list-container > ul.photo-cards photo-cards_wow photo-cards_short photo-cards_extra-attribution > li'
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

    console.log(i);

    try {
      address = await page.evaluate((el) => el.querySelector('div.list-card-info > a > address.list-card-addr').textContent, listing);
      link = await page.evaluate((el) => el.querySelector('div.list-card-info > a').getAttribute('href'), listing);
      realtor = await page.evaluate((el) => el.querySelector('div.list-card-info > div.list-card-footer > p').textContent, listing);
      price = await page.evaluate((el) => el.querySelector('div.list-card-info > div.list-card-heading > div.list-card-price').textContent, listing);
      nbeds = await page.evaluate((el) => el.querySelector('div.list-card-info > div.list-card-heading > ul.list-card-details > li:nth-child(1)').textContent, listing);
      nbaths = await page.evaluate((el) => el.querySelector('div.list-card-info > div.list-card-heading > ul.list-card-details > li:nth-child(2)').textContent, listing);
      sqFt = await page.evaluate((el) => el.querySelector('div.list-card-info > div.list-card-heading > ul.list-card-details > li:nth-child(3)').textContent, listing);
      listType = await page.evaluate((el) => el.querySelector('div.list-card-info > div.list-card-heading > ul.list-card-details > li.list-card-statusText').textContent, listing);
      nListed = await page.evaluate((el) => el.querySelector('div.list-card-top > div').textContent, listing);

      console.log('\n' + address) // Test the output
      console.log(link) // Test the output
      console.log(realtor) // Test the output
      console.log(price) // Test the output
      console.log(nbeds) // Test the output
      console.log(nbaths) // Test the output
      console.log(sqFt) // Test the output
      console.log(listType) // Test the output
      console.log(nListed) // Test the output
    } catch (error) { }

    sleep(2000);
    i++;
  }

  await browser.close(); // Ends Chromium instance
})();
