"use client";

import { ReactNode, useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { store } from "./store";
import Storage from "@/helpers/storage";
import { contentTypes } from "@/content-types";
import { dataActions } from "./slices/contentDataSlice";

// contentDataSlice's initialState is fixed ([]) so server and client
// render the same thing on mount. Once mounted (client-only, localStorage
// exists), pull in whatever's actually cached - a plain state update,
// not part of the initial render, so it can't cause a hydration mismatch.
// Loops over contentTypes (rather than naming events/food/drinks) so a
// new content type is hydrated automatically, with nothing to edit here.
function HydrateContentData() {
  const dispatch = useDispatch();

  useEffect(() => {
    contentTypes.forEach((type) => {
      const data = Storage.getItem(type.key);
      if (data) dispatch(dataActions({ requested: type.key, data }));
    });
  }, [dispatch]);

  return null;
}

const CartProvider = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <HydrateContentData />
      {children}
    </Provider>
  );
};

export default CartProvider;
