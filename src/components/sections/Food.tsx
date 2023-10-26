import CartProvider from "@/redux/CartProvider";
import { FoodBody } from "./sections_parts/SectionBody";
import { FoodHeader } from "./sections_parts/SectionHeader";
import AddButton from "./sections_parts/SectionButtons";

function FoodSection() {
  return (
    <div className="section">
      <div className="flex justify-between">
        <h1 className="text-slate-500 text-3xl font-sembold mt-4">Food Menu</h1>
      </div>
      <div className="shadow-md hidden lg:block">
        <CartProvider>
          <FoodHeader />
          <FoodBody />
        </CartProvider>
      </div>
      <div className="shadow-md hidden md:block lg:hidden">
        <div className="sectionHeader mdGrid">
          <h1>Name</h1>
          <h1>Description</h1>
          <h1>Actions</h1>
        </div>
        <CartProvider>
          <FoodBody />
        </CartProvider>
      </div>
      <div className="flex justify-end pt-4">
        <AddButton location="food" />
      </div>
    </div>
  );
}

export default FoodSection;
