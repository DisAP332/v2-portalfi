import crudActions from "@/helpers/crudActions";
import { dataActions } from "@/redux/slices/contentDataSlice";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import EditDrink from "../../modals/edit/EditDrink";

function DrinkCard(Props: any) {
  const [data, setData] = useState({
    name: "",
    cost: "",
    category: "",
    description: "",
    ingredients: "",
    isSpecial: "",
  });

  useEffect(() => {
    setData({
      name: Props.Name,
      cost: Props.Cost,
      category: Props.Category,
      description: Props.Description,
      ingredients: Props.Ingredients,
      isSpecial: Props.IsSpecial,
    });
  }, [
    Props.Name,
    Props.Cost,
    Props.Category,
    Props.Description,
    Props.Ingredients,
    Props.IsSpecial,
  ]);

  const dispatch = useDispatch();

  const [showEditModal, setShowEditModal] = useState({
    show: false,
    css: { display: "none" },
  });

  const [drinkData, setDrinkData] = useState({
    name: Props.Name,
    cost: Props.Cost,
    category: Props.Category,
    description: Props.Description,
    ingredients: Props.Ingredients,
    isSpecial: Props.IsSpecial,
  });

  const actions = {
    setShow: setShowEditModal,
    setDrinks: Props.setDrinks,
    setDrink: setDrinkData,
  };

  const propsData = {
    show: showEditModal,
    drink: drinkData,
    _id: Props._id,
  };

  function handleDelete() {
    crudActions.Delete(Props._id, "drinks").then((res) => {
      dispatch(
        dataActions({
          requested: "drinks",
          data: res.data,
        })
      );
    });
  }

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

  const Card = Props.Description ? (
    <>
      {/* begin desktop */}

      <EditDrink actions={actions} data={propsData} />
      <div id="card" className="drinksGrid text-slate-700 hidden lg:grid">
        <div>
          <h1>{data.name}</h1>
        </div>
        <div>
          <h1>{data.cost}$</h1>
        </div>
        <div>
          <h1>{data.category}</h1>
        </div>
        <div>
          {data.description.length < 30 ? (
            <h1>data.description</h1>
          ) : (
            <h1
              className="cursor-pointer"
              onClick={() => window.alert(data.description)}
            >
              {data.description.slice(0, 30) + "..."}
            </h1>
          )}
        </div>
        <div>
          {data.ingredients.length < 30 ? (
            <h1>{data.description}</h1>
          ) : (
            <h1
              className="cursor-pointer"
              onClick={() => window.alert(data.ingredients)}
            >
              {data.ingredients.slice(0, 30) + "..."}
            </h1>
          )}
        </div>
        <div>
          <h1>{data.isSpecial}</h1>
        </div>
        {Buttons}
      </div>
      {/* begin tablet */}

      <div className="hidden md:grid mdGrid lg:hidden" id="card">
        <div>
          <h1>
            {data.name.length < 15 ? data.name : data.name.slice(0, 14) + "..."}
          </h1>
        </div>
        <div>
          {data.description.length < 28 ? (
            <h1>{data.description}</h1>
          ) : (
            <h1
              className="cursor-pointer"
              onClick={() => window.alert(data.description)}
            >
              {data.description.slice(0, 28) + "..."}
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

export default DrinkCard;
