"use client";

import { ReactNode, useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { store } from "./store";
import Storage from "@/helpers/storage";
import { dataActions } from "./slices/contentDataSlice";

// contentDataSlice's initialState is fixed ([]) so server and client
// render the same thing on mount. Once mounted (client-only, localStorage
// exists), pull in whatever's actually cached - a plain state update,
// not part of the initial render, so it can't cause a hydration mismatch.
function HydrateContentData() {
  const dispatch = useDispatch();

  useEffect(() => {
    const events = Storage.getItem("events");
    const food = Storage.getItem("food");
    const drinks = Storage.getItem("drinks");
    if (events) dispatch(dataActions({ requested: "events", data: events }));
    if (food) dispatch(dataActions({ requested: "food", data: food }));
    if (drinks) dispatch(dataActions({ requested: "drinks", data: drinks }));
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
