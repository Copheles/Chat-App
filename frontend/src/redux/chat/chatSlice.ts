import { createSlice } from "@reduxjs/toolkit";

interface ChatUser {
  createdAt: string;
  email: string;
  name: string;
  password?: string;
  role: string;
  avatar?: string;
  online?: boolean;
  updatedAt: string;
  __v: number;
  _id: string;
}

interface IChat {
  selectedChatUser: ChatUser | null;
}

const initialState: IChat = {
  selectedChatUser: localStorage.getItem("chatUser")
    ? JSON.parse(localStorage.getItem("chatUser") as string)
    : null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setSelectedChat: (state, action) => {
      state.selectedChatUser = action.payload;
      localStorage.setItem("chatUser", JSON.stringify(action.payload));
    },
  },
});

export const { setSelectedChat } = chatSlice.actions;

export default chatSlice.reducer;
