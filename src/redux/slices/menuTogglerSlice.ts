import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface MenuTogglerState {
  profile: {
    toggled: boolean;
    dropdowncss: {
      display: string;
    };
    toggledcss: {
      borderBottomLeftRadius: number;
      borderBottomRightRadius: number;
    };
  };
  content: {
    toggled: boolean;
    dropdowncss: {
      display: string;
    };
    toggledcss: {
      borderBottomLeftRadius: number;
      borderBottomRightRadius: number;
    };
  };
  settings: {
    toggled: boolean;
    dropdowncss: {
      display: string;
    };
    toggledcss: {
      borderBottomLeftRadius: number;
      borderBottomRightRadius: number;
    };
  };
  mobileDD: {
    toggled: boolean;
    dropdowncss: {
      display: string;
    };
  };
}

const initialState: MenuTogglerState = {
  profile: {
    toggled: false,
    dropdowncss: {
      display: "none",
    },
    toggledcss: {
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
    },
  },
  content: {
    toggled: false,
    dropdowncss: {
      display: "none",
    },
    toggledcss: {
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
    },
  },
  settings: {
    toggled: false,
    dropdowncss: {
      display: "none",
    },
    toggledcss: {
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
    },
  },
  mobileDD: {
    toggled: false,
    dropdowncss: {
      display: "none",
    },
  },
};

const toggled = {
  toggled: true,
  dropdowncss: { display: "block" },
  toggledcss: { borderBottomLeftRadius: 0, borderBottomRightRadius: 0 },
};

const notToggled = {
  toggled: false,
  dropdowncss: { display: "none" },
  toggledcss: { borderBottomLeftRadius: 20, borderBottomRightRadius: 20 },
};

export const menuTogglerSlice = createSlice({
  name: "menuToggler",
  initialState,
  reducers: {
    showorHiderMenu: (state, action: PayloadAction<string>) => {
      if (!state.profile.toggled && action.payload === "profile") {
        state = {
          ...state,
          profile: toggled,
        };
        return state;
      } else if (state.profile.toggled && action.payload === "profile") {
        state = {
          ...state,
          profile: notToggled,
        };
        return state;
      }

      if (!state.settings.toggled && action.payload === "settings") {
        state = {
          ...state,
          settings: toggled,
        };
        return state;
      } else if (state.settings.toggled && action.payload === "settings") {
        state = {
          ...state,
          settings: notToggled,
        };
        return state;
      }

      if (!state.content.toggled && action.payload === "content") {
        state = {
          ...state,
          content: toggled,
        };
        return state;
      } else if (state.content.toggled && action.payload === "content") {
        state = {
          ...state,
          content: notToggled,
        };
        return state;
      }

      if (!state.mobileDD.toggled && action.payload === "mobileDD") {
        state = {
          ...state,
          mobileDD: toggled,
        };
        return state;
      } else if (state.mobileDD.toggled && action.payload === "mobileDD") {
        state = {
          ...state,
          mobileDD: notToggled,
        };
        return state;
      }
    },
  },
});

export const { showorHiderMenu } = menuTogglerSlice.actions;

export default menuTogglerSlice.reducer;
