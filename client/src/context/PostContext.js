import { createContext, useReducer, useState } from "react";
import { postReducer } from "../Reducer/PostReducer";
import {
  ADD_POST,
  apiUrl,
  DELETE_POST,
  EDIT_POST,
  FIND_POST_BY_ID,
  POSTS_LOADED_FAIL,
  POSTS_LOADED_SUCCESS,
} from "./contants";
import axios from "axios";

export const PostContext = createContext();

const PostContextProvider = ({ children }) => {
  //* state
  const [postState, dispatch] = useReducer(postReducer, {
    post: null,
    posts: [],
    postsLoading: true,
  });

  //* show modal
  const [showAddPostModal, setShowAddPostModal] = useState(false);
  const [showEditPostModal, setShowEditPostModal] = useState(false);

  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    type: null,
  });

  //* get all post
  const getPosts = async () => {
    try {
      const response = await axios.get(`${apiUrl}/posts`);
      if (response.data.success) {
        dispatch({
          type: POSTS_LOADED_SUCCESS,
          payload: response.data.posts,
        });
      }
    } catch (error) {
      dispatch({ type: POSTS_LOADED_FAIL });
    }
  };

  //Add post
  const addPosts = async (newPost) => {
    try {
      const resopnse = await axios.post(`${apiUrl}/posts`, newPost);
      if (resopnse.data.success) {
        dispatch({ type: ADD_POST, payload: resopnse.data.post });
        return resopnse.data;
      }
    } catch (error) {
      return error.resopnse.data
        ? error.resopnse.data
        : { success: false, message: "Sever errorr" };
    }
  };

  //find post
  const findPost = (postId) => {
    const post = postState.posts.find((post) => post._id === postId);
    dispatch({ type: FIND_POST_BY_ID, payload: post });
  };
  //Update post
  const updatePosts = async (updatePost) => {
    try {
      const response = await axios.put(
        `${apiUrl}/posts/${updatePost._id}`,
        updatePost
      );
      if (response.data.success) {
        dispatch({ type: EDIT_POST, payload: response.data.post });
        return response.data;
      }
    } catch (error) {
      return error.resopnse.data
        ? error.resopnse.data
        : { success: false, message: "Sever errorr" };
    }
  };

  //* delete post
  const deletePosts = async (postId) => {
    try {
      const response = await axios.delete(`${apiUrl}/posts/${postId}`);
      if (response.data.success) {
        dispatch({ type: DELETE_POST, payload: postId });
      }
    } catch (error) {
      console.log(error);
    }
  };

  //* Post context data
  const postContextData = {
    postState,
    getPosts,
    showAddPostModal,
    setShowAddPostModal,
    addPosts,
    showToast,
    setShowToast,
    deletePosts,
    updatePosts,
    findPost,
    showEditPostModal,
    setShowEditPostModal
  };

  return (
    <PostContext.Provider value={postContextData}>
      {children}
    </PostContext.Provider>
  );
};
export default PostContextProvider;
