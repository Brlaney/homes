# Severe Weather Outlook (US)

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
