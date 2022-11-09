import { createContext, useEffect, useReducer, useState } from "react";
import { postReducer } from "../Reducer/PostReducer";
import {
  ADD_POST,
  apiUrl,
  DELETE_POST,
  EDIT_POST,
  FIND_POST_BY_ID,
  POSTS_LOADED_FAIL,
  POSTS_LOADED_FAIL_ALL,
  POSTS_LOADED_SUCCESS,
  POSTS_LOADED_SUCCESS_ALL,
} from "./contants";
import axios from "axios";

export const PostContext = createContext();

const PostContextProvider = ({ children }) => {
  //* state
  const [postState, dispatch] = useReducer(postReducer, {
    post: null,
    posts: [],
    postsAll: [],
    postsLoading: true,
  });

  //* show modal
  const [showAddPostModal, setShowAddPostModal] = useState(false);
  const [showEditPostModal, setShowEditPostModal] = useState(false);

  //* set state numerage
  const [totalPages, setTotalPages] = useState(1);

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
          type: POSTS_LOADED_SUCCESS_ALL,
          payload: response.data.posts,
        });
      }
    } catch (error) {
      dispatch({ type: POSTS_LOADED_FAIL_ALL });
    }
  };

  //Add post
  const addPosts = async (newPost) => {
    try {
      const resopnse = await axios.post(`${apiUrl}/posts`, newPost);
      if (resopnse.data.success) {
        dispatch({ type: ADD_POST, payload: resopnse.data.post });
        window.location.reload()
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
        await getPosts();
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
        await paginationPost()
      }
    } catch (error) {
      return error.resopnse.data
        ? error.resopnse.data
        : { success: false, message: "Sever errorr" };
    }
  };

  //* pagination
  const paginationPost = async (pageNumber, titleName) => {
    try {
      const response = await axios.get(
        `${apiUrl}/posts//post?page=${pageNumber}&title=${titleName}`
      );
      if (response.data.success) {
        setTotalPages(response.data.totalPage);
        dispatch({ type: POSTS_LOADED_SUCCESS, payload: response.data.posts });
        return response.data;
      }
    } catch (error) {
      dispatch({ type: POSTS_LOADED_FAIL });
    }
  };

  // useEffect(() => {
  //   paginationPost();
  //   getPosts();
  // }, []);

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
    setShowEditPostModal,
    setTotalPages,
    totalPages,
    paginationPost,
  };

  return (
    <PostContext.Provider value={postContextData}>
      {children}
    </PostContext.Provider>
  );
};
export default PostContextProvider;
