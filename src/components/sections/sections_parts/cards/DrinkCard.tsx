import Link from "next/link";
import { useEffect, useState } from "react";

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

  return (
    <div id="card" className="drinksGrid text-slate-700">
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
        {/* {Props.Description ? (
          Props.Description.length < 30 ? (
            <h1>{Props.Description}</h1>
          ) : (
            <h1
              className="cursor-pointer"
              onClick={() => window.alert(Props.Description)}
            >
              {Props.Description.slice(0, 30) + "..."}
            </h1>
          )
        ) : (
          <></>
        )} */}
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
        {/* {Props.Ingredients ? (
          Props.Ingredients.length < 30 ? (
            <h1>{Props.Ingredients}</h1>
          ) : (
            <h1
              className="cursor-pointer"
              onClick={() => window.alert(Props.Ingredients)}
            >
              {Props.Ingredients.slice(0, 30) + "..."}
            </h1>
          )
        ) : (
          <></>
        )} */}
      </div>
      <div>
        {/* <h1>{Props.IsSpecial ? "true" : "false"}</h1> */}
        <h1>{data.isSpecial}</h1>
      </div>
      <div className="text-slate-100 ml-4">
        <button
          className="editBtn bg-slate-400"
          //   onClick={() =>
          //     setShowEditModal({ show: true, css: { display: "flex" } })
          //   }
        >
          Edit
        </button>
        <button
          className="deleteBtn bg-red-600"
          // onClick={() => handleDelete()}
        >
          delete
        </button>
        <Link href={`/dash/drinks/${Props._id}`}>Link</Link>
      </div>
    </div>
  );
}

export default DrinkCard;
