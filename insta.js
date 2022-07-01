const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const puppeteer = require('puppeteer-extra');
const fs = require('fs');

puppeteer.use(StealthPlugin());

const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

(async () => {
  const browser = await puppeteer.launch({ headless: false, slowMo: 50, defaultViewport: null, args: ['--start-maximized'] });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 929 });

  await page.goto('https://www.instacart.com/store/account/orders', {
    waitUntil: 'load'
  });

  data = [];

  // Input email address
  await page.waitForSelector('input[type="email"]');
  await page.click('input[type="email"]');
  await page.type('input[type="email"]', 'leigh.now.what@gmail.com');
  await page.keyboard.press('Enter', { delayed: 10 });

  // Input password
  await page.click('input[type="password"]');
  await page.type('input[type="password"]', 'Cosby12345');
  await page.keyboard.press('Enter', { delayed: 10 });

  await page.waitForSelector('#store > div:nth-child(102) > div > div > div > div.css-fyx7vb > button.css-1aurfvc > span');
  await page.click('#store > div:nth-child(102) > div > div > div > div.css-fyx7vb > button.css-1aurfvc > span');

  await page.mouse.click(400, 400);  // Click out of popup prompt

  // Press the Load More Orders button 5 x's
  sleep(2500);
  await autoScroll(page);
  await page.waitForSelector('#icOrdersList > button');
  await page.click('#icOrdersList > button');

  sleep(2500);
  await autoScroll(page);

  await page.waitForSelector('#icOrdersList > button');
  await page.click('#icOrdersList > button');

  sleep(2500);
  await autoScroll(page);

  await page.waitForSelector('#icOrdersList > button');
  await page.click('#icOrdersList > button');

  sleep(2500);
  await autoScroll(page);

  await page.waitForSelector('#icOrdersList > button');
  await page.click('#icOrdersList > button');

  sleep(2500);
  await autoScroll(page);

  await page.waitForSelector('#icOrdersList > button');
  await page.click('#icOrdersList > button');

  sleep(2500);
  await autoScroll(page);

  const details = await page.evaluate(
    () => Array.from(
      document.querySelectorAll('#icOrdersList > ul > li > a[href]'),
      a => a.getAttribute('href'))
  );

  console.log(details);

  // await browser.close();
})();

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve, reject) => {
      var totalHeight = 0;
      var distance = 100;
      var timer = setInterval(() => {
        var scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
}

// await page.WaitForSelector('#icOrdersList');
// #icOrdersList > ul
// then there are 59 li's to obtain the a tags from!
// #icOrdersList > ul > li:nth-child(59) > div.rmq-99b9ec35.rmq-1c5a1b24.rmq-e9fd10a8 > a
