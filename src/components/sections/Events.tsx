import { EventHeader } from "./sections_parts/SectionHeader";
import { EventBody } from "./sections_parts/SectionBody";
import CartProvider from "@/redux/CartProvider";

function EventsSection() {
  // );
  return (
    <div className="section">
      <div className="flex justify-between">
        <h1 className="text-slate-500 text-3xl font-sembold mt-4">Events</h1>
      </div>
      <div className="shadow-md">
        <CartProvider>
          <EventHeader />
          <EventBody />
        </CartProvider>
      </div>
      <div className="flex justify-end pt-4">
        {/* <button
            className="bg-green-700 p-1 rounded-full"
            onClick={() =>
              setShowAddModal({ show: true, css: { display: "flex" } })
            }
          >
            <Image src={AddIcon} alt="Add Icon" width={60} />
          </button> */}
      </div>
    </div>
  );
}

export default EventsSection;
