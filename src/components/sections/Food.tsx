import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { FoodHeader } from "./sections_parts/SectionHeader";

function FoodSection() {
  const toggler = useSelector((state: RootState) => state.sectionToggler.food);
  return (
    <div style={toggler.hiderCSS} className="section">
      <div className="flex justify-between">
        <h1 className="text-slate-500 text-3xl font-sembold mt-4">Food Menu</h1>
      </div>
      <div className="shadow-md">
        <FoodHeader />
        {/* <div className="CardContainer">{foodCards}</div> */}
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

export default FoodSection;
