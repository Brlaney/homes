# Homes

## Overview

This is a Node.js project written in Typescript that fetches United States severe weather outlook data from this website: [severeweatheroutlook.com](https://www.severeweatheroutlook.com/). The websites data is ultimately sourced directly from [NOAA's](https://www.spc.noaa.gov/) (National Oceanic and Atmospheric Administration)

</br>

## Data fields to obtain for each listing

[] Days listed on Zillow.com
[] The price $$
[] No. of beds
[] No. of baths
[] Square ft
[] Det. if it is: 'Home', 'Lot/Lond', or 'New Construction'
[] Address
  [] Street
  [] City
  [] State
  [] Zip

</br>

Cookeville, TN has a UTC/GMT offset of: `-6 hours`

For example:

Todays date: `03/04/2022`
Nows timestamp: `17:46:26`
Raw timestamp: `2022-03-04T23:46:26.819Z`

```jsx
 // If you do not use StealthPlugin(), then implement the following:
await page.mouse.click(392, 271, { delay: 10000 });
await page.waitFor(2000);

```

</br>

```jsx
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
```

</br>

## Scripts to run:

```bash
npx ts-node src/main.ts

# or

npx ts-node -T src/main.ts

# or

npx tsc
# then:
node dist/main.js
```

## Endpoint/URL format

```bash
BASE_URL = https://www.severeweatheroutlook.com/

https://www.severeweatheroutlook.com/2022-02-16/
```

Therefore, BASE_URL + / **the-date-here** /

Range of vvailable dates include days from current date to 7 days from current date.
Most accurate predictions can be found from current date to 1, 2, and 3 days out (4 dates total).

## Connect with me

- Email: <brlaney@outlook.com>
- Twitter: [brendan_webdev](https://twitter.com/Brendan_webdev)
- Instagram: [brlaney94](https://www.instagram.com/brlaney94/)

</br>

## License

```text
MIT License

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files, to deal 
in the Software without restriction, including without limitation the
rights to use, copy, modify, merge, publish, distribute, sublicense, 
and/or sell copies of the Software, and to permit persons to whom the 
Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included 
in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, 
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF 
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY 
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, 
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE 
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

Brendan Laney | Copyright (c) 2021
```

</br>

## Contributions and issues

I would love your feedback on my project - please feel free to make a pull request or submit an issue if you find any. Thanks for checking out my project!

