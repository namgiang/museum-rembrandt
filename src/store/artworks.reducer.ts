import { Artwork } from "../shared/types";

export enum ArtworksActionType {
  FETCHING = "FETCHING_ARTWORKS",
  FETCHED = "ARTWORKS_FETCHED",
  ERROR = "ERROR",
}

type ArtworksState = {
  artworks: Artwork[];
  isFetching: boolean;
  error: string | null;
  hasMore: boolean;
};

type ArtworksFetchingAction = {
  type: ArtworksActionType.FETCHING;
};

type ArtworksFetchedAction = {
  type: ArtworksActionType.FETCHED;
  artworks: Artwork[];
  totalPages: number;
  page: number;
};

type ArtworksErrorAction = {
  type: ArtworksActionType.ERROR;
  error: string;
};

type ArtworksAction =
  | ArtworksFetchingAction
  | ArtworksFetchedAction
  | ArtworksErrorAction;

export const artworksReducer = (
  state: ArtworksState,
  action: ArtworksAction
) => {
  switch (action.type) {
    case ArtworksActionType.FETCHED: {
      return {
        ...state,
        artworks: state.artworks.concat(action.artworks),
        isFetching: false,
        hasMore: action.page < action.totalPages,
      };
    }
    case ArtworksActionType.FETCHING:
      return { ...state, isFetching: true };
    case ArtworksActionType.ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    default:
      return state;
  }
};
