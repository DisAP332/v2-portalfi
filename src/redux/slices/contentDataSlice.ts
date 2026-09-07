import Storage from "@/helpers/storage";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { contentTypes } from "@/content-types";

interface IPayloadAction {
  requested: string;
  data: object[];
}

export type ContentDataState = Record<string, object[]>;

// fixed and identical on server and client - reading localStorage here
// instead (only available client-side) made the server's first render
// disagree with the client's, which is a React hydration error. The
// real localStorage values get dispatched in after mount instead, see
// CartProvider.tsx.
//
// Keyed from contentTypes, not hardcoded - a new content type gets a slot
// here automatically.
const initialState: ContentDataState = Object.fromEntries(
  contentTypes.map((type) => [type.key, []])
);

export const contentDataSlice = createSlice({
  name: "contentData",
  initialState,
  reducers: {
    dataActions: (state, action: PayloadAction<IPayloadAction>) => {
      Storage.setItem(action.payload.requested, action.payload.data);
      state[action.payload.requested] = action.payload.data;
    },
  },
});

export const { dataActions } = contentDataSlice.actions;

export default contentDataSlice.reducer;
