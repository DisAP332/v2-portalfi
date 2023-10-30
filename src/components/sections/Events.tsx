import { EventHeader } from "./sections_parts/SectionHeader";
import { EventBody } from "./sections_parts/SectionBody";
import CartProvider from "@/redux/CartProvider";
import AddButton from "./sections_parts/SectionButtons";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

function EventsSection() {
  const toggler = useSelector(
    (state: RootState) => state.sectionToggler.events
  );
  return (
    <div style={toggler.hiderCSS}>
      <div className="hidden sm:block section">
        <div className="flex justify-between">
          <h1 className="text-slate-500 text-3xl font-sembold mt-4">Events</h1>
        </div>
        <div className="shadow-md hidden lg:block">
          <CartProvider>
            <EventHeader />
            <EventBody />
          </CartProvider>
        </div>
        <div className="shadow-md hidden md:block lg:hidden">
          <div className="sectionHeader mdGrid">
            <h1>Name</h1>
            <h1>Description</h1>
            <h1>Actions</h1>
          </div>
          <CartProvider>
            <EventBody />
          </CartProvider>
        </div>
        <div className="flex justify-end pt-4">
          <AddButton location="events" />
        </div>
      </div>
      <div className="block sm:hidden section">
        <div className="flex justify-center bg-slate-100  w-full h-20">
          <h1 className="text-slate-500 bg-slate-100 text-3xl font-sembold mt-4">
            Events
          </h1>
        </div>
        <div className="sectionHeader smGrid w-70">
          <h1>Name</h1>
          <h1>Actions</h1>
        </div>
        <CartProvider>
          <EventBody />
        </CartProvider>
        <div className="flex justify-end pt-4">
          <AddButton location="food" />
        </div>
      </div>
    </div>
  );
}

export default EventsSection;
