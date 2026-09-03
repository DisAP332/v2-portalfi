"use client";
import DrinksSection from "@/components/sections/Drinks";
import EventsSection from "@/components/sections/Events";
import FoodSection from "@/components/sections/Food";
import HomePageOptions from "@/components/sections/Homepage";

export default function App() {
  return (
    <>
      <HomePageOptions />
      <EventsSection />
      <DrinksSection />
      <FoodSection />
    </>
  );
}
