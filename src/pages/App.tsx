"use client";
import DrinksSection from "@/components/sections/Drinks";
import EventsSection from "@/components/sections/Events";
import CartProvider from "@/redux/CartProvider";
import { store } from "@/redux/store";
import { Provider } from "react-redux";

export default function App() {
  return (
    <div className="app_container">
      <Provider store={store}>
        <EventsSection />
        <DrinksSection />
      </Provider>
    </div>
  );
}
