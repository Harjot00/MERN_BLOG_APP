import { createSlice, configureStore } from "@reduxjs/toolkit";

const authData = localStorage.getItem("userId");
const state = {
  isLoggedIn: false,
};

if (!authData) {
  state.isLoggedIn = false;
} else {
  state.isLoggedIn = true;
}

const authSlice = createSlice({
  name: "auth",
  initialState: state,
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
    },
  },
});

const store = configureStore({
  reducer: authSlice.reducer,
});

export const authActions = authSlice.actions;
export default store;
