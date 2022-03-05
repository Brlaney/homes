
// getTotal.js
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const GetDate = require('./lib/utils/GetDate');
const puppeteer = require('puppeteer-extra');
const fs = require('fs');

var obj = require('./lib/data/total.json');
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

  // Conditional that outputs if total has decr., incr., unchanged, or error 
  if (total - obj[0].total < 0) {
    const diff = obj[0].total - total;
    console.log('\nThe number of homes listed for sale has decreased by: ' + JSON.stringify(diff));
  } else if (obj[0].total - total < 0) {
    const diff = total - obj[0].total;
    console.log('\nThe number of homes listed for sale has increased by: ' + JSON.stringify(diff));
  } else if (total == obj[0].total) {
    console.log('\nThe number of houses listed for sale is unchanged.')
  } else {
    console.log('\nThere was an error evaluating the differences in total listings.')
  }

  // Contains new data + old data
  data = [{
    total: parseInt(total),
    date: currentDateTime[0],
    time: currentDateTime[1]
  }, ...obj];

  // Re-write data to json file
  fs.writeFile('lib/data/total.json',
    JSON.stringify(data, null, 2),
    () => console.log(
      '\nThe data was successfully saved in lib/data'
    )
  );

})();
