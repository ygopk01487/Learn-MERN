import { createContext, useEffect, useReducer } from "react";
import axios from "axios";
import { authReducer } from "../Reducer/AuthReducer";
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from "../context/contants";
import setAuthToken from "../utils/authToken";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [authState, dispath] = useReducer(authReducer, {
    authLoading: true,
    isAuthenticated: false,
    user: null,
  });

  //Authenticate user
  const loadUser = async () => {
    if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
      setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
    }
    try {
      const response = await axios.get(`${apiUrl}/auth`);
      if (response.data.success) {
        dispath({
          type: "SET_AUTH",
          payload: { isAuthenticated: true, user: response.data.user },
        });
      }
    } catch (error) {
      localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
      setAuthToken(null);
      dispath({
        type: "SET_AUTH",
        payload: { isAuthenticated: false, user: null },
      });
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  //login
  const loginUser = async (userForm) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, userForm);
      if (response.data.success) {
        localStorage.setItem(
          LOCAL_STORAGE_TOKEN_NAME,
          response.data.accessToken
        );
      }
      await loadUser();
      return response.data;
    } catch (error) {
      if (error.response.data) {
        return error.response.data;
      } else {
        return { sucess: false, message: error.message };
      }
    }
  };

  //register
  const registerUser = async (userForm) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/register`, userForm);
      if (response.data.success) {
        localStorage.setItem(
          LOCAL_STORAGE_TOKEN_NAME,
          response.data.accessToken
        );
      }
      await loadUser();
      return response.data;
    } catch (error) {
      if (error.response.data) {
        return error.response.data;
      } else {
        return { sucess: false, message: error.message };
      }
    }
  };

  //Logout
  const logoutUser = () => {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
    dispath({
      type: "SET_AUTH",
      payload: { isAuthenticated: false, user: null },
    });
  };

  // context data
  const authContextData = { loginUser, authState, registerUser, logoutUser };
  //Return provider
  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContextProvider;
