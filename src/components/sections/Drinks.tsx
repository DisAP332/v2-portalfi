import { DrinkHeader } from "./sections_parts/SectionHeader";
import { DrinksBody } from "./sections_parts/SectionBody";
import CartProvider from "@/redux/CartProvider";
import AddButton from "./sections_parts/SectionButtons";

function DrinksSection() {
  return (
    <div className="section">
      <div className="flex justify-between">
        <h1 className="text-slate-500 text-3xl font-sembold mt-4">Drinks</h1>
      </div>
      <div className="shadow-md hidden lg:block">
        <CartProvider>
          <DrinkHeader />
          <DrinksBody />
        </CartProvider>
      </div>
      <div className="shadow-md hidden md:block lg:hidden">
        <div className="sectionHeader mdGrid">
          <h1>Name</h1>
          <h1>Description</h1>
          <h1>Actions</h1>
        </div>
        <CartProvider>
          <DrinksBody />
        </CartProvider>
      </div>
      <div className="flex justify-end pt-4">
        <AddButton location="drinks" />
      </div>
    </div>
  );
}

export default DrinksSection;
