# Sales Dashboard

A simple analytics dashboard I built to practice React and data visualization. Shows sales metrics from a fictional e-commerce company.

## What it does

- Tracks revenue and orders over 6 months
- Shows performance by region (North, South, East)
- Calculates basic metrics like average order value and marketing ROI
- Filter by region to see specific performance

## Screenshots

![Dashboard](screenshots/dashboard.png)

## Tech Stack

- React (hooks - useState and useMemo)
- Recharts for the charts
- Tailwind CSS for styling

## What I learned

This was my first time really diving into React hooks. Figuring out when to use useMemo for the calculations took some trial and error but makes sense now. Also learned a lot about structuring data for charts.

The filtering feature was tricky - had to make sure all the metrics updated correctly when switching regions.

## Running it locally

```bash
npm install
npm start
```

Runs on localhost:3000

## Future improvements

- Add more date range options
- Maybe add export to CSV functionality
- Connect to real API instead of static data
- Add customer acquisition cost tracking

## Notes

Data is just sample data for now. In a real version this would pull from an actual database or API.

Still working on making the charts more responsive on mobile.