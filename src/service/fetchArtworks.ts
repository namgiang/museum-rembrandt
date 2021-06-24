const BASE_URL =
  "https://www.rijksmuseum.nl/api/en/collection?key=yW6uq3BV&involvedMaker=Rembrandt+van+Rijn&imgonly=True";
const ITEMS_PER_PAGE = 20;

type ArtObject = {
  title: string;
  longTitle: string;
  webImage: {
    url: string;
  };
};

const getCaptionFromLongTitle = (longTitle: string, title: string) => {
  return longTitle.replace(`${title}, `, "");
};

export const fetchArtworks = async (page: number) => {
  const response = await fetch(`${BASE_URL}&p=${page}&ps=${ITEMS_PER_PAGE}`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Request failed!");
  }

  const data = await response.json();

  const { count, artObjects } = data;

  if (count == null || artObjects == null) {
    throw new Error(`Missing data for page ${page}!`);
  }

  return {
    totalPages: Math.ceil(count / ITEMS_PER_PAGE),
    artworks: artObjects.map(({ title, webImage, longTitle }: ArtObject) => ({
      title,
      imageUrl: webImage.url,
      caption: getCaptionFromLongTitle(longTitle, title),
    })),
  };
};
