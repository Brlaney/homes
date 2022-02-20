// src/index.ts
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const { Z_URL } = require('../lib/endpoints');

async function main() {
  // const file = 'lib/data/zillow/test.json';

  await axios.get(Z_URL).then((urlResponse: { data: any; }) => {
    const $ = cheerio.load(urlResponse.data);
    const testData = $('*')
    console.log(testData);

    // Write data into json file
    // fs.writeFile(file,
    //   JSON.stringify(testData, null, 4),
    //   () => console.log('Data successfully saved.'))
  })
}

main();
