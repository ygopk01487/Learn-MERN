import {
  ADD_POST,
  DELETE_POST,
  EDIT_POST,
  FIND_POST_BY_ID,
  POSTS_LOADED_FAIL,
  POSTS_LOADED_SUCCESS,
} from "../context/contants";

export const postReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case POSTS_LOADED_SUCCESS:
      return {
        ...state,
        posts: payload,
        postsLoading: false,
      };
    case POSTS_LOADED_FAIL:
      return {
        ...state,
        posts: [],
        postsLoading: false,
      };
    case ADD_POST:
      return {
        ...state,
        posts: [...state.posts, payload],
      };
    case FIND_POST_BY_ID:
      return { ...state, post: payload };
    case EDIT_POST:
      const newPosts = state.posts.map((post) =>
        post._id === payload._id ? payload : post
      );
      return {
        ...state,
        posts: newPosts,
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id != payload),
      };

    default:
      return state;
  }
};
