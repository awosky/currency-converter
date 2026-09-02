# HitungKurs

HitungKurs is a simple web app for quickly calculating currency exchange rates.

## Features

- Convert amounts between different currencies.
- Change the base currency used for conversion.
- Save favorite currencies in the browser.
- Sort currency lists by their flags.
- Format numbers with thousands separators, such as `1,000,000`.
- Cache exchange rates in the browser for 24 hours.

## Technology

- React 19
- TypeScript
- Vite
- Tailwind CSS
- [Frankfurter API](https://www.frankfurter.app/) for fetching the latest exchange rates.

## Running the Project

Make sure Node.js is installed, then run:

```bash
npm install
npm run dev
```

Open the local address displayed by Vite in the terminal.

## Other Commands

```bash
npm run build   # Create a production build
npm run lint    # Check the code with ESLint
npm run preview # Preview the production build
```

The displayed exchange rates are for reference only. Exchange rate data comes from the Frankfurter API and may change over time.

## Author

Created by [Awosky](https://faisalhakim.com/).
