import { fetchArtworks } from "./fetchArtworks";
import fetchMock from "jest-fetch-mock";
import { mockArtworksData } from "../testing/mockArtworksData";

describe("fetchArtworks", () => {
  test("should return the correct format of data", async () => {
    fetchMock.resetMocks();
    fetchMock.mockResponseOnce(JSON.stringify(mockArtworksData));
    const result = await fetchArtworks(1);
    expect(result).toEqual({
      totalPages: 3,
      artworks: [
        {
          caption: "Rembrandt van Rijn, ca. 1628",
          imageUrl: "url1",
          title: "Zelfportret",
        },
        {
          caption: "Rembrandt van Rijn, 1639",
          imageUrl: "url2",
          title: "Portret van een vrouw, mogelijk Maria Trip",
        },
      ],
    });
  });
});
