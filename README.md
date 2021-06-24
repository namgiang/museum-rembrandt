In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.\

### `npm run build`

Builds the app for production to the `build` folder.\

## Documentation

This app displays artworks of Rembrandt. When the user enter the page they will see some artworks from Rembrandt, and when they scroll down, more will be fetched and displayed to the screen.

### Components

- Header
- Artworks: a masonry layout of items, 20 items at a time.
  - Artwork: A card containing the artwork image and description.
- Image: render the image (mobile and desktop), lazy loading.
- InfiniteScroll: used in the Artworks component to infinite scroll the list.

### Third library

- `react-masonry-css`: [https://www.npmjs.com/package/react-masonry-css](link) used to display the items in masonry layout. I use this because I don't want to reinvent the wheel and implement this. This library has a minzipped size of 1.4kb.

- `react-intersection-observer`: [https://www.npmjs.com/package/react-masonry-css](link) React implementation of the Intersection Observer API to tell you when an element enters or leaves the viewport. I use this to provide a reliable way to detect when users scroll to bottom.

- `jest-fetch-mock`: for user testing with fetch api.
