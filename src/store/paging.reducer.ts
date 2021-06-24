type PageReducerState = {
  page: number;
};

export enum PageActionType {
  ADVANCE_PAGE = "ADVANCE_PAGE",
}

type PageAction = {
  type: PageActionType;
};

export const pageReducer = (state: PageReducerState, action: PageAction) => {
  switch (action.type) {
    case PageActionType.ADVANCE_PAGE:
      return { ...state, page: state.page + 1 };
    default:
      return state;
  }
};
