import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./theme/themeSlice";
import userReducer from "./user/user.slice";
import toastReducer from "./toast/toast.slice";
import modalReducer from "./modal/modalSlice";
import chatReducer from "./chat/chatSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    user: userReducer,
    toast: toastReducer,
    modal: modalReducer,
    chat: chatReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
