import { createSlice } from "@reduxjs/toolkit";

interface IUserPayload {
  userInfo: IUserData | null;
}

const initialState: IUserPayload = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo") as string)
    : null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    clearUser: (state) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
