import crudActions from "@/helpers/crudActions";
import { dataActions } from "@/redux/slices/contentDataSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import EditFood from "../../../modals/edit/EditFood";

function FoodCard(Props: any) {
  function props() {
    if (Props.length >= 1) {
      return {
        Name: Props.Name,
        Description: Props.Description,
        Cost: Props.Cost,
        Sale: {
          Is: Props.Sale.Is,
          Percentage: Props.Sale.Percentage,
        },
        IsSpecial: Props.IsSpecial,
        Tags: {
          Spicy: Props.Tags.Spicy,
          Raw: Props.Tags.Raw,
          Allergens: Props.Tags.Allergens,
        },
        Type: Props.Type,
        Ingredients: Props.Ingredients,
      };
    } else
      return {
        Name: "",
        Description: "",
        Cost: "",
        Sale: {
          Is: "",
          Percentage: "",
        },
        IsSpecial: "",
        Tags: {
          Spicy: "",
          Raw: "",
          Allergens: "",
        },
        Type: "",
        Ingredients: "",
      };
  }

  const dispatch = useDispatch();

  const [foodData, setFoodData] = useState(props());
  const [showEditModal, setShowEditModal] = useState({
    show: false,
    css: { display: "none" },
  });

  function handleDelete() {
    crudActions.Delete(Props._id, "food").then((res) => {
      dispatch(
        dataActions({
          requested: "food",
          data: res.data,
        })
      );
    });
  }

  // Group props to pass down to edit modal

  const actions = {
    setShow: setShowEditModal,
    setFoodItems: Props.setFoodItems,
    setFoodItem: setFoodData,
  };

  const data = {
    show: showEditModal,
    foodItem: foodData,
    _id: Props._id,
  };

  const Buttons = (
    <div className="text-slate-100 ml-4">
      <button
        className="editBtn bg-slate-400"
        onClick={() =>
          setShowEditModal({ show: true, css: { display: "flex" } })
        }
      >
        Edit
      </button>
      <button className="deleteBtn bg-red-600" onClick={() => handleDelete()}>
        delete
      </button>
    </div>
  );

  // check to see if value exists
  const Card = Props.Description ? (
    <>
      {/* begin desktop */}
      <EditFood actions={actions} data={data} />
      <div id="card" className="foodGrid text-slate-700 hidden lg:grid">
        <div>
          <h1>{Props.Name}</h1>
        </div>
        <div>
          {Props.Description ? (
            Props.Description.length < 14 ? (
              <h1>{Props.Description}</h1>
            ) : (
              <h1
                className="cursor-pointer"
                onClick={() => window.alert(Props.Description)}
              >
                {Props.Description.slice(0, 14) + "..."}
              </h1>
            )
          ) : null}
        </div>
        <div className="flex justify-center">
          <h1>{Props.Cost}$</h1>
        </div>
        <div className="flex justify-center">
          {Props.Sale ? (
            Props.Sale.Is ? (
              <h1>{Props.Sale.Percentage}%</h1>
            ) : (
              <h1>None</h1>
            )
          ) : null}
        </div>
        <div className="flex justify-center">
          <h1>{Props.IsSpecial ? "yes" : "no"}</h1>
        </div>
        <div className="flex justify-center">
          <h1>
            {Props.Tags.Spicy ? "*Spicy" : ""}
            {Props.Tags.Raw ? "*Raw" : ""}
            {Props.Tags.Allergens ? "*Alergens" : ""}
          </h1>
        </div>
        <div>
          {Props.Ingredients.length < 14 ? (
            <h1>{Props.Ingredients}</h1>
          ) : (
            <h1
              className="cursor-pointer"
              onClick={() => window.alert(Props.Ingredients)}
            >
              {Props.Ingredients.slice(0, 14) + "..."}
            </h1>
          )}
        </div>
        <div className="flex justify-center">{Props.Type}</div>
        {Buttons}
      </div>
      {/* begin tablet */}
      <div className="hidden md:grid mdGrid lg:hidden" id="card">
        <div>
          <h1>
            {Props.Name.length < 15
              ? Props.Name
              : Props.Name.slice(0, 14) + "..."}
          </h1>
        </div>
        <div>
          {Props.Description.length < 28 ? (
            <h1>{Props.Description}</h1>
          ) : (
            <h1
              className="cursor-pointer"
              onClick={() => window.alert(Props.Description)}
            >
              {Props.Description.slice(0, 28) + "..."}
            </h1>
          )}
        </div>
        {Buttons}
      </div>
      {/* begin mobile */}
      <div className="grid sm:hidden smGrid" id="card">
        <div>
          <h1>{Props.Name}</h1>
        </div>
        {Buttons}
      </div>
    </>
  ) : (
    <></>
  );

  return Card;
}

export default FoodCard;
