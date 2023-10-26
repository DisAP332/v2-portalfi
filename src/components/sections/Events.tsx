import { EventHeader } from "./sections_parts/SectionHeader";
import { EventBody } from "./sections_parts/SectionBody";
import CartProvider from "@/redux/CartProvider";
import AddButton from "./sections_parts/SectionButtons";

function EventsSection() {
  // );
  return (
    <>
      <div className="section">
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
    </>
  );
}

export default EventsSection;
