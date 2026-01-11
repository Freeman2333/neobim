# Truss Designer

A web application for interactively designing and previewing Double-Howe trusses in 3D, built with React and Three.js.

## Live Demo

[View the deployed app on Vercel](https://neobim-two.vercel.app/)

## Features

- Real-time 3D preview of truss geometry
- Adjust truss width, pitch, vertical member spacing, and member size dynamically
- Hover over truss members to see their coordinates
- Input validation and user-friendly error messages

## Getting Started

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Run the app locally:**

   ```bash
   npm start
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

3. **Build for production:**
   ```bash
   npm run build
   ```

## Deployment

You can deploy this app for free using [Vercel](https://vercel.com), [Netlify](https://netlify.com), or [GitHub Pages](https://pages.github.com/).

## Recent Changes

- Add error handling and validation messages for truss parameters
- Add member hover functionality to TrussPreview for enhanced interactivity
- Add member size input and update TrussPreview to utilize member size
- Initial Double-Howe truss implementation: geometry, centering, and validation

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
