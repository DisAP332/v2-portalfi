import Storage from "@/helpers/storage";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";

interface IPayloadAction {
  requested: string;
  data: object;
}

interface IResults {
  success: boolean;
  response: string | object;
}

let results: IResults;

// fixed and identical on server and client - reading localStorage here
// instead (only available client-side) made the server's first render
// disagree with the client's, which is a React hydration error. The
// real localStorage values get dispatched in after mount instead, see
// CartProvider.tsx.
const initialState: { events: object[]; drinks: object[]; food: object[] } = {
  events: [],
  drinks: [],
  food: [],
};

export const contentDataSlice = createSlice({
  name: "contentData",
  initialState,
  reducers: {
    dataActions: (state, action: PayloadAction<IPayloadAction>) => {
      switch (action.payload.requested) {
        case "food":
          Storage.setItem(action.payload.requested, action.payload.data);
          state = { ...state, food: action.payload.data as object[] };
          return state;
        // *************************************
        case "events":
          Storage.setItem(action.payload.requested, action.payload.data);
          state = { ...state, events: action.payload.data as object[] };
          return state;
        // *********************************************
        case "drinks":
          Storage.setItem(action.payload.requested, action.payload.data);
          state = { ...state, drinks: action.payload.data as object[] };
          return state;
      }
    },
  },
});

export const { dataActions } = contentDataSlice.actions;

export default contentDataSlice.reducer;
