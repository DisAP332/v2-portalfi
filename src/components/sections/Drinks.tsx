import { DrinkHeader } from "./sections_parts/SectionHeader";
import { DrinksBody } from "./sections_parts/SectionBody";
import CartProvider from "@/redux/CartProvider";
import AddButton from "./sections_parts/SectionButtons";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

function DrinksSection() {
  const toggler = useSelector(
    (state: RootState) => state.sectionToggler.drinks
  );
  return (
    <div style={toggler.hiderCSS}>
      <div className="hidden sm:block section">
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
      <div className="block sm:hidden section">
        <div className="flex justify-center bg-slate-100  w-full h-20">
          <h1 className="text-slate-500 bg-slate-100 text-3xl font-sembold mt-4">
            Drinks
          </h1>
        </div>
        <div className="sectionHeader smGrid">
          <h1>Name</h1>
          <h1>Actions</h1>
        </div>
        <CartProvider>
          <DrinksBody />
        </CartProvider>
        <div className="flex justify-end pt-4">
          <AddButton location="drinks" />
        </div>
      </div>
    </div>
  );
}

export default DrinksSection;
