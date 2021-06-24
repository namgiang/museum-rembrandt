import { render } from "@testing-library/react";
import App from "./App";
import { mockAllIsIntersecting } from "react-intersection-observer/test-utils";

const getTitle = (page: number, number: number) => {
  return `Page ${page} - Artwork ${number}`;
};

const getCaption = (page: number, number: number) => {
  return `Page ${page} - Caption ${number}`;
};

jest.mock("./service/fetchArtworks", () => ({
  fetchArtworks: async function fetchArtworks(page: number) {
    return {
      totalPages: 2,
      artworks: [
        {
          title: getTitle(page, 1),
          imageUrl: "",
          caption: getCaption(page, 1),
        },
        {
          title: getTitle(page, 2),
          imageUrl: "",
          caption: getCaption(page, 2),
        },
        {
          title: getTitle(page, 3),
          imageUrl: "",
          caption: getCaption(page, 3),
        },
      ],
    };
  },
}));

describe("Museum App", () => {
  test("should match homepage's snapshot", async () => {
    const { container, findByText } = render(<App />);

    mockAllIsIntersecting(true);
    expect(await findByText(getTitle(1, 1))).toBeVisible();
    expect(container).toMatchSnapshot();
  });
});

describe("Given I am a user; When I visit the homepage, Then I", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test("should see the first items", async () => {
    const { findByText } = render(<App />);

    // When I am at the home page
    mockAllIsIntersecting(true);

    // Then I should see the items from the first page
    expect(await findByText(getTitle(1, 1))).toBeVisible();
    expect(await findByText(getTitle(1, 2))).toBeVisible();
    expect(await findByText(getTitle(1, 3))).toBeVisible();

    expect(await findByText(getCaption(1, 1))).toBeVisible();
    expect(await findByText(getCaption(1, 2))).toBeVisible();
    expect(await findByText(getCaption(1, 3))).toBeVisible();

    // And there are still more items
    expect(await findByText("Loading more...")).toBeVisible();
  });

  test("should see the next items when scroll down to the bottom", async () => {
    const { findByText, queryByText } = render(<App />);

    // mock the element inView state
    // when loading the page the Load More button is in view
    mockAllIsIntersecting(true);
    expect(await findByText(getTitle(1, 1))).toBeVisible();

    // mock the element inView state
    // when images are loaded, the Load More button is not in view
    mockAllIsIntersecting(false);

    // When I scroll to the bottom
    // mock the element inView state
    // when scroll to the bottom, the Load More button is in view
    mockAllIsIntersecting(true);

    // Then I should see the items from page 2
    expect(await findByText(getTitle(2, 1))).toBeVisible();
    expect(await findByText(getTitle(2, 2))).toBeVisible();
    expect(await findByText(getTitle(2, 3))).toBeVisible();

    expect(await findByText(getCaption(2, 1))).toBeVisible();
    expect(await findByText(getCaption(2, 2))).toBeVisible();
    expect(await findByText(getCaption(2, 3))).toBeVisible();

    // And there are no more items
    expect(queryByText("Loading more...")).not.toBeInTheDocument();
  });
});
