import { dataActions } from "@/redux/slices/contentDataSlice";
import crudActions from "@/helpers/crudActions";
import { useState } from "react";
import { useDispatch } from "react-redux";

interface propsTypes {
  actions: {
    setShow: Function;
    setFoodItems: Function;
    setFoodItem: Function;
  };
  data: {
    show: {
      css: object;
    };
    foodItem: {
      Name: string;
      Description: string;
      Cost: string;
      Sale: {
        Is: boolean;
        Percentage: number;
      };
      IsSpecial: boolean;
      Tags: {
        Spicy: boolean;
        Raw: boolean;
        Allergens: boolean;
      };
      Type: string;
      Ingredients: string;
    };
    _id: string;
  };
}

export default function EditFood(Props: propsTypes) {
  const dispatch = useDispatch();
  const Data = Props.data.foodItem;

  const [foodData, setFoodData] = useState({
    Name: Data.Name,
    Description: Data.Description,
    Cost: Data.Cost,
    Sale: {
      Is: Data.Sale.Is,
      Percentage: Data.Sale.Percentage,
    },
    IsSpecial: Data.IsSpecial,
    Tags: {
      Spicy: Data.Tags.Spicy,
      Raw: Data.Tags.Raw,
      Allergens: Data.Tags.Allergens,
    },
    Type: Data.Type,
    Ingredients: Data.Ingredients,
  });

  const handleSaveEdit = (ID: string) => {
    crudActions.Update(ID, "food", foodData).then((res) => {
      if (res.success === true) {
        dispatch(
          dataActions({
            requested: "food",
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
          <div>Edit Food Item</div>
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
                value={foodData.Name}
                required
                onChange={(e) =>
                  setFoodData({ ...foodData, Name: e.target.value })
                }
              />
              Description:
              <textarea
                required
                value={foodData.Description}
                onChange={(e) =>
                  setFoodData({ ...foodData, Description: e.target.value })
                }
              />
              Cost:
              <input
                required
                value={foodData.Cost}
                type="number"
                onChange={(e) =>
                  setFoodData({ ...foodData, Cost: e.target.value })
                }
              />
              <div className="flex justify-between">
                Sale:
                {foodData.Sale.Is ? (
                  <button
                    onClick={() =>
                      setFoodData({
                        ...foodData,
                        Sale: {
                          Is: false,
                          Percentage: foodData.Sale.Percentage,
                        },
                      })
                    }
                  >
                    X
                  </button>
                ) : (
                  <></>
                )}
              </div>
              {foodData.Sale.Is ? (
                <>
                  <input
                    required
                    value={foodData.Sale.Percentage}
                    type="number"
                    onChange={(e) =>
                      setFoodData({
                        ...foodData,
                        Sale: { Is: true, Percentage: Number(e.target.value) },
                      })
                    }
                  />
                </>
              ) : (
                <input
                  required
                  checked={foodData.Sale.Is}
                  type="checkbox"
                  onChange={() =>
                    setFoodData({
                      ...foodData,
                      Sale: { Is: true, Percentage: foodData.Sale.Percentage },
                    })
                  }
                />
              )}
              is Special?
              <input
                type="checkbox"
                checked={foodData.IsSpecial}
                onChange={() => {
                  setFoodData({
                    ...foodData,
                    IsSpecial: foodData.IsSpecial ? false : true,
                  });
                }}
              />
              tags:
              <div className="flex justify-around">
                Spicy
                <input
                  type="checkbox"
                  checked={foodData.Tags.Spicy}
                  onChange={() => {
                    setFoodData({
                      ...foodData,
                      Tags: {
                        ...foodData.Tags,
                        Spicy: foodData.Tags.Spicy ? false : true,
                      },
                    });
                  }}
                />
                Raw{" "}
                <input
                  type="checkbox"
                  checked={foodData.Tags.Raw}
                  onChange={() => {
                    setFoodData({
                      ...foodData,
                      Tags: {
                        ...foodData.Tags,
                        Raw: foodData.Tags.Raw ? false : true,
                      },
                    });
                  }}
                />
                Alergens
                <input
                  type="checkbox"
                  checked={foodData.Tags.Allergens}
                  onChange={() => {
                    setFoodData({
                      ...foodData,
                      Tags: {
                        ...foodData.Tags,
                        Allergens: foodData.Tags.Allergens ? false : true,
                      },
                    });
                  }}
                />
              </div>
              Type:
              <select
                id="type"
                name="type"
                value={foodData.Type}
                onChange={(e) =>
                  setFoodData({ ...foodData, Type: e.target.value })
                }
              >
                <option value="burger">Entree</option>
                <option value="side">Side</option>
              </select>
              Ingredients:
              <textarea
                required
                value={foodData.Ingredients}
                onChange={(e) =>
                  setFoodData({ ...foodData, Ingredients: e.target.value })
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
