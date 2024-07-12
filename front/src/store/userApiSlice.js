// store/userApiSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AUTH_URL = "http://localhost:5000";

// Action Types
export const SIGN_IN = "user/signIn";
export const SIGN_UP = "user/signUp";
export const LOGOUT = "user/logout";
export const GOOGLE_SIGN_IN = "user/googleSignIn";

// Helper function to handle errors
const handleError = (error) => {
  const errorMessage = error.response?.data?.error || "An error occurred";

  throw new Error(errorMessage);
};

// Async Thunks
export const signInAsync = createAsyncThunk(SIGN_IN, async (userData) => {
  try {
    console.log("Dispatching signInAsync with userData:", userData);
    const response = await axios.post(`${AUTH_URL}/login`, userData, {
      withCredentials: true,
    });
    console.log("Response from signInAsync:", response.data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
});

export const signUpAsync = createAsyncThunk(SIGN_UP, async (userData) => {
  try {
    const response = await axios.post(`${AUTH_URL}/register`, userData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
});

export const logoutAsync = createAsyncThunk(LOGOUT, async () => {
  try {
    await axios.get(`${AUTH_URL}/logout`, { withCredentials: true });
    return null;
  } catch (error) {
    handleError(error);
  }
});

export const googleSignInAsync = createAsyncThunk(GOOGLE_SIGN_IN, async () => {
  try {
    const response = await axios.get(`${AUTH_URL}/auth/google`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
});

const userApiSlice = createSlice({
  name: "userApi",
  initialState: {
    loading: false,
    error: null,
    user: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // SignIn cases
      .addCase(signInAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signInAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        toast.success("Sign in successful");
      })
      .addCase(signInAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Sign in failed";
      })
      // SignUp cases
      .addCase(signUpAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUpAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        toast.success("Sign up successful");
      })
      .addCase(signUpAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Sign up failed";
      })
      // Logout cases
      .addCase(logoutAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        toast.success("Logout successful");
      })
      .addCase(logoutAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Logout failed";
      })
      // Google SignIn cases
      .addCase(googleSignInAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(googleSignInAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        toast.success("Google sign in successful");
      })
      .addCase(googleSignInAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Google sign in failed";
      });
  },
});

export default userApiSlice.reducer;
