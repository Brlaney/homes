// src/index.ts
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
// const { BASE_URL } = require('../lib/endpoints');

async function main() {
  const endpoint = 'https://www.severeweatheroutlook.com/';
  const file = 'test.json';

  await axios.get(endpoint).then((urlResponse: { data: any; }) => {
    const $ = cheerio.load(urlResponse.data);
    let data: {
      date: any;
      link: any;
    }[] = [];

    $('div.container div:nth-child(5)').each(function (i: number, elem: any) {
      data[i - 1] = {
        date: $(elem).find('div:nth-child(1) > strong').text().trim(),
        link: $(elem).find('div:nth-child(1) > a').attr('href'),
      }
    });

    // Write data into json file
    fs.writeFile(file,
      JSON.stringify(data, null, 4),
      () => console.log('Data successfully saved.'))
  })
}

main();

// body > div.container > div:nth-child(5) > div:nth-child(1) > strong
// body > div.container > div:nth-child(5) > div:nth-child(2) > strong
// body > div.container > div:nth-child(5) > div:nth-child(3) > strong
// body > div.container > div:nth-child(5) > div:nth-child(4) > strong
// body > div.container > div:nth-child(5) > div:nth-child(5) > strong
// body > div.container > div:nth-child(5) > div:nth-child(6) > strong
// body > div.container > div:nth-child(5) > div:nth-child(7) > strong
// body > div.container > div: nth - child(5) > div: nth - child(8) > strong

// body > div.container > div:nth-child(5) > div:nth-child(1) > a