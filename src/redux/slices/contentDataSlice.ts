import Storage from "@/helpers/storage";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";

interface IPayloadAction {
  requested: string;
  data: object;
}

interface initialState {
  events: Array<Object>;
  food: Array<Object>;
  drinks: Array<Object>;
}

interface IResults {
  success: boolean;
  response: string | object;
}

let results: IResults;

const initialState = {
  events: Storage.getItem("events") || [{}],
  drinks: Storage.getItem("drinks") || [{}],
  food: Storage.getItem("food") || [{}],
};

export const contentDataSlice = createSlice({
  name: "contentData",
  initialState,
  reducers: {
    dataActions: (state, action: PayloadAction<IPayloadAction>) => {
      switch (action.payload.requested) {
        case "food":
          Storage.setItem(action.payload.requested, action.payload.data);
          state = { ...state, food: action.payload.data };
          return state;
        // *************************************
        case "events":
          Storage.setItem(action.payload.requested, action.payload.data);
          state = { ...state, events: action.payload.data };
          return state;
        // *********************************************
        case "drinks":
          Storage.setItem(action.payload.requested, action.payload.data);
          state = { ...state, drinks: action.payload.data };
          return state;
      }
    },
  },
});

export const { dataActions } = contentDataSlice.actions;

export default contentDataSlice.reducer;
