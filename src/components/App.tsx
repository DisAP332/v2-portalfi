"use client";
import DrinksSection from "@/components/sections/Drinks";
import EventsSection from "@/components/sections/Events";
import FoodSection from "@/components/sections/Food";
import HomePageOptions from "@/components/sections/Homepage";
import { store } from "@/redux/store";
import { Provider } from "react-redux";

export default function App() {
  return (
    <Provider store={store}>
      <HomePageOptions />
      <EventsSection />
      <DrinksSection />
      <FoodSection />
    </Provider>
  );
}
