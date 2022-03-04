// src/index.ts
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const GetDate = require('./lib/utils/GetDate');
const puppeteer = require('puppeteer-extra');
const fs = require('fs');

var obj = require('./lib/data/total.json');

puppeteer.use(StealthPlugin()); // Enable stealth plugin

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

  const total_selector = '.category-options > button.active-option > .total-text';

  await page.waitForSelector(total_selector);

  const total = await page.$eval(total_selector, e => e.innerHTML);

  console.log(total)

  if (obj[0].total < total || total < obj[0].total) {
    var diff = total - obj.total;

    if (diff < 0) {
      const diff = -1 * diff;
      console.log('\nThe number of homes listed \nfor sale has decreased by: ' + diff);
    } else {
      console.log('\nThe number of homes listed \nfor sale has increased by: ' + diff);
    }

    data = {
      total: parseInt(total),
      date: todaysDate
    };

    // Append data into json file
    fs.appendFile('lib/data/total.json',
      JSON.stringify(data, null, 2),
      () => console.log(
        'Test data was successfully saved in lib/data'
      )
    );

  } else {

    // Display that the number of listings has not changed
    console.log('\nThe number of homes listed for sale by real \nestate agents is unchanged.No data was saved.')
  };


  /*
  Contained within: div.#grid-search-results > ul.photo-cards photo-cards_wow photo-cards_short photo-cards_extra-attribution
  Fetch the following data:
    
    Page 2:
    https://www.zillow.com/cookeville-tn/2_p

    Page 3:
    https://www.zillow.com/cookeville-tn/3_p

    Page n: 
    https://www.zillow.com/cookeville-tn/n_p
  */

  // await page.screenshot({ path: './lib/screenshots/test.png' })

})();
