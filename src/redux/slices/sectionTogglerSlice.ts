import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { contentTypes } from "@/content-types";

interface SectionState {
  display: boolean;
  hiderCSS: { display: string };
}

export type SectionTogglerState = Record<string, SectionState>;

const hidden: SectionState = { display: false, hiderCSS: { display: "none" } };
const shown: SectionState = { display: true, hiderCSS: { display: "block" } };

// home_page_options isn't a content type (no CRUD, no schema) but is still
// one of the toggleable sections, so it's added alongside the content
// type keys rather than living in contentTypes itself.
const sectionKeys = [...contentTypes.map((type) => type.key), "home_page_options"];

const initialState: SectionTogglerState = Object.fromEntries(
  sectionKeys.map((key) => [key, hidden])
);

export const sectionTogglerSlice = createSlice({
  name: "sectionToggler",
  initialState,
  reducers: {
    // shows exactly the requested section, hides every other one - a new
    // content type's key works here with no change, since it's driven by
    // whatever keys are already in state.
    showorHiderSection: (state, action: PayloadAction<string>) => {
      for (const key of Object.keys(state)) {
        state[key] = key === action.payload ? shown : hidden;
      }
    },
  },
});

export const { showorHiderSection } = sectionTogglerSlice.actions;

export default sectionTogglerSlice.reducer;
