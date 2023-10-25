"use client";

import CartProvider from "@/redux/CartProvider";
import { store } from "@/redux/store";
import { Provider } from "react-redux";

function Layout({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}

export default Layout;
