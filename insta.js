const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const puppeteer = require('puppeteer-extra');
const fs = require('fs');

puppeteer.use(StealthPlugin()); // Enable stealth plugin

const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

// Immediately-invoked anon. async function
(async () => {
  const browser = await puppeteer.launch({
    headless: false,   // In order to view the automated browser 
    slowMo: 30         // Simulate human typing by using slowMo
  });

  const page = await browser.newPage();
  data = [];

  await page.goto('https://www.instacart.com/store/account/orders', {
    waitUntil: 'load'
  });

  await page.waitForSelector('input[type="email"]');

  await page.click('input[type="email"]');
  await page.type('input[type="email"]', 'leigh.now.what@gmail.com');
  await page.keyboard.press('Enter', { delayed: 10 });

  await page.click('input[type="password"]');
  await page.type('input[type="password"]', 'Cosby12345');
  await page.keyboard.press('Enter', { delayed: 10 });
  
  await page.waitForSelector('#store > div:nth-child(102) > div > div > div > div.css-fyx7vb > button.css-1aurfvc > span');
  await page.click('#store > div:nth-child(102) > div > div > div > div.css-fyx7vb > button.css-1aurfvc > span');

  await page.mouse.click(400, 400);
  
  // Press the Load More Orders button 5 x's
  sleep(2500);
  await autoScroll(page);
  await page.waitForSelector('button[type="button"]');
  await page.click('button[type="button"]');

  sleep(2500);
  await autoScroll(page);
  await page.waitForSelector('button[type="button"]');
  await page.click('button[type="button"]');

  sleep(2500);
  await autoScroll(page);
  await page.waitForSelector('button[type="button"]');
  await page.click('button[type="button"]');

  sleep(2500);
  await autoScroll(page);
  await page.waitForSelector('button[type="button"]');
  await page.click('button[type="button"]');

  sleep(2500);
  await autoScroll(page);
  await page.waitForSelector('button[type="button"]');
  await page.click('button[type="button"]');

  // await browser.close(); // Ends Chromium instance
})();

// await page.waitForSelector('#icOrdersList > button');

// #store > div:nth-child(102) > div > div > div > div.css-fyx7vb > button.css-1aurfvc > span
//*[@id="store"]/div[8]/div/div/div/div[2]/button[1]/span

// View Order Details
// #icOrdersList > ul > li:nth-child(1) > div.rmq-99b9ec35.rmq-1c5a1b24.rmq-e9fd10a8 > a
//*[@id="icOrdersList"]/ul/li[1]/div[1]/a

// Bottom load more button
// #icOrdersList > button
//*[@id="icOrdersList"]/button

// End at this View order details selector/a-tag:
// #icOrdersList > ul > li:nth-child(59) > div.rmq-99b9ec35.rmq-1c5a1b24.rmq-e9fd10a8 > a


// #icOrdersList > ul > li:nth-child(10) > div.rmq-99b9ec35.rmq-1c5a1b24.rmq-e9fd10a8 > a


// #icOrdersList > ul > li:nth-child(19) > div.rmq-99b9ec35.rmq-1c5a1b24.rmq-e9fd10a8 > a

// #icOrdersList > ul > li:nth-child(30) > div.rmq-99b9ec35.rmq-1c5a1b24.rmq-e9fd10a8 > a

// #icOrdersList > ul > li:nth-child(40) > div.rmq-99b9ec35.rmq-1c5a1b24.rmq-e9fd10a8 > a

// #icOrdersList > ul > li:nth-child(50) > div.rmq-99b9ec35.rmq-1c5a1b24.rmq-e9fd10a8 > a

// On the fifth click, then the 59th entry will be displayed

async function autoScroll(page){
  await page.evaluate(async () => {
      await new Promise((resolve, reject) => {
          var totalHeight = 0;
          var distance = 100;
          var timer = setInterval(() => {
              var scrollHeight = document.body.scrollHeight;
              window.scrollBy(0, distance);
              totalHeight += distance;

              if(totalHeight >= scrollHeight){
                  clearInterval(timer);
                  resolve();
              }
          }, 100);
      });
  });
}
