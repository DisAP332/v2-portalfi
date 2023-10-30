"use client";

import DrinksSection from "@/components/sections/Drinks";
import EventsSection from "@/components/sections/Events";
import FoodSection from "@/components/sections/Food";
import TokenChecker from "@/helpers/tokenChecker";
import CartProvider from "@/redux/CartProvider";

function Home() {
  return (
    <>
      <CartProvider>
        <EventsSection />
        <DrinksSection />
        <FoodSection />
      </CartProvider>
      <TokenChecker location="dash" token={false} />
    </>
  );
}

export default Home;
