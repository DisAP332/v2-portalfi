import { useSelector } from "react-redux";
import SectionHeader from "./sections_parts/SectionHeader";
import { RootState } from "@/redux/store";
import { EventBody } from "./sections_parts/SectionBody";

function EventsSection() {
  const toggler = useSelector(
    (state: RootState) => state.sectionToggler.events
  );
  return (
    <div style={toggler.hiderCSS} className="section">
      <div className="flex justify-between">
        <h1 className="text-slate-500 text-3xl font-sembold mt-4">Events</h1>
      </div>
      <div className="shadow-md">
        <SectionHeader location="events" />
        <EventBody />
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
