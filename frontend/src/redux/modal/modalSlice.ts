import { createSlice } from "@reduxjs/toolkit";

interface IModal {
  open: boolean;
  type: string | null;
  header: string | null;
  bodyText?: string | null;
}

const initialState: IModal = {
  open: false,
  type: null,
  header: null,
  bodyText: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.type = action.payload.type;
      state.open = true;
      state.header = action.payload.header;
      state.bodyText = action.payload.bodyText || null
    },
    closeModal: (state) => {
      state.open = false;
      state.type = null;
      state.header = null;
      state.bodyText = null;
    },
  },
});

export const { closeModal, openModal } = modalSlice.actions;
export default modalSlice.reducer;
