// src/index.ts
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const { LINK_2 } = require('./lib/endpoints');

async function obtainPage(num) {
  const base = LINK_2;

  let endpoint = base + num;
  const file = 'test/pg' + num + '.json';

  await axios.get(endpoint).then(urlResponse => {
    const $ = cheerio.load(urlResponse.data);
    let data = [];

    $('.table tr').each(function (i, elem) {
      data[i - 1] = {
        date: $(elem).find('td:nth-child(1)').text().trim(),
        title: $(elem).find('td:nth-child(3)').text().trim(),
        link: $(elem).find('td:nth-child(3) > a').attr('href'),
        bpr: $(elem).find('td:nth-child(4)').text().trim(),
        attorney: $(elem).find('td:nth-child(5)').text().trim(),
      }
    });

    // Write data into json file
    fs.writeFile(file,
      JSON.stringify(data, null, 4),
      () => console.log('File for pg number ' + num + ' successfully saved.'))
  })
}

obtainPage(1);
