import { createSlice } from "@reduxjs/toolkit";

interface ITheme {
  mode: "light" | "dark";
}

const initialState: ITheme = {
  mode: (localStorage.getItem("muiTheme")) as 'light' | 'dark' ?? "dark",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
      localStorage.setItem("muiTheme", state.mode);
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
