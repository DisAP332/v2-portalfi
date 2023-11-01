import { dataActions } from "@/redux/slices/contentDataSlice";
import crudActions from "@/helpers/crudActions";
import { useState } from "react";
import { useDispatch } from "react-redux";

interface propsTypes {
  actions: {
    setShow: Function;
    setDrink: Function;
    setDrinks: Function;
  };
  data: {
    show: {
      css: object;
    };
    drink: {
      name: string;
      cost: string;
      category: string;
      description: string;
      ingredients: string;
      isSpecial: boolean;
    };
    _id: string;
  };
}

export default function EditDrink(Props: propsTypes) {
  const dispatch = useDispatch();

  const [drinkData, setDrinkData] = useState({
    name: Props.data.drink.name,
    cost: Props.data.drink.cost,
    category: Props.data.drink.category,
    description: Props.data.drink.description,
    ingredients: Props.data.drink.ingredients,
    isSpecial: Props.data.drink.isSpecial,
  });

  const handleSaveEdit = (ID: string) => {
    crudActions.Update(ID, "drinks", drinkData).then((res) => {
      if (res.success === true) {
        dispatch(
          dataActions({
            requested: "drinks",
            data: res.data,
          })
        );
        Props.actions.setShow({ show: false, css: { display: "none" } });
      }
    });
  };
  return (
    <div className="modal_container" style={Props.data.show.css}>
      <div className="modal">
        <div className="bg-slate-700 text-center text-3xl pt-2 pb-2 rounded-t-xl grid grid-cols-3">
          <div />
          <div>Edit Drink</div>
          <div className="flex justify-end mr-3">
            <button
              onClick={() =>
                Props.actions.setShow({ show: false, css: { display: "none" } })
              }
            >
              X
            </button>
          </div>
        </div>
        <div className="bg-slate-100">
          <div className="flex justify-center pt-8 pb-8">
            <form className="flex flex-col text-slate-800">
              Name:
              <input
                type="string"
                value={drinkData.name}
                required
                onChange={(e) =>
                  setDrinkData({ ...drinkData, name: e.target.value })
                }
              />
              Cost:
              <input
                required
                value={drinkData.cost}
                type="number"
                onChange={(e) =>
                  setDrinkData({ ...drinkData, cost: e.target.value })
                }
              />
              Category:
              <input
                required
                value={drinkData.category}
                onChange={(e) =>
                  setDrinkData({ ...drinkData, category: e.target.value })
                }
              />
              Description:
              <textarea
                required
                value={drinkData.description}
                onChange={(e) =>
                  setDrinkData({ ...drinkData, description: e.target.value })
                }
              />
              Ingredients:
              <textarea
                required
                value={drinkData.ingredients}
                onChange={(e) =>
                  setDrinkData({ ...drinkData, ingredients: e.target.value })
                }
              />
              Is Special?:
              <input
                required
                value={drinkData.ingredients}
                type="checkbox"
                onClick={(e) =>
                  setDrinkData({
                    ...drinkData,
                    isSpecial: drinkData.isSpecial ? false : true,
                  })
                }
              />
            </form>
          </div>
        </div>
        <div className="bg-slate-700 flex justify-end">
          <button
            className="bg-slate-300 pt-1 pb-1 pr-3 pl-3 m-3 rounded-xl text-xl"
            onClick={() => handleSaveEdit(Props.data._id)}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
