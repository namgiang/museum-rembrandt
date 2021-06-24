import { useCallback, useEffect, useReducer } from "react";
import { fetchArtworks } from "../../service/fetchArtworks";
import {
  ArtworksActionType,
  artworksReducer,
} from "../../store/artworks.reducer";
import Masonry from "react-masonry-css";
import { Artwork } from "../Artwork/Artwork";
import { InfiniteScroll } from "../../UI/InfiniteScroll";
import style from "./Artwork.module.css";
import { PageActionType, pageReducer } from "../../store/paging.reducer";

export const breakpointColumns = {
  default: 6,
  "1228": 5,
  "984": 4,
  "740": 3,
  "400": 2,
};

export const Artworks = () => {
  const [artWorksData, artWorksDispatch] = useReducer(artworksReducer, {
    artworks: [],
    isFetching: true,
    error: null,
    hasMore: false,
  });
  const [pageData, pageDispatch] = useReducer(pageReducer, {
    page: 1,
  });

  const dispatchPageAdvance = useCallback(() => {
    pageDispatch({ type: PageActionType.ADVANCE_PAGE });
  }, [pageDispatch]);

  useEffect(() => {
    const loadMoreArtworks = async (page: number) => {
      artWorksDispatch({ type: ArtworksActionType.FETCHING });
      try {
        const data = await fetchArtworks(page);
        artWorksDispatch({
          type: ArtworksActionType.FETCHED,
          artworks: data.artworks,
          totalPages: data.totalPages,
          page: pageData.page,
        });
      } catch (error) {
        artWorksDispatch({
          type: ArtworksActionType.ERROR,
          error: error.message || "Something went wrong",
        });
      }
    };

    loadMoreArtworks(pageData.page);
  }, [pageData.page, artWorksDispatch]);

  return (
    <div className={style.artworks}>
      <InfiniteScroll
        hasMore={artWorksData.hasMore && !artWorksData.error}
        loadMore={dispatchPageAdvance}
        isLoading={artWorksData.isFetching}
      >
        <Masonry
          breakpointCols={breakpointColumns}
          className={style.artworksMasonry}
          columnClassName={style.artworksMasonryColumn}
        >
          {artWorksData.artworks.map(({ title, imageUrl, caption }, index) => (
            <Artwork
              title={title}
              imageUrl={imageUrl}
              caption={caption}
              key={index}
            />
          ))}
        </Masonry>
        {artWorksData.error && (
          <p style={{ color: "red", textAlign: "center" }} data-testid="error">
            {artWorksData.error}
          </p>
        )}
      </InfiniteScroll>
    </div>
  );
};
