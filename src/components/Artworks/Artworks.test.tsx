import { render } from "@testing-library/react";
import { Artworks } from "./Artworks";
import { mockAllIsIntersecting } from "react-intersection-observer/test-utils";
import fetchMock from "jest-fetch-mock";
import { mockArtworksData } from "../../testing/mockArtworksData";

describe("Artworks", () => {
  test("should not show an error when the data fetch is successful", async () => {
    fetchMock.resetMocks();
    fetchMock.mockResponseOnce(JSON.stringify(mockArtworksData));

    const { queryByTestId, findByText } = render(<Artworks />);

    mockAllIsIntersecting(true);

    expect(await findByText("Loading more...")).toBeInTheDocument();
    expect(queryByTestId("error")).not.toBeInTheDocument();
  });

  test("should show an error when the returned data is missing artObjects", async () => {
    fetchMock.resetMocks();
    fetchMock.mockResponseOnce(JSON.stringify({ artObjects: null, count: 10 }));

    const { findByTestId, queryByText } = render(<Artworks />);

    mockAllIsIntersecting(true);

    expect(queryByText("Loading more...")).not.toBeInTheDocument();
    const error = await findByTestId("error");
    expect(error).toBeVisible();
    expect(error.textContent).toEqual("Missing data for page 1!");
  });

  test("should show an error when the returned data is missing count", async () => {
    fetchMock.resetMocks();
    fetchMock.mockResponseOnce(
      JSON.stringify({
        artObjects: mockArtworksData.artObjects,
        count: undefined,
      })
    );

    const { findByTestId, queryByText } = render(<Artworks />);

    mockAllIsIntersecting(true);

    expect(queryByText("Loading more...")).not.toBeInTheDocument();
    const error = await findByTestId("error");
    expect(error).toBeVisible();
    expect(error.textContent).toEqual("Missing data for page 1!");
  });

  test("should show an error when the returned data is missing artObjects", async () => {
    fetchMock.resetMocks();
    fetchMock.mockRejectOnce(new Error("Not found"));

    const { findByTestId, queryByText } = render(<Artworks />);

    mockAllIsIntersecting(true);

    expect(queryByText("Loading more...")).not.toBeInTheDocument();
    const error = await findByTestId("error");
    expect(error).toBeVisible();
    expect(error.textContent).toEqual("Not found");
  });
});
