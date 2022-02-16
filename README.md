# Severe Weather Outlook (US)

## Overview

This is a Node.js project written in Typescript that fetches United States severe weather outlook data from this website: [severeweatheroutlook.com](https://www.severeweatheroutlook.com/). The websites data is ultimately sourced directly from [NOAA's](https://www.spc.noaa.gov/) (National Oceanic and Atmospheric Administration)

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

## References and resources

- Great introduction video by [Dr. Structure](https://youtu.be/kFkU1M7xVbg)
- Wikipedia:
  - [Direct Stiffness Method](https://en.wikipedia.org/wiki/Direct_stiffness_method)
  - [Finite Element Method](https://en.wikipedia.org/wiki/Finite_element_method)
  - [Newtonian Mechanics](https://en.wikipedia.org/wiki/Newton%27s_laws_of_motion)
  - [Structural Analysis](https://en.wikipedia.org/wiki/Structural_analysis)
- [ABET](https://www.abet.org/)

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

