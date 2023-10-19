import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface SectionTogglerState {
  events: {
    display: boolean;
    hiderCSS: {
      display: string;
    };
  };
  food: {
    display: boolean;
    hiderCSS: {
      display: string;
    };
  };
  drinks: {
    display: boolean;
    hiderCSS: {
      display: string;
    };
  };
  home_page_options: {
    display: boolean;
    hiderCSS: {
      display: string;
    };
  };
}

const initialState: SectionTogglerState = {
  events: {
    display: false,
    hiderCSS: {
      display: "none",
    },
  },
  food: {
    display: false,
    hiderCSS: {
      display: "none",
    },
  },
  drinks: {
    display: false,
    hiderCSS: {
      display: "none",
    },
  },
  home_page_options: {
    display: false,
    hiderCSS: {
      display: "none",
    },
  },
};

export const sectionTogglerSlice = createSlice({
  name: "sectionToggler",
  initialState,
  reducers: {
    showorHiderSection: (state, action: PayloadAction<string>) => {
      switch (action.payload) {
        case "events":
          state = {
            ...initialState,
            events: {
              display: true,
              hiderCSS: {
                display: "block",
              },
            },
          };
          return state;
        case "food":
          state = {
            ...initialState,
            food: {
              display: true,
              hiderCSS: {
                display: "block",
              },
            },
          };
          return state;
        case "drinks":
          state = {
            ...initialState,
            drinks: {
              display: true,
              hiderCSS: {
                display: "block",
              },
            },
          };
          return state;
        case "home_page_options":
          state = {
            ...initialState,
            home_page_options: {
              display: true,
              hiderCSS: {
                display: "block",
              },
            },
          };
          return state;
      }
    },
  },
});

export const { showorHiderSection } = sectionTogglerSlice.actions;

export default sectionTogglerSlice.reducer;
