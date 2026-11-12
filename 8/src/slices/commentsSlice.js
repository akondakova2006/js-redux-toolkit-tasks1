import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { actions as usersActions } from "./usersSlice.js";
import { actions as postsActions } from "./postsSlice.js";

const commentsAdapter = createEntityAdapter();

const initialState = commentsAdapter.getInitialState();

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    addComments: commentsAdapter.addMany,
    addComment: commentsAdapter.addOne,
  },
  // BEGIN (write your solution here)
extraReducers: (builder) => {
  builder
    .addCase(usersActions.removeUser, (state, { payload }) => {
      const comments = commentsAdapter
        .getSelectors()
        .selectAll(state)
        .filter((comment) => comment.author !== payload);

      commentsAdapter.setAll(state, comments);
    })
    .addCase(postsActions.removePost, (state, { payload }) => {
      const comments = commentsAdapter
        .getSelectors()
        .selectAll(state)
        .filter((comment) => !payload.comments.includes(comment.id));

      commentsAdapter.setAll(state, comments);
    });
},
  // END
});

export const { actions } = commentsSlice;
export const selectors = commentsAdapter.getSelectors(
  (state) => state.comments
);
export default commentsSlice.reducer;
