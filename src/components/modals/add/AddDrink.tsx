import { dataActions } from "@/redux/slices/contentDataSlice";
import crudActions from "@/helpers/crudActions";
import { useState } from "react";
import { useDispatch } from "react-redux";

interface propsTypes {
  show: {
    show: boolean;
    css: object;
  };
  setShow: Function;
}

export default function AddDrink(Props: propsTypes) {
  const initialState = {
    name: "",
    cost: "",
    category: "Cocktail",
    description: "",
    ingredients: "",
    isSpecial: false,
  };

  const [drinkData, setDrinkData] = useState(initialState);

  const dispatch = useDispatch();

  function handleDrinkSubmit() {
    crudActions.Create("drinks", drinkData).then((res) => {
      if (res.success === true) {
        dispatch(
          dataActions({
            requested: "drinks",
            data: res.data,
          })
        );
        setDrinkData(initialState);
        Props.setShow({ show: false, css: { display: "none" } });
      }
    });
  }
  return (
    <div className="modal_container" style={Props.show.css}>
      <div className="modal">
        <div className="bg-slate-700 text-center text-3xl pt-2 pb-2 rounded-t-xl grid grid-cols-3">
          <div />
          <div>Add Drink</div>
          <div className="flex justify-end mr-3">
            <button
              onClick={() =>
                Props.setShow({ show: false, css: { display: "none" } })
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
              <select
                id="catagory"
                name="catagory"
                value={drinkData.category}
                onChange={(e) =>
                  setDrinkData({ ...drinkData, category: e.target.value })
                }
              >
                <option value="cocktail">Cocktail</option>
                <option value="beer">beer</option>
                <option value="draft">draft</option>
                <option value="seltzer">seltzer</option>
              </select>
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
            onClick={() => handleDrinkSubmit()}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
