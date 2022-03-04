// src/index.ts
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

  await page.goto('https://www.zillow.com/', {
    waitUntil: 'load'
  });

  // Get todays date (custom function)
  todaysDate = GetDate.obtainDate();

  // Click search input, type location, press enter
  await page.click('#search-box-input');
  await page.type('#search-box-input', 'Cookeville, TN');
  await page.keyboard.press('Enter', { delayed: 10 });
  await page.waitFor(2000); // 2 second delay

  // Click on the 'For Sale' button once prompted
  const elements = await page.$x('/html/body/div[9]/div/div[1]/div/div/div/ul/li[1]/button');
  await elements[0].click();
  await page.waitFor(2000); // 2 second delay

  // Define & wait for total no. of homes selector
  const total_selector = '.category-options > button.active-option > .total-text';
  await page.waitForSelector(total_selector);

  const total = await page.$eval(total_selector, e => e.innerHTML);
  // console.log(total) // Test the output is a number

  // Conditional: if totals are not equal, then -->
  // ADD ABSOLUTE VALUE HERE
  if (obj[0].total != total) {
    var diff = total - obj.total;

    if (diff < 0) {
      const diff = -1 * diff;
      console.log('\nThe number of homes listed \nfor sale has decreased by: ' + diff);
    } else {
      console.log('\nThe number of homes listed \nfor sale has increased by: ' + diff);
    }

    // Contains new data + old data
    data = [
      { total: parseInt(total), date: todaysDate },
      ...obj
    ];

    // Re-write data to json file
    fs.writeFile('lib/data/total.json',
      JSON.stringify(data, null, 2),
      () => console.log(
        'Test data was successfully saved in lib/data'
      )
    );

  } else {
    // Display that the number of listings has not changed
    console.log('\nThe number of homes listed for sale by real \nestate agents is unchanged.No data was saved.')
  };

})();
